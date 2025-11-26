const EXPLORER_BASE = "https://amoy.polygonscan.com";

export function explorerTx(hash) {
	return `${EXPLORER_BASE}/tx/${hash}`;
}

export function explorerAddress(address) {
	return `${EXPLORER_BASE}/address/${address}`;
}

export function explorerToken(contract, tokenId) {
	return `${EXPLORER_BASE}/token/${contract}?a=${tokenId}`;
}











