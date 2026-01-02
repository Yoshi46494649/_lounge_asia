# Lounge Asia 自動ブログ投稿フロー

## 1. 前提
- `OPENAI_API_KEY` を環境変数（ローカルでは `.env.local` 等、CI では GitHub Secrets）に設定してください。
- 画像は `brisbane-asian-blogging/public/blog-images/<category>/` に配置します。
- キーワード Excel (`support/content/keyword_research_data.xlsx`) と ガイドライン (`support/content/lounge-asia-blog-guidelines.md`) を最新化してコミットしてください。
- Python 3.12 以上、Node.js 20 以上を推奨。初回は以下を実行します。

```bash
python -m pip install -r scripts/requirements.txt
npm install
npm install --prefix brisbane-asian-blogging
npx playwright install chromium
```

## 2. ローカル実行
### ドライラン（生成のみ確認）
```bash
python scripts/auto_post.py --dry-run --skip-git --verbose
```
- Markdown/Excel は書き換えず、OpenAI への問い合わせ結果とログのみ出力します。

### 実行（コミット無し）
```bash
python scripts/auto_post.py --skip-git --verbose
```
- Excel の投稿済みフラグと Markdown を生成。Lint/ビルド/Playwright/`semgrep` が完走することを確認してください。

### フル実行（コミット＆プッシュ）
```bash
python scripts/auto_post.py --verbose
```
- すべて成功した場合のみ `git commit` → `git push origin main` を行います。

> **Note:** 途中で失敗した場合は Excel と Markdown の変更を確認し、問題を解消した後に再実行してください。不要な変更は手動でリセットするか、次回実行前に対応します。

## 3. GitHub Actions
- ワークフロー: `.github/workflows/daily-post.yml`
- 実行タイミング: 毎日 21:00 UTC（AEST 07:00） + 手動トリガー (`workflow_dispatch`)
- 主な処理:
  1. Node.js / Python / Playwright 依存関係をインストール
  2. `semgrep --config p/ci --error` を実行（事前チェック）
  3. `python scripts/auto_post.py --verbose` で記事生成〜コミット／プッシュ
  4. `git status --short` でログ確認

CI 内でも `PYTHONUTF8=1` を設定しているため、Windows 由来のエンコード問題を回避できます。

## 4. 失敗時のリカバリ
- **OpenAIエラー**: 再試行前に API ステータスと利用制限を確認してください。必要なら `--keyword "<manual keyword>"` で再実行できます。
- **CI失敗**: ログの該当コマンド（Semgrep/Lint/Build/Playwright）をローカルで再現し、修正してから再実行。
- **Git Push失敗**: ローカルで `git status` を確認し、競合がある場合は取得 (`git fetch`) → 再実行。CI 上で失敗した場合はワークフローを手動で再実行します。

## 5. その他
- `scripts/config.yaml` で画像カテゴリのマッピング、コミットメッセージなどを調整可能です。
- `support/` 配下は運用データなので常に最新版をコミットしてください。
- 既存記事と重複するタイトルの場合、スクリプトが自動的にタイムスタンプ付きスラッグへ切り替えます。
