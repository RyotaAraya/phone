<script setup lang="ts">
import { Database } from "@/types/supabase";
import { ref, onMounted } from "vue";
import { dateToString } from "@/utils/dateToString";

import useDatabase from "@/composable/useDatabase";
import useAuth from "@/composable/useAuth";

const nuxtApp = useNuxtApp();
const supabase = nuxtApp.$supabase;

const inputText = ref("");
const messages = ref<Database[]>([]);
const { session: isLogin, profileFromGithub } = useAuth();
const { fetchDatabase, addSupabaseData, TABLE_NAME } = useDatabase();

const router = useRouter();

// ログアウト済みの場合はログインページにリダイレクト
if (!isLogin) router.push("/");

const fetchRealtimeData = () => {
  try {
    supabase
      .channel("table_postgres_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLE_NAME,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const currentMessage = messages.value;
            const { createdAt, id, message, avatarUrl, nickName } = payload.new;
            console.log(typeof currentMessage);
            messages.value = [
              ...messages.value,
              { createdAt, id, message, avatarUrl, nickName },
            ];
          }
        },
      )
      .subscribe();

    // この部分はNuxtでは使用しない。beforeUnmount内で実行する場合は、onBeforeUnmountフックを使用してください。
  } catch (error) {
    console.error(error);
  }
};

// 初回のみ全データフェッチとリアルタイムリスナー登録
onMounted(async () => {
  const allMessage = await fetchDatabase();
  messages.value = !allMessage ? [] : allMessage;
  fetchRealtimeData();
});

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
    <form @submit.prevent="onSubmitNewMessage">
      <input
        type="text"
        name="message"
        v-model="inputText"
        @input="onChangeInputText"
        aria-label="新規メッセージを入力"
      />
      <button type="submit" :disabled="!inputText">送信</button>
    </form>
    <div
      v-for="item in messages"
      :key="item.id"
      :data-my-chat="item.nickName === profileFromGithub.nickName"
    >
      <div>
        <time>{{ dateToString(item.createdAt, "MM/DD HH:mm") }}</time>
        <a
          :href="`https://github.com/${item.nickName}`"
          target="_blank"
          rel="noopener noreferrer"
          class="w-4"
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
  </div>
</template>
