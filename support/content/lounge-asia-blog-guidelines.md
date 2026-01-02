# Lounge Asia ブログ記事作成ガイドライン (AI向け)

Lounge Asia のブランドトーンと SEO 方針を守りつつ、静的 LP 向けに十分なボリュームと深さを持つ記事を書くための指示です。

---

## 1. 基本方針
| 項目 | 指示 | 目的 |
| --- | --- | --- |
| SEO戦略 | コンテンツピラー戦略を厳守し、ターゲットキーワードをタイトル・見出し・本文に自然に織り込む。 | 検索エンジンでの権威性を高める。 |
| ターゲット | アジア系の背景を持つ、またはアジア文化・言語に関心がある 25-40 歳の読者。 | 読者の共感を得てイベント参加を促す。 |
| トーン | 「Comfort and Romance」を感じる、落ち着いた上品な語り口。軽薄な表現や誇張は禁止。 | ブランドイメージの維持。 |
| 言語 | 中学生でも理解できるシンプル英語 + オーストラリア英語スペル (`organise`, `centre` など)。 | 読みやすさとローカルSEO強化。 |

---

## 2. 記事ボリュームと必須要素
1. **各 H2 セクションは 300 語以上**。WHY/HOW/次のステップを具体的に説明する。
2. **最低 2 個の数値・統計・具体例**（例: 参加者人数、料金、実施回数）を本文に入れる。
3. **参加者の匿名エピソード**を 1 つ挿入する（1-2 行でOK）。
4. **CTA/公式情報** では下記を必ず列挙：
   - Host: Lounge Asia (Brisbane’s largest Asian community, 500+ members)
   - Theme: Comfort and Romance
   - Tagline: Connecting hearts across Asian cultures.
   - Venue: The Stock Exchange Hotel – Level 2
   - Dress code: Smart Casual
   - Pricing: Men AUD 50 + GST / Women Free (Stripe payment)
5. **イベント中は連絡先交換ができない理由**（公平性・安心感）を説明する。
6. **関連記事セクション**には 3 件以上の内部リンクを Markdown リストで書く。

---

## 3. 記事構成テンプレート
| セクション | 指示 |
| --- | --- |
| タイトル & メタ | キーワードを先頭に置き、感情価値語 (Ultimate, Guide など) を入れる。メタ説明は 150 文字前後。 |
| 導入 | 読者の課題とイベントの魅力を 2-3 段落で描写。Comfort/Romance を明示する。 |
| 目次 | H2 を列挙した TOC を必ず入れる。 |
| 本文 | H2/H3 ごとに HOW と WHY を説明し、統計・体験談・Tips を含める。 |
| CTA | 予約リンク・待機リスト案内。Comfort and Romance を再確認。 |
| 公式情報 & 免責 | 必須情報 (上記 2-4) を箇条書きで記載し、プライバシーポリシーを一言添える。 |
| 関連記事 | カテゴリの近い記事を 3 件以上紹介。 |

---

## 4. 地域別キーワード
| 地域 | 主要キーワード | 備考 |
| --- | --- | --- |
| Brisbane | Brisbane, QLD, South Bank, Fortitude Valley | 既存イベント・会場とのつながりを強調。 |
| Melbourne | Melbourne, VIC, Southbank, St Kilda, CBD | メルボルン拡張用コンテンツに活用。 |

---

## 5. 作成フロー
1. Excel から未投稿キーワードを選ぶ。
2. 本ガイドラインに従ってアウトライン → 本文を作成。
3. 自己チェックで語数/統計/必須情報を確認。
4. 静的 LP に反映後、`python -m http.server 5173` で目視確認。
