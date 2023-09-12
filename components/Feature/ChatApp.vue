<script setup lang="ts">
import { Database } from "@/types/supabase";
import { ref, onMounted } from "vue";

import useDatabase from "@/composable/useDatabase";
import useAuth from "@/composable/useAuth";

const nuxtApp = useNuxtApp();
const supabase = nuxtApp.$supabase;

const inputText = ref("");
const messageText = ref<Database[]>([]);
const { session: isLogin, profileFromGithub } = useAuth();
const { fetchDatabase, addSupabaseData } = useDatabase();

const router = useRouter();

// ログアウト済みの場合はログインページにリダイレクト
if (!isLogin) router.push("/");

const onChangeInputText = (event) => {
  inputText.value = event.target.value;
};

const onSubmitNewMessage = (event) => {
  event.preventDefault();
  if (!inputText.value) return;
  addSupabaseData({ message: inputText.value, ...profileFromGithub.value });
  inputText.value = "";
};
</script>
<template>
  <div>
    <div
      v-for="item in messageText"
      :key="item.id"
      :data-my-chat="item.nickName === profileFromGithub.nickName"
    >
      <div>
        <!--        <time>{{ dateToString(item.createdAt, "MM/DD HH:mm") }}</time>-->
        <a
          :href="`https://github.com/${item.nickName}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img v-if="item.avatarUrl" :src="item.avatarUrl" alt="アイコン" />
          <nuxt-img v-else src="/noimage.png" alt="no image" />
          <p>{{ item.nickName ? item.nickName : "名無し" }}</p>
        </a>
      </div>
      <div>
        <p>{{ item.message }}</p>
      </div>
    </div>

    <form @submit.prevent="onSubmitNewMessage">
      <input
        type="text"
        name="message"
        v-model="inputText"
        aria-label="新規メッセージを入力"
      />
      <button type="submit" :disabled="!inputText">送信</button>
    </form>
  </div>
</template>
