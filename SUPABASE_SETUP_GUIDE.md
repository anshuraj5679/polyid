# 🗄️ Supabase Database Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...` - this is what you provided)

## Step 2: Update Backend .env File

Open `polyid/backend/.env` and update these values:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=sb_secret_tJITe1LPp7u4lcje8ej-Pw_GoGniLgp
```

**Note:** You already have the service role key. Just need to add the URL and anon key!

## Step 3: Create Database Tables

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `polyid/backend/supabase-schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

This will create:
- ✅ `users` table
- ✅ `credentials` table
- ✅ `subscriptions` table
- ✅ `issuers` table
- ✅ Indexes for performance
- ✅ Auto-update triggers
- ✅ Row Level Security policies

## Step 4: Verify Tables Created

1. Go to **Table Editor** in Supabase Dashboard
2. You should see 4 tables: `users`, `credentials`, `subscriptions`, `issuers`

## Step 5: Restart Backend Server

After updating the `.env` file:

```bash
cd polyid/backend
npm run restart
```

Or if the server is running, it will auto-restart when you save the `.env` file.

## Step 6: Test the Connection

The backend will automatically use Supabase if the credentials are configured. Check the console logs:

```
✅ Supabase connected
```

## Benefits of Using Supabase

- ✅ **Cloud-hosted** - No need to run MongoDB locally
- ✅ **PostgreSQL** - More reliable and feature-rich
- ✅ **Real-time** - Built-in real-time subscriptions
- ✅ **Free tier** - 500MB database, 2GB bandwidth
- ✅ **Automatic backups** - Daily backups included
- ✅ **Row Level Security** - Built-in security policies
- ✅ **REST API** - Auto-generated REST API
- ✅ **Dashboard** - Easy data management

## Migration from File Storage

Your existing data in JSON files (`users.json`, `credentials.json`, etc.) will continue to work. The system will:

1. Try Supabase first (if configured)
2. Fall back to file storage if Supabase is not available

To migrate existing data, you can manually insert records via the Supabase dashboard or create a migration script.

## Troubleshooting

### Error: "Supabase service role credentials are missing"
- Make sure all three env variables are set: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Error: "relation does not exist"
- Run the SQL schema file in Supabase SQL Editor

### Error: "Invalid API key"
- Double-check your service role key in the `.env` file
- Make sure there are no extra spaces or quotes

## Next Steps

Once Supabase is configured, your PolyID app will:
- Store all users in Supabase
- Store all credentials in Supabase
- Store all subscriptions in Supabase
- Have persistent data across server restarts
- Be ready for production deployment!

---

**Need Help?** Check the Supabase documentation: https://supabase.com/docs
