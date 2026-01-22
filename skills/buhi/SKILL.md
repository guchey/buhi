---
name: buhi
description: Audible task completion notifications for Claude Code. Use this skill when the user wants to (1) test the task completion sound by running /buhi, (2) hear the notification sound manually, or (3) get help with configuring automatic sound playback on task completion using Claude Code's Stop hook system. The skill automatically detects whether it's installed globally or locally and configures the appropriate settings.json file with absolute paths.
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

1. Detects whether the skill is installed globally (`~/.claude/skills/buhi/`) or locally (`.claude/skills/buhi/`)
2. Automatically configures the Stop hook in the appropriate `settings.json` with the correct absolute path
3. Detects the operating system (macOS, Linux, or Windows)
4. Plays the `buhi.m4a` sound file from the skill directory using the appropriate OS command

This means you only need to run `/buhi` once to set up automatic task completion notifications.

### Installation Locations

The skill automatically adapts to where it's installed:

- **Global installation** (`~/.claude/skills/buhi/`): Configures `~/.claude/settings.json` - notifications work for all projects
- **Local installation** (`.claude/skills/buhi/`): Configures `.claude/settings.json` in your project - notifications work only for this project

### Path Detection Logic

When `/buhi` is invoked, it:

1. **Detects installation location** by examining the skill's base directory path:
   - If the base directory is `~/.claude/skills/buhi/` → Global installation
   - If the base directory is `<project>/.claude/skills/buhi/` → Local installation

2. **Determines settings.json path**:
   - Global: `~/.claude/settings.json`
   - Local: `<project>/.claude/settings.json` (two directories up from skill base)

3. **Constructs absolute audio file path**:
   - Uses the skill's base directory path + `/buhi.m4a`
   - This ensures the hook works regardless of the current working directory

4. **Selects audio player based on OS**:
   - macOS: `afplay`
   - Linux: `paplay`
   - Windows: PowerShell `Media.SoundPlayer`

### Implementation

**macOS:**
```bash
afplay <absolute-path-to>/buhi.m4a
```

**Linux:**
```bash
paplay <absolute-path-to>/buhi.m4a
```

**Windows:**
```bash
powershell -c "(New-Object Media.SoundPlayer '<absolute-path-to>/buhi.m4a').PlaySync()"
```

### Usage

Simply run `/buhi` to:
- Test that audio playback is working
- Hear the notification sound
- Verify the skill is installed correctly

## Automatic Task Completion Notifications

The `/buhi` command automatically configures the Stop hook in the appropriate `settings.json` file. This hook triggers the notification sound whenever a Claude Code task completes.

### Automatic Configuration

Running `/buhi` will:
1. Detect the skill installation location (global or local)
2. Determine the correct `settings.json` path
3. Use the absolute path to the audio file for reliability
4. Create or update the Stop hook configuration with your OS-appropriate audio player

This ensures the notification works regardless of your current working directory.

### Manual Configuration (Optional)

If you need to manually configure or customize the hook, here's what `/buhi` sets up. Note that it uses absolute paths to ensure reliability:

**macOS (Global installation):**
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

**macOS (Local installation):**
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /absolute/path/to/project/.claude/skills/buhi/buhi.m4a"
          }
        ]
      }
    ]
  }
}
```

**Linux (Global installation):**
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

**Windows (Global installation):**
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

The `/buhi` command automatically determines your installation type and OS, then configures the appropriate absolute path.

**Important Notes:**
- **Global installation**: Configures `~/.claude/settings.json` - notifications work for all projects
- **Local installation**: Configures `.claude/settings.json` in your project - notifications work only for this project
- If you already have hooks configured, `/buhi` will preserve your existing hooks
- The sound will play after EVERY task completion (globally or per-project depending on installation)
- Uses absolute paths to ensure the hook works regardless of your current working directory
- No need to restart Claude Code - hooks are loaded automatically

## Customization

### Adjust Volume

Edit your `settings.json` file and add volume parameters to the hook command:

**macOS example:**
```json
"command": "afplay -v 0.5 /absolute/path/to/buhi.m4a"
```

Volume range: `0.0` (mute) to `1.0` (full volume)

### Use Custom Sound

Replace `buhi.m4a` with your own audio file:

```bash
# For local installation
cp your-sound.m4a .claude/skills/buhi/buhi.m4a

# For global installation
cp your-sound.m4a ~/.claude/skills/buhi/buhi.m4a
```

Or update your `settings.json` to reference a different sound file:

```json
"command": "afplay /path/to/your/custom-sound.m4a"
```

Supported formats: `.m4a`, `.mp3`, `.wav` (varies by OS and audio player)

### Disable Notifications

Remove or comment out the Stop hook from your `settings.json`:

**For local installation** (`.claude/settings.json`):
```json
{
  "hooks": {
    // "Stop": [...]  // Commented out
  }
}
```

**For global installation** (`~/.claude/settings.json`):
```json
{
  "hooks": {
    // "Stop": [...]  // Commented out
  }
}
```

Or delete the Stop hook entry entirely if you have no other hooks configured.

## Troubleshooting

### Sound doesn't play when running `/buhi`

1. **Verify skill installation:**
   ```bash
   # For local installation
   ls -la .claude/skills/buhi/buhi.m4a

   # For global installation
   ls -la ~/.claude/skills/buhi/buhi.m4a
   ```

2. **Check system audio player:**
   - macOS: `afplay` is pre-installed
   - Linux: Install PulseAudio (`sudo apt-get install pulseaudio-utils`)
   - Windows: PowerShell SoundPlayer requires Windows 10+

3. **Test playback manually:**
   ```bash
   # macOS (use the appropriate path for your installation)
   afplay ~/.claude/skills/buhi/buhi.m4a

   # Linux
   paplay ~/.claude/skills/buhi/buhi.m4a

   # Windows PowerShell
   (New-Object Media.SoundPlayer '~/.claude/skills/buhi/buhi.m4a').PlaySync()
   ```

### Sound doesn't play on task completion

1. **Verify settings.json was created:**
   ```bash
   # For local installation
   cat .claude/settings.json

   # For global installation
   cat ~/.claude/settings.json
   ```

   If the file doesn't exist, run `/buhi` again to create it.

2. **Verify settings.json syntax:**
   ```bash
   # For local installation
   cat .claude/settings.json | python -m json.tool

   # For global installation
   cat ~/.claude/settings.json | python -m json.tool
   ```

   Or use any JSON validator to ensure the file is valid JSON.

3. **Check hook configuration:**
   - Ensure the Stop hook is properly configured
   - Verify the file path is an absolute path pointing to the audio file
   - Check that the audio file exists at the specified path
   - Confirm the path matches your installation type (global vs local)

4. **Review hook execution:**
   - Check Claude Code output for hook errors
   - Verify the matcher pattern (empty string matches all)
   - Try running the command manually with the exact path from settings.json to test it works

### Multiple OS support

The `/buhi` command automatically detects your operating system and configures the appropriate audio player command. If you switch between different operating systems on the same project, simply run `/buhi` again to update the configuration for your current OS.

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
