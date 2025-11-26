import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "./lib/wagmi.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider theme={darkTheme()}>
						<App />
					</RainbowKitProvider>
				</WagmiConfig>
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
