# 🐕 Buhi - Task Completion Sound Notifications for Claude Code

A Claude Code skill that plays a cute "Buhi" (pig sound) notification whenever tasks complete.

## 🎵 What is Buhi?

Buhi is a skill for Claude Code that adds audible notifications to your development workflow. Every time Claude Code finishes a task, you'll hear a delightful "Buhi" sound - perfect for knowing when long-running operations complete without constantly monitoring your terminal.

This skill leverages Claude Code's hooks system to automatically trigger sound playback on task completion.

## ⚡ Quick Start

### Step 1: Install the skill

Install the skill using `add-skill`:

```bash
npx add-skill guchey/buhi
```

### Step 2: Configure the Stop hook

Edit your `~/.claude/settings.json` to add the Stop hook. The hook will automatically play the "Buhi" sound when tasks complete.

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
            "command": "afplay ~/.claude/buhi.m4a"
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
            "command": "paplay ~/.claude/buhi.m4a"
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
            "command": "powershell -c \"(New-Object Media.SoundPlayer '~/.claude/buhi.m4a').PlaySync()\""
          }
        ]
      }
    ]
  }
}
```

**Note:** If you already have hooks configured, merge the Stop hook into your existing configuration.

### Step 3: Test the sound

Run the `/buhi` command to test:

```bash
/buhi
```

This will copy the sound file to `~/.claude/buhi.m4a` (if needed) and play the sound.

### Done!

Restart Claude Code and you'll hear "Buhi" every time a task completes!

## 🚀 How It Works

Buhi leverages Claude Code's **Stop hook** to trigger audio playback when tasks finish.

### The `/buhi` Command

The `/buhi` skill command plays the "Buhi" sound effect immediately. Use it to:
- Test that your sound configuration is working
- Manually trigger the sound effect
- Verify the sound file was copied correctly

When you run `/buhi`, it will:
1. Copy `buhi.m4a` to `~/.claude/` if it doesn't exist
2. Detect your OS (macOS, Linux, or Windows)
3. Play the sound using the appropriate command

### Task Completion Notifications

To hear the sound automatically when tasks complete, configure the Stop hook in your `~/.claude/settings.json` (see Step 2 above).

The hook uses OS-specific commands:
- **macOS**: `afplay` (pre-installed)
- **Linux**: `paplay` (requires PulseAudio)
- **Windows**: PowerShell SoundPlayer (pre-installed on Windows 10+)

## 🎨 Customization

### Adjust Volume

Edit `~/.claude/settings.json` to control volume (macOS example):

```json
"command": "afplay -v 0.5 ~/.claude/buhi.m4a"
```

Volume range: `0.0` (mute) to `1.0` (full volume)

### Use Your Own Sound

Replace the sound file with any audio you prefer:

```bash
cp your-sound.m4a ~/.claude/buhi.m4a
```

Supported formats vary by OS - `.m4a`, `.mp3`, `.wav` typically work on all platforms.

### Disable Temporarily

Remove or comment out the Stop hook in `~/.claude/settings.json`.

## 🗑️ Uninstallation

To completely remove Buhi:

1. Delete the Stop hook from `~/.claude/settings.json`
2. Remove the sound file:
   ```bash
   rm ~/.claude/buhi.m4a
   ```

## 💡 Use Cases

- **Long-running builds**: Get notified when compilation finishes
- **Test suites**: Hear when your tests complete
- **File operations**: Know when large file searches or transformations finish
- **Focus work**: Stay in the zone while waiting for tasks to complete

## 🛠️ Troubleshooting

### Sound doesn't play

1. **Verify the file exists**:
   ```bash
   ls -la ~/.claude/buhi.m4a
   ```

2. **Test audio playback** (macOS example):
   ```bash
   afplay ~/.claude/buhi.m4a
   ```

3. **Check settings.json syntax**:
   ```bash
   cat ~/.claude/settings.json | python -m json.tool
   ```

4. **Restart Claude Code** completely

### Wrong OS command

If you use multiple operating systems, manually edit `~/.claude/settings.json` to use the correct command for your current OS.

## 📦 Installation

The only supported installation method is via `add-skill`:

```bash
npx add-skill guchey/buhi
```

For manual installation or customization, clone this repository and run `/buhi` from Claude Code.

## 🤝 Contributing

This is a fun project, but contributions are welcome! Ideas:

- Support for additional sound effects
- Configuration UI
- Volume controls per-task
- Different sounds for success/failure

## ⚠️ Disclaimer

This is a playful enhancement for your development workflow. **Please be considerate**:
- May not be appropriate for quiet offices
- Sounds play after EVERY task completion (could be frequent)
- Test with headphones first!

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Note**: The name "Buhi" comes from the Japanese onomatopoeia for a pig's snort (ブヒ). This is a joke repository, but it's genuinely useful for task completion notifications! 🐕
