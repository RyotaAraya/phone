<script lang="ts" setup>
import useAuth from "@/composable/useAuth";

const { signOut } = useAuth();
</script>

<template>
  <div class="wrapper">
    <button @click="signOut">ログアウト</button>
  </div>
</template>
