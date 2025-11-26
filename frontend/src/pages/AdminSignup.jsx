import { useState } from "react";
import axios from "axios";

export default function AdminSignup({ onSignupSuccess }) {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		walletAddress: ""
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	async function handleSignup(e) {
		e.preventDefault();
		setError("");

		// Validation
		if (!form.name || !form.email || !form.password || !form.walletAddress) {
			setError("All fields are required");
			return;
		}

		if (form.password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}

		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(form.email)) {
			setError("Please enter a valid email address");
			return;
		}

		// Basic wallet address validation
		if (!form.walletAddress.startsWith("0x") || form.walletAddress.length !== 42) {
			setError("Please enter a valid Ethereum wallet address (0x...)");
			return;
		}

		try {
			setLoading(true);
			const base = import.meta.env.VITE_API_BASE || "http://localhost:4001";
			await axios.post(`${base}/api/auth/seed`, {
				name: form.name,
				email: form.email,
				password: form.password,
				walletAddress: form.walletAddress
			});

			setSuccess(true);
			setForm({ name: "", email: "", password: "", confirmPassword: "", walletAddress: "" });

			// Redirect to login after 2 seconds
			setTimeout(() => {
				onSignupSuccess?.();
			}, 2000);
		} catch (e) {
			setError(e.response?.data?.error || e.message || "Signup failed");
		} finally {
			setLoading(false);
		}
	}

	function updateForm(field, value) {
		setForm({ ...form, [field]: value });
		setError(""); // Clear error when user types
	}

	function fillMockData() {
		const randomNum = Math.floor(Math.random() * 10000);
		// Generate random valid-looking Ethereum address
		const randomWallet = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

		setForm({
			name: "Quantum Valley University",
			email: `admin${randomNum}@quantum.edu`,
			walletAddress: randomWallet,
			password: "password123",
			confirmPassword: "password123"
		});
		setError("");
	}

	return (
		<div className="max-w-md mx-auto p-6 rounded-xl border border-white/10 bg-white/5">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h2 className="text-2xl font-semibold mb-2">University Registration</h2>
					<p className="text-neutral-400 text-sm">
						Create an account to start issuing verifiable credentials
					</p>
				</div>
				<button
					type="button"
					onClick={fillMockData}
					className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-300 transition-colors"
					title="Fill with fresh mock data"
				>
					✨ Auto-fill
				</button>
			</div>

			{success ? (
				<div className="p-4 rounded bg-green-500/10 border border-green-500/30 text-green-300">
					<div className="font-semibold mb-2">✓ Registration Successful!</div>
					<p className="text-sm">Your account has been created. Redirecting to login...</p>
				</div>
			) : (
				<form className="space-y-4" onSubmit={handleSignup}>
					<div>
						<label className="block text-sm font-medium mb-1">University Name</label>
						<input
							className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none"
							placeholder="e.g., Massachusetts Institute of Technology"
							value={form.name}
							onChange={(e) => updateForm("name", e.target.value)}
							disabled={loading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Email Address</label>
						<input
							className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none"
							type="email"
							placeholder="admin@university.edu"
							value={form.email}
							onChange={(e) => updateForm("email", e.target.value)}
							disabled={loading}
						/>
						<p className="text-xs text-neutral-400 mt-1">Use your official university email</p>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Wallet Address</label>
						<input
							className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none font-mono text-sm"
							placeholder="0x..."
							value={form.walletAddress}
							onChange={(e) => updateForm("walletAddress", e.target.value)}
							disabled={loading}
						/>
						<p className="text-xs text-neutral-400 mt-1">Your university's Ethereum wallet address</p>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none"
							type="password"
							placeholder="Minimum 8 characters"
							value={form.password}
							onChange={(e) => updateForm("password", e.target.value)}
							disabled={loading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Confirm Password</label>
						<input
							className="w-full px-3 py-2 rounded bg-neutral-900 border border-white/10 focus:border-polyPurple focus:outline-none"
							type="password"
							placeholder="Re-enter password"
							value={form.confirmPassword}
							onChange={(e) => updateForm("confirmPassword", e.target.value)}
							disabled={loading}
						/>
					</div>

					<button
						className="w-full py-2 rounded bg-polyPurple hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Create Account"}
					</button>

					{error && (
						<div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
							{error}
							{error.includes("exists") && (
								<div className="mt-2">
									<button
										type="button"
										onClick={onSignupSuccess}
										className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-white text-xs font-medium transition-colors"
									>
										Go to Login →
									</button>
								</div>
							)}
						</div>
					)}

					<div className="text-center text-sm text-neutral-400 pt-2">
						Already have an account?{" "}
						<button
							type="button"
							onClick={onSignupSuccess}
							className="text-polyPurple hover:underline"
						>
							Login here
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
