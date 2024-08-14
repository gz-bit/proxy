import { createClient } from "@supabase/supabase-js"
import { Sb } from './supabase.env'

const env = import.meta.env.DEV ? Sb.dev : Sb.prod

export const supabase = createClient(
  env.project_url,
  env.key_anon_public
)

// Supabase projects are paused if not accessed for a week
// to keep the dev project "Page Local" open in a prod environment:
if (import.meta.env.PROD) {
  const devClient = createClient(Sb.dev.project_url, Sb.dev.key_anon_public)
  devClient.auth.signOut() // we will see if this is sufficient
}
