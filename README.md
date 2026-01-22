# Buhi

A Claude Code skill that provides audible task completion notifications.

## Overview

Buhi adds sound notifications to your Claude Code workflow. When tasks complete, you'll hear a distinctive "Buhi" sound - perfect for knowing when long-running operations finish without constantly monitoring your terminal.

## Quick Start

Install the skill:

```bash
npx add-skill guchey/buhi
```

Configure the Stop hook in `~/.claude/settings.json`:

**macOS:**
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay ~/.claude/skills/buhi/buhi.m4a"
          }
        ]
      }
    ]
  }
}
```

**Linux:**
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "paplay ~/.claude/skills/buhi/buhi.m4a"
          }
        ]
      }
    ]
  }
}
```

**Windows:**
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -c \"(New-Object Media.SoundPlayer '~/.claude/skills/buhi/buhi.m4a').PlaySync()\""
          }
        ]
      }
    ]
  }
}
```

Test the sound:

```bash
/buhi
```

## What's Included

- `/buhi` - Command to play the task completion sound
- `buhi.m4a` - Audio file (cute pig sound effect)
- Hook configuration for automatic playback on task completion

## Use Cases

- Long-running builds and compilations
- Test suite execution
- Large file operations
- Background task completion notifications

## Documentation

For detailed usage, customization options, and troubleshooting, see [SKILL.md](skills/buhi/SKILL.md).

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Note**: The name "Buhi" comes from the Japanese onomatopoeia for a pig's snort (ブヒ).
