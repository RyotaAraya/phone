# Nuxt3 + Supabase チャットアプリ

- [【Supabase入門】認証・DB・リアルタイムリスナーを使ってチャットアプリを作ろう](https://zenn.dev/chot/articles/ddd2844ad3ae61#%E3%83%81%E3%83%A3%E3%83%83%E3%83%88%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E5%AE%9F%E8%A3%85) の写経

本リポジトリは、上記のzenn記事を参考にNuxt3で作りました。

https://github.com/redamoon/supabase-nuxt3-chat/assets/2642197/811337ca-8cd4-43c8-a8a5-20a1e9ab4b25

## Environment

- Node.js v18.17.0
- npm 9.8.1

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Supabase setup

1. [Supabase](https://supabase.io/) にサインアップ
2. プロジェクトを作成
3. プロジェクトの設定画面から、`API URL` と `anon key` をコピー
4. `.env.example` を `.env` にリネーム
5. `.env` の `NUXT_PUBLIC_SUPABASE_URL` と `NUXT_PUBLIC_SUPABASE_KEY` に、コピーした値を貼り付け
6. テーブルを作成
7. `chat-app` の名前でテーブルを作成
8. Enable Row Level Security (RLS) と Enable Row Level Security (RLS) にチェック
    - ※本番環境の際には正しいセキュリティの設定を行うこと
9. ![2023-09-27-23-00-48](https://github.com/redamoon/supabase-nuxt3-chat/assets/2642197/6eb050ba-9724-4e8f-a017-cf2ccf0d559b)
    - 下にある内容のカラムを追加する
10. https://supabase.com/dashboard/project/設定したプロジェクト/auth/policies でポリシーの設定をする
    - Policy name: `ログインできたユーザのみ送信と読み書き`
    - Target roles: `authenticated`
    - USING expression: `true`
    - WITH CHECK expression: `true`
11. `npm run dev` でローカルサーバを起動

| Name       |Type|Default Value|Primary|
|------------|---|---|---|
| id         |uuid|gen_random_uuid()|○|
| created_at |timestamp|now()|○|
| messaage   |text|||
| nickName   |text|||
|avatarUrl   |text|||

