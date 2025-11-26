import { useState } from "react";
import axios from "axios";

export default function IssueCredential() {
	const [form, setForm] = useState({ student: "", studentName: "", name: "", description: "", issuedBy: "", dateIssued: "" });
	const [file, setFile] = useState(null);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [needsSubscription, setNeedsSubscription] = useState(false);
	const token = sessionStorage.getItem("polyid_jwt");

	function goToBilling() {
		if (typeof window !== "undefined") {
			window.dispatchEvent(new CustomEvent("polyid:navigate", { detail: "billing" }));
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		
		// Validation
		if (!form.student) {
			alert("Please enter student wallet address");
			return;
		}
		if (!token) {
			alert("Please login first");
			return;
		}
		
		try {
			setLoading(true);
			setResult(null);
			setError("");
			setNeedsSubscription(false);
			const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";
			console.log("🚀 Submitting to:", `${base}/api/issue`);
			console.log("📋 Form data:", form);
			console.log("🔑 Token:", token ? "Present" : "Missing");
			
			const fd = new FormData();
			Object.entries(form).forEach(([k, v]) => fd.append(k, v));
			if (file) {
				fd.append("file", file);
				console.log("📎 File attached:", file.name);
			}
			
			if (window.topbarStart) window.topbarStart();
			const { data } = await axios.post(`${base}/api/issue`, fd, { 
				headers: { Authorization: `Bearer ${token}` },
				timeout: 30000 // 30 second timeout
			});
			
			console.log("✅ Success:", data);
			setResult(data);
			if (window.toast) window.toast("Credential issued");
			
			// Clear form on success
			setForm({ student: "", studentName: "", name: "", description: "", issuedBy: "", dateIssued: "" });
			setFile(null);
			
		} catch (e) {
			console.error("❌ Error:", e);
			const errorMsg = e.response?.data?.error || e.message || "Unknown error occurred";
			setError(errorMsg);
			if (e.response?.status === 402 && e.response?.data?.needsPayment) {
				setNeedsSubscription(true);
			}
			if (window.toast) window.toast(errorMsg, "error");
		} finally {
			setLoading(false);
			if (window.topbarDone) window.topbarDone();
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:translate-y-[1px]" data-reveal>
			<h2 className="text-xl font-semibold mb-4">Issue Credential</h2>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Student Wallet Address" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} />
				<input className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Student Name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
				<div className="grid grid-cols-2 gap-3">
					<input className="px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Course / Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
					<input className="px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Issued By" value={form.issuedBy} onChange={(e) => setForm({ ...form, issuedBy: e.target.value })} />
				</div>
				<input className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
				<input className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10" placeholder="Date (YYYY-MM-DD)" value={form.dateIssued} onChange={(e) => setForm({ ...form, dateIssued: e.target.value })} />
				<input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
				<button className="w-full py-2 rounded bg-polyPurple disabled:opacity-60 disabled:cursor-not-allowed transition-transform hover:scale-[1.01] btn-ripple" disabled={loading}>{loading ? "Issuing..." : "Issue"}</button>
			</form>
			{loading && (
				<div className="mt-4 animate-pulse space-y-2">
					<div className="h-4 bg-white/10 rounded"></div>
					<div className="h-4 bg-white/10 rounded w-2/3"></div>
				</div>
			)}
			{error && (
				<div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
					<strong>Error:</strong> {error}
					{needsSubscription && (
						<button onClick={goToBilling} className="ml-4 inline-flex items-center px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs">
							Activate monthly plan →
						</button>
					)}
				</div>
			)}
			{result && (
				<div className="mt-4 p-3 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
					<div><strong>✅ Credential Issued Successfully!</strong></div>
					<div className="flex items-center gap-2">Token ID: {result.tokenId}
						<button onClick={() => navigator.clipboard.writeText(result.tokenId).then(() => window.toast && window.toast('Token ID copied'))} className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20">Copy</button>
					</div>
					{result.transactionHash && (
						<div className="flex items-center gap-2">Transaction: <a className="text-blue-400 underline" href={`https://amoy.polygonscan.com/tx/${result.transactionHash}`} target="_blank" rel="noreferrer">View on Explorer</a>
							<button onClick={() => navigator.clipboard.writeText(result.transactionHash).then(() => window.toast && window.toast('Tx hash copied'))} className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20">Copy</button>
						</div>
					)}
					{result.note && <div className="text-yellow-400 mt-2">{result.note}</div>}
				</div>
			)}
		</div>
	);
}
