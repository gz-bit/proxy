import { createClient } from "@supabase/supabase-js";
import { Sb } from './supabase.env'

const supabaseUrl = Sb.project_url
const supabaseAnonPublic = Sb.key_anon_public

export const supabase = createClient(supabaseUrl, supabaseAnonPublic);
