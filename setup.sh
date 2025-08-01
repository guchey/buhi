#!/bin/bash

# Buhi Sound Effects Setup Script for Claude Code

echo "🐕 Buhi - Claude Code Sound Effects セットアップ"
echo "==============================================="

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  このスクリプトはmacOS用です。他のOSの場合は手動でセットアップしてください。"
    exit 1
fi

# Create .claude directory if it doesn't exist
echo "📁 ~/.claude ディレクトリを作成中..."
mkdir -p ~/.claude

# Copy sound file
if [ -f "buhi.m4a" ]; then
    echo "🎵 音声ファイルをコピー中..."
    cp buhi.m4a ~/.claude/
    echo "✅ buhi.m4a を ~/.claude/ にコピーしました"
else
    echo "❌ buhi.m4a ファイルが見つかりません"
    exit 1
fi

# Test sound playback
echo "🔊 音声テスト中..."
afplay ~/.claude/buhi.m4a

echo ""
echo "✅ セットアップ完了！"
echo ""
echo "次のステップ："
echo "1. Claude Codeの設定ファイルに以下のhooks設定を追加してください："
echo ""
echo '{'
echo '  "hooks": {'
echo '    "Stop": ['
echo '      {'
echo '        "matcher": "",'
echo '        "hooks": ['
echo '          {'
echo '            "type": "command",'
echo '            "command": "afplay ~/.claude/buhi.m4a"'
echo '          }'
echo '        ]'
echo '      }'
echo '    ]'
echo '  }'
echo '}'
echo ""
echo "2. Claude Codeを再起動してください"
echo "3. タスク完了時に「ブヒ」音が鳴ることを確認してください"
echo ""
echo "🎉 楽しいコーディングライフを！"