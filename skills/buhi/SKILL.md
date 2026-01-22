---
name: buhi
description: Audible task completion notifications for Claude Code. Use this skill when the user wants to (1) test the task completion sound by running /buhi, (2) hear the notification sound manually, or (3) get help with configuring automatic sound playback on task completion using Claude Code's Stop hook system.
user-invocable: true
---

# Buhi - Task Completion Notifications

Play audible notifications when Claude Code tasks complete.

## Overview

This skill provides two key capabilities:

1. **Manual sound playback** - The `/buhi` command plays a "Buhi" sound effect (cute pig sound) to test notifications or trigger manually
2. **Automatic notifications** - Integration with Claude Code's Stop hook system to play sounds when tasks finish

## The `/buhi` Command

When invoked, this command:

1. Detects the operating system (macOS, Linux, or Windows)
2. Plays the `buhi.m4a` sound file from the skill directory using the appropriate OS command

### Implementation

**macOS:**
```bash
afplay buhi.m4a
```

**Linux:**
```bash
paplay buhi.m4a
```

**Windows:**
```bash
powershell -c "(New-Object Media.SoundPlayer 'buhi.m4a').PlaySync()"
```

### Usage

Simply run `/buhi` to:
- Test that audio playback is working
- Hear the notification sound
- Verify the skill is installed correctly

## Automatic Task Completion Notifications

To enable automatic sound playback when tasks complete, configure Claude Code's Stop hook in `~/.claude/settings.json`.

### Configuration

Add the Stop hook to your settings file:

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

**Important Notes:**
- If you already have hooks configured, merge the Stop hook into your existing configuration
- Restart Claude Code after modifying settings.json
- The sound will play after EVERY task completion

## Customization

### Adjust Volume

Add volume parameters to the hook command:

**macOS example:**
```json
"command": "afplay -v 0.5 ~/.claude/skills/buhi/buhi.m4a"
```

Volume range: `0.0` (mute) to `1.0` (full volume)

### Use Custom Sound

Replace `buhi.m4a` with your own audio file:

```bash
cp your-sound.m4a ~/.claude/skills/buhi/buhi.m4a
```

Supported formats: `.m4a`, `.mp3`, `.wav` (varies by OS and audio player)

### Disable Notifications

Remove or comment out the Stop hook from `~/.claude/settings.json`:

```json
{
  "hooks": {
    // "Stop": [...]  // Commented out
  }
}
```

## Troubleshooting

### Sound doesn't play when running `/buhi`

1. **Verify skill installation:**
   ```bash
   ls -la ~/.claude/skills/buhi/buhi.m4a
   ```

2. **Check system audio player:**
   - macOS: `afplay` is pre-installed
   - Linux: Install PulseAudio (`sudo apt-get install pulseaudio-utils`)
   - Windows: PowerShell SoundPlayer requires Windows 10+

3. **Test playback manually:**
   ```bash
   # macOS
   afplay ~/.claude/skills/buhi/buhi.m4a

   # Linux
   paplay ~/.claude/skills/buhi/buhi.m4a

   # Windows PowerShell
   (New-Object Media.SoundPlayer '~/.claude/skills/buhi/buhi.m4a').PlaySync()
   ```

### Sound doesn't play on task completion

1. **Verify settings.json syntax:**
   ```bash
   cat ~/.claude/settings.json | python -m json.tool
   ```

   Or use any JSON validator to ensure the file is valid JSON.

2. **Check hook configuration:**
   - Ensure the Stop hook is properly configured
   - Verify the file path is correct
   - Confirm you've restarted Claude Code

3. **Review hook execution:**
   - Check Claude Code output for hook errors
   - Verify the matcher pattern (empty string matches all)

### Multiple OS support

If you use Claude Code on different operating systems, you may need to maintain separate settings.json files or manually update the command when switching platforms.

## Technical Details

### Audio Players

- **macOS**: Uses `afplay`, Apple's built-in audio file player
- **Linux**: Uses `paplay`, PulseAudio's command-line player (requires pulseaudio-utils package)
- **Windows**: Uses PowerShell's `Media.SoundPlayer` class (built into .NET Framework)

### Hook System

The Stop hook triggers when:
- Claude Code finishes executing a task
- Background operations complete
- Agent processes stop

The `matcher` field accepts regex patterns to filter which tasks trigger the hook. An empty string matches all tasks.

### File Format

The included `buhi.m4a` file is:
- Format: M4A (MPEG-4 Audio)
- Codec: AAC
- Compatible with all three supported platforms
- Small file size for quick playback

## Use Cases

- **Long-running builds**: Get notified when compilation finishes without watching the terminal
- **Test suites**: Hear when extensive test runs complete
- **Code generation**: Know when large file transformations finish
- **Background tasks**: Stay focused on other work while waiting for operations
- **Accessibility**: Audio feedback for vision-impaired developers

## Best Practices

1. **Test with headphones first** - The sound plays at system volume
2. **Be considerate in shared spaces** - May not be appropriate for quiet offices
3. **Adjust volume appropriately** - Start with lower volumes and increase as needed
4. **Customize for your workflow** - Use different sounds for different notification types
