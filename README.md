# 🐕 Buhi - Claude Code Sound Effects

Claude Codeのタスク完了時に「ブヒ」音を鳴らすジョークリポジトリです。

## 🎵 概要

このリポジトリは、Claude Codeのhooks機能を使用してタスク完了時に音声ファイルを再生する設定を提供します。
タスクが完了するたびに「ブヒ」という可愛い音が鳴ります。

## 📋 セットアップ

### 1. 音声ファイルの配置

`buhi.m4a`ファイルを適切な場所にコピーします：

```bash
# Claude Code設定ディレクトリに音声ファイルをコピー
mkdir -p ~/.claude
cp buhi.m4a ~/.claude/
```

### 2. Claude Code設定の追加

Claude Codeの設定ファイルに以下のhooks設定を追加します：

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

## ⚠️ 免責事項

これはジョークリポジトリです。職場や静かな環境での使用は十分にご注意ください！
