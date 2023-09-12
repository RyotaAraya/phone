import { ref, onMounted } from "vue";
import { Database } from "@/types/supabase";

export default function useSupabase() {
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase;

  // テーブル名
  const TABLE_NAME = "chat-app";

  const data = ref<Database[] | null>(null);
  const error = ref<Error | null>(null);

  const fetchDatabase = async () => {
    try {
      const { data: fetchedData } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("createdAt");
      data.value = fetchedData;
    } catch (err) {
      error.value = err;
      console.error(err);
    }
  };

  onMounted(fetchDatabase); // Mounted時にデータをフェッチ

  const addSupabaseData = async ({
    message,
    avatarUrl,
    nickName,
  }: Pick<Database, "message" | "nickName" | "avatarUrl">) => {
    try {
      await supabase.from(TABLE_NAME).insert({ message, avatarUrl, nickName });
    } catch (err) {
      error.value = err;
      console.error(err);
    }
  };

  return {
    data,
    error,
    fetchDatabase,
    addSupabaseData,
  };
}
