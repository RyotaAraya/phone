<script setup>
import { computed } from "vue";
import useAuth from "@/composable/useAuth";
import SignInGithub from "@/components/Feature/SignInGithub.vue";
import ChatApp from "@/components/Feature/ChatApp.vue";
import LogoutButton from "@/components/Feature/LogoutButton.vue";

const { session } = useAuth();
const isLogin = computed(() => !!session.value);
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    This is a Vue 3 + Vite + Supabase + Tailwind CSS + TypeScript + Chat
  </h1>
  <LogoutButton v-if="isLogin" />
  <ChatApp v-if="isLogin" />
  <SignInGithub v-else />
</template>
