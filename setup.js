#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 PolyID Setup Script\n');

// Check if .env files exist
const rootEnv = path.join(__dirname, '.env');
const backendEnv = path.join(__dirname, 'backend', '.env');
const frontendEnv = path.join(__dirname, 'frontend', '.env');

console.log('📋 Checking environment files...');

if (!fs.existsSync(rootEnv)) {
  console.log('❌ Root .env file missing');
  console.log('📝 Please copy .env.example to .env and fill in your private key');
  process.exit(1);
}

if (!fs.existsSync(backendEnv)) {
  console.log('❌ Backend .env file missing');
  console.log('📝 Please create backend/.env with required variables');
  process.exit(1);
}

if (!fs.existsSync(frontendEnv)) {
  console.log('❌ Frontend .env file missing');
  console.log('📝 Please create frontend/.env with API base URL');
  process.exit(1);
}

console.log('✅ Environment files found\n');

// Check if private key is set
const rootEnvContent = fs.readFileSync(rootEnv, 'utf8');
if (!rootEnvContent.includes('PRIVATE_KEY=0x') && !rootEnvContent.includes('PRIVATE_KEY=') || rootEnvContent.includes('PRIVATE_KEY=\n')) {
  console.log('❌ PRIVATE_KEY not set in .env');
  console.log('📝 Please add your wallet private key to .env file');
  process.exit(1);
}

console.log('✅ Private key configured\n');

// Compile contracts
console.log('🔨 Compiling contracts...');
try {
  execSync('npx hardhat compile', { stdio: 'inherit' });
  console.log('✅ Contracts compiled successfully\n');
} catch (error) {
  console.log('❌ Contract compilation failed');
  process.exit(1);
}

// Deploy contracts
console.log('🚀 Deploying contracts...');
try {
  const output = execSync('npx hardhat run scripts/deploy.js --network amoyTestnet', { encoding: 'utf8' });
  console.log(output);
  
  // Extract contract address from output
  const addressMatch = output.match(/PolyIDSBT deployed to: (0x[a-fA-F0-9]{40})/);
  if (addressMatch) {
    const contractAddress = addressMatch[1];
    console.log(`✅ Contract deployed at: ${contractAddress}\n`);
    
    // Update .env files with contract address
    console.log('📝 Updating environment files with contract address...');
    
    // Update root .env
    let rootEnvContent = fs.readFileSync(rootEnv, 'utf8');
    rootEnvContent = rootEnvContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
    fs.writeFileSync(rootEnv, rootEnvContent);
    
    // Update backend .env
    let backendEnvContent = fs.readFileSync(backendEnv, 'utf8');
    backendEnvContent = backendEnvContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
    fs.writeFileSync(backendEnv, backendEnvContent);
    
    // Update frontend .env
    let frontendEnvContent = fs.readFileSync(frontendEnv, 'utf8');
    if (frontendEnvContent.includes('VITE_CONTRACT_ADDRESS=')) {
      frontendEnvContent = frontendEnvContent.replace(/VITE_CONTRACT_ADDRESS=.*/, `VITE_CONTRACT_ADDRESS=${contractAddress}`);
    } else {
      frontendEnvContent += `\nVITE_CONTRACT_ADDRESS=${contractAddress}`;
    }
    fs.writeFileSync(frontendEnv, frontendEnvContent);
    
    console.log('✅ Environment files updated\n');
  }
} catch (error) {
  console.log('❌ Contract deployment failed');
  console.log('Make sure you have test MATIC on Polygon Amoy Testnet');
  process.exit(1);
}

console.log('🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Start MongoDB (if using local instance)');
console.log('2. Run: npm run dev');
console.log('3. Visit http://localhost:5173');
console.log('4. Create an admin issuer account');
console.log('5. Set verified issuer on the smart contract');
console.log('\nFor detailed instructions, see SETUP.md');