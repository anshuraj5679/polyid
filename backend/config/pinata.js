import axios from "axios";
import FormData from "form-data";

const pinataJwt = process.env.PINATA_JWT;
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretKey = process.env.PINATA_SECRET_KEY;

if (!pinataJwt && (!pinataApiKey || !pinataSecretKey)) {
	console.warn("[pinata] No Pinata credentials set; using fallback storage");
}

export const pinataGateway = process.env.PINATA_GATEWAY || "https://gateway.pinata.cloud/ipfs/";

// Test Pinata connection
export async function testPinataConnection() {
	if (!pinataJwt && (!pinataApiKey || !pinataSecretKey)) {
		return { success: false, error: "No credentials" };
	}
	
	try {
		const headers = pinataJwt 
			? { 'Authorization': `Bearer ${pinataJwt}` }
			: { 
				'pinata_api_key': pinataApiKey,
				'pinata_secret_api_key': pinataSecretKey
			};
		
		const response = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
			headers: headers
		});
		
		console.log("[pinata] Connection test successful");
		return { success: true, data: response.data };
	} catch (error) {
		console.warn("[pinata] Connection test failed:", error.message);
		return { success: false, error: error.message };
	}
}

// Upload file to Pinata
export async function uploadFileToPinata(fileStream, fileName) {
	if (!pinataJwt && (!pinataApiKey || !pinataSecretKey)) {
		throw new Error("No Pinata credentials configured");
	}
	
	try {
		const formData = new FormData();
		formData.append('file', fileStream, fileName);
		
		const metadata = JSON.stringify({
			name: fileName,
			keyvalues: {
				project: 'polyid'
			}
		});
		formData.append('pinataMetadata', metadata);
		
		const headers = {
			...formData.getHeaders(),
		};
		
		if (pinataJwt) {
			headers['Authorization'] = `Bearer ${pinataJwt}`;
		} else {
			headers['pinata_api_key'] = pinataApiKey;
			headers['pinata_secret_api_key'] = pinataSecretKey;
		}
		
		const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
			headers: headers,
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		});
		
		console.log("[pinata] File uploaded successfully:", response.data.IpfsHash);
		return response.data;
	} catch (error) {
		console.error("[pinata] File upload error:", error.response?.data || error.message);
		throw error;
	}
}

// Upload JSON to Pinata
export async function uploadJSONToPinata(jsonObject, name) {
	if (!pinataJwt && (!pinataApiKey || !pinataSecretKey)) {
		throw new Error("No Pinata credentials configured");
	}
	
	try {
		const data = {
			pinataContent: jsonObject,
			pinataMetadata: {
				name: name,
				keyvalues: {
					project: 'polyid'
				}
			}
		};
		
		const headers = {
			'Content-Type': 'application/json',
		};
		
		if (pinataJwt) {
			headers['Authorization'] = `Bearer ${pinataJwt}`;
		} else {
			headers['pinata_api_key'] = pinataApiKey;
			headers['pinata_secret_api_key'] = pinataSecretKey;
		}
		
		const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
			headers: headers
		});
		
		console.log("[pinata] JSON uploaded successfully:", response.data.IpfsHash);
		return response.data;
	} catch (error) {
		console.error("[pinata] JSON upload error:", error.response?.data || error.message);
		throw error;
	}
}

// Legacy pinata object for backward compatibility
export const pinata = {
	pinFileToIPFS: uploadFileToPinata,
	pinJSONToIPFS: uploadJSONToPinata,
	testAuthentication: testPinataConnection
};
