import { useState } from "react";
import axios from "axios";

export default function Verify() {
	const [address, setAddress] = useState("");
	const [tokenId, setTokenId] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";
	const token = sessionStorage.getItem("polyid_jwt");

	async function byAddress() {
		try {
			if (window.topbarStart) window.topbarStart();
			setLoading(true);
			const { data } = await axios.get(`${base}/api/verify/${address}`);
			setResult(data);
			if (window.toast) window.toast("Address verified");
		} catch (e) {
			if (window.toast) window.toast(e.response?.data?.error || e.message, 'error');
		} finally {
			setLoading(false);
			if (window.topbarDone) window.topbarDone();
		}
	}
	async function byToken() {
		try {
			if (window.topbarStart) window.topbarStart();
			setLoading(true);
			const { data } = await axios.get(`${base}/api/credential/${tokenId}`);
			setResult(data);
			if (window.toast) window.toast("Token lookup complete");
		} catch (e) {
			if (window.toast) window.toast(e.response?.data?.error || e.message, 'error');
		} finally {
			setLoading(false);
			if (window.topbarDone) window.topbarDone();
		}
	}
	async function revoke() {
		if (!tokenId) return;
		try {
			if (window.topbarStart) window.topbarStart();
			await axios.post(`${base}/api/credential/${tokenId}/revoke`, {}, { headers: { Authorization: `Bearer ${token}` } });
			if (window.toast) window.toast('Credential revoked');
			await byToken();
		} catch (e) {
			if (window.toast) window.toast(e.response?.data?.error || e.message, 'error');
		} finally { if (window.topbarDone) window.topbarDone(); }
	}

	return (
		<div className="space-y-6" data-reveal>
			<div className="p-4 rounded border border-white/10 bg-white/5 backdrop-blur-md flex gap-2 items-center transition-transform hover:translate-y-[1px]">
				<input className="flex-1 px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Wallet Address" value={address} onChange={(e) => setAddress(e.target.value)} />
				<button className="px-4 rounded bg-white/10 hover:bg-white/20 btn-ripple" onClick={() => navigator.clipboard.writeText(address).then(()=>window.toast&&window.toast('Address copied'))}>Copy</button>
				<button className="px-4 rounded bg-polyPurple disabled:opacity-60 btn-ripple" disabled={!address || loading} onClick={byAddress}>Verify Address</button>
			</div>
			<div className="p-4 rounded border border-white/10 bg-white/5 backdrop-blur-md flex gap-2 items-center transition-transform hover:translate-y-[1px]">
				<input className="flex-1 px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
				<button className="px-4 rounded bg-white/10 hover:bg-white/20 btn-ripple" onClick={() => navigator.clipboard.writeText(tokenId).then(()=>window.toast&&window.toast('Token ID copied'))}>Copy</button>
				<button className="px-4 rounded bg-polyPurple disabled:opacity-60 btn-ripple" disabled={!tokenId || loading} onClick={byToken}>Lookup Token</button>
				{token && <button className="px-4 rounded bg-red-600 disabled:opacity-60 btn-ripple" disabled={!tokenId || loading} onClick={revoke}>Revoke</button>}
			</div>
			{loading && (
				<div className="p-4 rounded bg-black/50 border border-white/10">
					<div className="animate-pulse space-y-2">
						<div className="h-4 bg-white/10 rounded"></div>
						<div className="h-4 bg-white/10 rounded w-2/3"></div>
						<div className="h-40 bg-white/5 rounded"></div>
					</div>
				</div>
			)}
			{result && !loading && (
				<div>
					<div className="flex justify-end mb-2">
						<button className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20" onClick={() => navigator.clipboard.writeText(JSON.stringify(result)).then(()=>window.toast&&window.toast('Result copied'))}>Copy Result</button>
					</div>
					<pre className="p-4 rounded bg-black/50 border border-white/10 overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}
