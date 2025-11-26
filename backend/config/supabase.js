import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = process.env;

function makeClient(apiKey) {
	if (!SUPABASE_URL || !apiKey) return null;
	return createClient(SUPABASE_URL, apiKey, {
		auth: { persistSession: false },
		global: { headers: { "x-polyid-billing": "true" } }
	});
}

export const supabasePublic = makeClient(SUPABASE_ANON_KEY);
export const supabaseAdmin = makeClient(SUPABASE_SERVICE_ROLE_KEY);

export function assertSupabaseConfigured() {
	if (!supabaseAdmin) {
		throw new Error("Supabase service role credentials are missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
	}
}




