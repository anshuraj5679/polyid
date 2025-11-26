import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema(
	{
		tokenId: { type: String, index: true },
		student: { type: String, index: true },
		issuer: { type: mongoose.Schema.Types.ObjectId, ref: "Issuer" },
		metadataURI: { type: String },
		fileCid: { type: String },
		revoked: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

export const Credential = mongoose.model("Credential", credentialSchema);



