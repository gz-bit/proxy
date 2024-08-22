import { 
  component$, Slot, useStore, useContextProvider, createContextId, useVisibleTask$,
} from '@builder.io/qwik'
import axios from 'axios'

import { supabase } from '~/utils/supabase'
import { Navigation } from '../components/site/navigation/navigation';
import { Footer } from '../components/site/footer/footer';

export const UserSessionContextId = createContextId('user-session') 

export default component$(() => {

  const userSession = useStore({ userId: "", isLoggedIn: false });
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser()

    if (data && data?.user?.id) {
      console.log(data)
      // Set Auth State Context
      userSession.userId = data.user.id
      userSession.isLoggedIn = true
    } else {
      // Set Auth State Context
      userSession.userId = ""
      userSession.isLoggedIn = false
    }
  })
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log(event)

        if (
          event === "SIGNED_IN" &&
          session?.access_token &&
          session?.refresh_token
        ) {
          // Send cookies to server
          const body = {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
          }

          // Send request to server
          await axios
            .post("/api_v1/store-auth", body, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data)

              // Set Auth State Context
              userSession.userId = session?.user?.id
              userSession.isLoggedIn = true
            })
            .catch((err) => {
              console.log(err)
            })
        }

        if (event === "SIGNED_OUT") {
          // Sign out user on server
          await axios
            .get("/api_v1/logout")
            .then((res) => {
              console.log(res.data)

              // Set Auth State Context
              userSession.userId = ""
              userSession.isLoggedIn = false
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    )

    // Cleanup event listener
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  })

  // Pass state to children via context
  useContextProvider(UserSessionContextId, userSession)

  return (
    <>
      <main>
        <Navigation />
        <section>
          <Slot />
        </section>
        <Footer />
      </main>
    </>
  )
})
