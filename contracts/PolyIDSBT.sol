// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PolyIDSBT
 * @dev ERC721-based SoulBound Token for verifiable credentials.
 */
contract PolyIDSBT is ERC721, Ownable {
	uint256 private _tokenIdCounter;

	// tokenId => tokenURI
	mapping(uint256 => string) private _tokenURIs;
	// student => tokenIds[]
	mapping(address => uint256[]) private _ownedCredentials;
	// tokenId => revoked
	mapping(uint256 => bool) public revoked;
	// verified issuers
	mapping(address => bool) public isVerifiedIssuer;

	event CredentialIssued(address indexed issuer, address indexed student, uint256 indexed tokenId, string metadataURI);
	event CredentialRevoked(address indexed issuer, uint256 indexed tokenId);
	event IssuerVerified(address indexed issuer, bool verified);

	constructor() ERC721("PolyID Credential", "PIDSBT") Ownable(msg.sender) {}

	modifier onlyVerifiedIssuer() {
		require(isVerifiedIssuer[_msgSender()], "Not verified issuer");
		_;
	}

	function setVerifiedIssuer(address issuer, bool verified) external onlyOwner {
		isVerifiedIssuer[issuer] = verified;
		emit IssuerVerified(issuer, verified);
	}

	function issueCredential(address student, string memory metadataURI) external onlyVerifiedIssuer returns (uint256 tokenId) {
		require(student != address(0), "Invalid student");
		_tokenIdCounter++;
		tokenId = _tokenIdCounter;
		_safeMint(student, tokenId);
		_setTokenURI(tokenId, metadataURI);
		_ownedCredentials[student].push(tokenId);
		emit CredentialIssued(_msgSender(), student, tokenId, metadataURI);
	}

	function revokeCredential(uint256 tokenId) external onlyVerifiedIssuer {
		require(_ownerOf(tokenId) != address(0), "Invalid tokenId");
		revoked[tokenId] = true;
		emit CredentialRevoked(_msgSender(), tokenId);
	}

	function getCredentials(address student) external view returns (uint256[] memory) {
		return _ownedCredentials[student];
	}

	function tokenURI(uint256 tokenId) public view override returns (string memory) {
		require(_ownerOf(tokenId) != address(0), "Nonexistent token");
		return _tokenURIs[tokenId];
	}

	function _setTokenURI(uint256 tokenId, string memory _uri) internal {
		_tokenURIs[tokenId] = _uri;
	}

	// SoulBound: block transfers
	function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
		address from = _ownerOf(tokenId);
		if (from != address(0) && to != address(0)) {
			revert("SBT: non-transferable");
		}
		return super._update(to, tokenId, auth);
	}
}
