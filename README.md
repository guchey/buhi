# 🐕 Buhi - Claude Code Sound Effects

Claude Codeのタスク完了時に「ブヒ」音を鳴らすジョークリポジトリです。

## 🎵 概要

このリポジトリは、Claude Codeのhooks機能を使用してタスク完了時に音声ファイルを再生する設定を提供します。
タスクが完了するたびに「ブヒ」という可愛い音が鳴ります。

## ⚡ クイックインストール

### 方法1: npx add-skill を使用（推奨）

```bash
npx add-skill guchey/buhi
```

### 方法2: npm パッケージとしてインストール

```bash
npx @guchey/buhi
```

どちらの方法も自動的に以下を実行します：
- 音声ファイルを `~/.claude/` にコピー
- `~/.claude/settings.json` に Stop フックを追加
- 既存の設定を保持

インストール後、Claude Code を再起動してください。

## 📋 手動セットアップ手順

### 🤖 Claude向け自律セットアップ

Claudeがこのリポジトリを設定する場合の完全な手順：

#### ステップ1: リポジトリのクローン
```bash
git clone https://github.com/guchey/buhi.git
cd buhi
```

#### ステップ2: Claude設定ディレクトリの準備
```bash
# Claude Code設定ディレクトリを作成
mkdir -p ~/.claude
```

#### ステップ3: 音声ファイルの配置
```bash
# buhi.m4aファイルをClaude設定ディレクトリにコピー
cp buhi.m4a ~/.claude/
```

#### ステップ4: settings.jsonの作成・更新
`~/.claude/settings.json`ファイルを作成または更新します：

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay ~/.claude/buhi.m4a"
          }
        ]
      }
    ]
  }
}
```

**重要**: 既存の`settings.json`がある場合は、`hooks`セクションを適切にマージしてください。

#### ステップ5: 動作テスト
```bash
# 音声ファイルが正しくコピーされているか確認
ls -la ~/.claude/buhi.m4a

# 音声が再生されるかテスト
afplay ~/.claude/buhi.m4a
```

#### ステップ6: Claude Code再起動
設定を有効にするためにClaude Codeを再起動してください。

## 🚀 使用方法

1. 上記のセットアップを完了
2. Claude Codeでタスクを実行
3. タスク完了時に自動的に「ブヒ」音が再生される

## 📝 注意事項

- macOSの`afplay`コマンドを使用しているため、macOS環境でのみ動作します
- 他のOSを使用している場合は、適切な音声再生コマンドに変更してください：
  - Windows: `powershell -c (New-Object Media.SoundPlayer "path/to/buhi.wav").PlaySync()`
  - Linux: `aplay buhi.wav` または `paplay buhi.wav`

## 🎉 カスタマイズ

- 他の音声ファイルに変更したい場合は、`buhi.m4a`を別のファイルに置き換えてください
- 音量を調整したい場合は、`afplay`コマンドに`-v`オプションを追加できます：
  ```json
  "command": "afplay -v 0.5 ~/.claude/buhi.m4a"
  ```

## 🛠️ 設定の詳細

### settings.jsonのマージ方法

既存の`~/.claude/settings.json`がある場合の適切なマージ方法：

1. **既存ファイルの確認**：
```bash
cat ~/.claude/settings.json
```

2. **hooksセクションの追加**：
既存の設定に`hooks`セクションを追加します。例：

```json
{
  "existing_setting": "value",
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay ~/.claude/buhi.m4a"
          }
        ]
      }
    ]
  }
}
```

### 環境別のコマンド設定

- **macOS**: `afplay ~/.claude/buhi.m4a`
- **Windows**: `powershell -c "(New-Object Media.SoundPlayer '~/.claude/buhi.wav').PlaySync()"`
- **Linux**: `aplay ~/.claude/buhi.wav` または `paplay ~/.claude/buhi.wav`

### トラブルシューティング

1. **音声が鳴らない場合**：
   - ファイルパスの確認: `ls -la ~/.claude/buhi.m4a`
   - 音声テスト: `afplay ~/.claude/buhi.m4a`
   - Claude Code再起動

2. **設定が反映されない場合**：
   - JSONシンタックスの確認
   - settings.jsonの権限確認
   - Claude Codeの完全再起動

## ⚠️ 免責事項

これはジョークリポジトリです。職場や静かな環境での使用は十分にご注意ください！
