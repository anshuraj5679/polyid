import { supabaseAdmin } from '../config/supabase.js';

// User operations
export async function createUser(userData) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([userData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserByEmail(email) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data;
}

export async function getUserByWallet(walletAddress) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUser(id, updates) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Credential operations
export async function createCredential(credentialData) {
  const { data, error } = await supabaseAdmin
    .from('credentials')
    .insert([credentialData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getCredentialsByStudent(studentWallet) {
  const { data, error } = await supabaseAdmin
    .from('credentials')
    .select('*')
    .eq('student_wallet', studentWallet)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function getCredentialsByIssuer(issuerWallet) {
  const { data, error } = await supabaseAdmin
    .from('credentials')
    .select('*')
    .eq('issuer_wallet', issuerWallet)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateCredential(id, updates) {
  const { data, error } = await supabaseAdmin
    .from('credentials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Subscription operations
export async function createSubscription(subscriptionData) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .insert([subscriptionData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getSubscriptionByWallet(walletAddress) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('wallet_address', walletAddress)
    .eq('status', 'active')
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSubscription(id, updates) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Issuer operations
export async function createIssuer(issuerData) {
  const { data, error } = await supabaseAdmin
    .from('issuers')
    .insert([issuerData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getIssuerByWallet(walletAddress) {
  const { data, error } = await supabaseAdmin
    .from('issuers')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function verifyIssuer(walletAddress) {
  const { data, error } = await supabaseAdmin
    .from('issuers')
    .update({ 
      is_verified: true, 
      verification_date: new Date().toISOString() 
    })
    .eq('wallet_address', walletAddress)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getAllVerifiedIssuers() {
  const { data, error } = await supabaseAdmin
    .from('issuers')
    .select('*')
    .eq('is_verified', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}
