import mongoose from "mongoose";

const issuerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		walletAddress: { type: String, required: true },
		verified: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

export const Issuer = mongoose.model("Issuer", issuerSchema);



