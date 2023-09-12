<script lang="ts" setup>
import useAuth from "@/composable/useAuth";

const { signInWithGithub, error } = useAuth();
</script>

<template>
  <div class="wrapper">
    <button @click="signInWithGithub">Githubでサインインする</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
