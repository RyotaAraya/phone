import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = nuxtApp.$config;
  const supabase = createClient(
    runtimeConfig.public.SUPABASE_URL as string,
    runtimeConfig.public.SUPABASE_KEY as string,
  );
  nuxtApp.$supabase = supabase;
});
