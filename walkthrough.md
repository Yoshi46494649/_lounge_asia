# プロジェクトのローカル起動手順

このプロジェクトは静的な HTML ファイルで構成されており、`serve` ライブラリを使用してローカルで閲覧・開発ができるように設定しました。

## 起動コマンド

以下のコマンドでローカルサーバーを起動できます。

```bash
npm run dev
```

起動後、ブラウザで以下の URL にアクセスしてください。
- [http://localhost:3000](http://localhost:3000)

## 構成
- `index.html`: メインのランディングページ
- `scripts/feeds.js`: Instagram や Meetup のフィードを取得・表示するロジック
- `assets/`: 画像やスタイルシート（minify されたものを含む）

## 追加した変更
1. `package.json` に `"dev": "serve ."` を追加しました。
2. 開発用依存関係に `serve` を追加しました。
