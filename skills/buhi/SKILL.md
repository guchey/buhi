---
name: buhi
description: Play a cute "Buhi" sound effect when tasks complete
user-invocable: true
---

# Buhi - Task Completion Sound Notifications

Setup task completion sound notifications for Claude Code. When you invoke `/buhi`, this skill will automatically configure your system to play a "Buhi" sound whenever Claude Code finishes a task.

## Instructions

When the user runs `/buhi`, execute the following setup automatically:

### 1. Check for sound file

```bash
ls -la ~/.claude/buhi.m4a
```

If the file doesn't exist, locate and copy it:

```bash
# Try skill directory first
if [ -f ~/.claude/skills/buhi/buhi.m4a ]; then
  cp ~/.claude/skills/buhi/buhi.m4a ~/.claude/buhi.m4a
elif [ -f ~/.claude/skills/.curated/buhi/buhi.m4a ]; then
  cp ~/.claude/skills/.curated/buhi/buhi.m4a ~/.claude/buhi.m4a
else
  echo "Warning: Sound file not found in standard skill locations"
fi
```

### 2. Detect OS and set audio command

```bash
# Detect operating system
case "$(uname -s)" in
  Darwin*)  AUDIO_CMD='afplay ~/.claude/buhi.m4a' ;;
  Linux*)   AUDIO_CMD='paplay ~/.claude/buhi.m4a' ;;
  MINGW*|MSYS*|CYGWIN*) AUDIO_CMD='powershell -c "(New-Object Media.SoundPlayer \"~/.claude/buhi.m4a\").PlaySync()"' ;;
  *)        AUDIO_CMD='afplay ~/.claude/buhi.m4a' ;;
esac
echo "Using audio command: $AUDIO_CMD"
```

### 3. Update settings.json

Create or update `~/.claude/settings.json` with the Stop hook. Use the Read tool to check existing settings, then use Edit or Write to add:

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

**Important**:
- If `settings.json` exists, merge the new hook with existing configuration
- If a Stop hook already exists, add to the array (don't replace)
- Use the OS-appropriate command from step 2

### 4. Test the setup

```bash
# Verify file was copied
ls -l ~/.claude/buhi.m4a

# Test audio playback (macOS example)
afplay ~/.claude/buhi.m4a
```

### 5. Inform the user

Tell them:
- ✅ Setup complete! Buhi sound notifications are now configured.
- 🔄 Restart Claude Code for changes to take effect.
- 🎵 The "Buhi" sound will play when tasks complete.
- ⚙️ Customize volume in `~/.claude/settings.json` (e.g., `afplay -v 0.5 ...`)

## Customization

Users can adjust volume by editing the command in settings.json:
```json
"command": "afplay -v 0.5 ~/.claude/buhi.m4a"
```

Volume range: 0.0 (mute) to 1.0 (full volume)

## Uninstallation

Remove the Stop hook from `~/.claude/settings.json` and optionally delete `~/.claude/buhi.m4a`.
