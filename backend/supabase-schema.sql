-- PolyID Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'issuer', 'admin')),
    wallet_address VARCHAR(42),
    university_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credentials table
CREATE TABLE IF NOT EXISTS credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_wallet VARCHAR(42) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    issuer_wallet VARCHAR(42) NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    graduation_date DATE NOT NULL,
    ipfs_hash VARCHAR(255),
    transaction_hash VARCHAR(66),
    token_id INTEGER,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'issued', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_address VARCHAR(42) NOT NULL,
    plan VARCHAR(50) NOT NULL CHECK (plan IN ('free', 'basic', 'premium')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('stripe', 'crypto')),
    stripe_subscription_id VARCHAR(255),
    transaction_hash VARCHAR(66),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Issuers table (for verified issuers)
CREATE TABLE IF NOT EXISTS issuers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_credentials_student ON credentials(student_wallet);
CREATE INDEX IF NOT EXISTS idx_credentials_issuer ON credentials(issuer_wallet);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_wallet ON subscriptions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_issuers_wallet ON issuers(wallet_address);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credentials_updated_at BEFORE UPDATE ON credentials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issuers_updated_at BEFORE UPDATE ON issuers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE issuers ENABLE ROW LEVEL SECURITY;

-- RLS Policies (using service role key, so these are permissive)
CREATE POLICY "Enable all access for service role" ON users FOR ALL USING (true);
CREATE POLICY "Enable all access for service role" ON credentials FOR ALL USING (true);
CREATE POLICY "Enable all access for service role" ON subscriptions FOR ALL USING (true);
CREATE POLICY "Enable all access for service role" ON issuers FOR ALL USING (true);
