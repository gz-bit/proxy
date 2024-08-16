import { createClient } from "@supabase/supabase-js"
import { Sb } from './supabase.env'

const env = import.meta.env.DEV ? Sb.dev : Sb.prod

export const supabase = createClient(
  env.supabaseProjectUrl,
  env.supabasePublicKey
)

export const supabaseServer = createClient(
  env.supabaseProjectUrl,
  env.supabaseSecretKey
)

// Supabase projects are paused if not accessed for a week
// to keep the dev project "Page Local" open in a prod environment:
if (import.meta.env.PROD) {
  const devClient = createClient(Sb.dev.supabaseProjectUrl, Sb.dev.supabasePublicKey)
  devClient.auth.signOut() // we will see if this is sufficient
}
