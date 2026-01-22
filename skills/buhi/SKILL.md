---
name: buhi
description: Adds a "Buhi" sound effect when Claude Code tasks complete
user-invocable: false
disable-model-invocation: true
---

# Buhi - Claude Code Sound Effects

This skill adds a cute "Buhi" (pig sound) effect that plays when Claude Code completes tasks.

## Installation

This skill automatically:

1. Copies the `buhi.m4a` sound file to `~/.claude/`
2. Updates `~/.claude/settings.json` to add a Stop hook that plays the sound
3. Preserves any existing settings in your settings.json

## How It Works

The skill adds a hook configuration that triggers whenever Claude Code stops (task completion):

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

## Compatibility

- **macOS**: Uses `afplay` command (pre-installed)
- **Linux**: Requires `aplay` or `paplay` (install via package manager)
- **Windows**: Requires PowerShell (pre-installed on Windows 10+)

## Customization

### Adjust Volume

Edit your `~/.claude/settings.json` to adjust the volume (0.0 to 1.0):

```json
"command": "afplay -v 0.5 ~/.claude/buhi.m4a"
```

### Use Your Own Sound

Replace `~/.claude/buhi.m4a` with your own audio file.

## Uninstallation

To remove the sound effect:

1. Remove the `Stop` hook from `~/.claude/settings.json`
2. Delete `~/.claude/buhi.m4a`

## Note

This is a joke repository. Use responsibly in quiet environments! 🐕
