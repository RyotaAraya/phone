<script setup>
import { createClient } from '@supabase/supabase-js'
const runtimeConfig = useRuntimeConfig();
const supabase = createClient(runtimeConfig.public.SUPABASE_URL, runtimeConfig.public.SUPABASE_KEY)
const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
</template>