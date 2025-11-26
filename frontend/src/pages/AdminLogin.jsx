import { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onLoggedIn, onSwitchToSignup }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleLogin(e) {
		e.preventDefault();
		try {
			setLoading(true);
			setError("");
			const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";
			const { data } = await axios.post(`${base}/api/auth/login`, { email, password });
			sessionStorage.setItem("polyid_jwt", data.token);
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event("polyid:auth"));
			}
			onLoggedIn?.();
		} catch (e) {
			setError(e.response?.data?.error || e.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-md mx-auto p-6 rounded-xl border border-white/10 bg-white/5">
			<h2 className="text-xl font-semibold mb-4">Admin Login</h2>
			<form className="space-y-4" onSubmit={handleLogin}>
				<input 
					className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none" 
					placeholder="Email" 
					type="email"
					value={email} 
					onChange={(e) => setEmail(e.target.value)} 
				/>
				<input 
					className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none" 
					type="password" 
					placeholder="Password" 
					value={password} 
					onChange={(e) => setPassword(e.target.value)} 
				/>
				<button 
					className="w-full py-2 rounded bg-polyPurple hover:opacity-90 disabled:opacity-50" 
					disabled={loading}
				>
					{loading ? "Logging in..." : "Login"}
				</button>
				{error && <p className="text-red-400 text-sm">{error}</p>}
				
				<div className="text-center text-sm text-neutral-400 pt-2">
					Don't have an account?{" "}
					<button
						type="button"
						onClick={onSwitchToSignup}
						className="text-polyPurple hover:underline"
					>
						Sign up here
					</button>
				</div>
			</form>
		</div>
	);
}










