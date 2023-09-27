import { ref, onMounted } from "vue";
import { Database } from "@/types/supabase";

export default function useSupabase() {
  const nuxtApp = useNuxtApp();
  const supabase = nuxtApp.$supabase;

  const data = ref<Database[] | null>(null);
  const error = ref<Error | null>(null);

  const TABLE_NAME = "chat-app";

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
    TABLE_NAME,
    data,
    error,
    fetchDatabase,
    addSupabaseData,
  };
}
