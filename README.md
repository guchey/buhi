# 🐕 Buhi - Task Completion Sound Notifications for Claude Code

A Claude Code skill that plays a cute "Buhi" (pig sound) notification whenever tasks complete.

## 🎵 What is Buhi?

Buhi is a skill for Claude Code that adds audible notifications to your development workflow. Every time Claude Code finishes a task, you'll hear a delightful "Buhi" sound - perfect for knowing when long-running operations complete without constantly monitoring your terminal.

This skill leverages Claude Code's hooks system to automatically trigger sound playback on task completion.

## ⚡ Quick Start

### Installation

Install the skill using `add-skill`:

```bash
npx add-skill guchey/buhi
```

### Setup

After installation, run the skill once to configure:

```bash
/buhi
```

This will:
- Copy the sound file to `~/.claude/buhi.m4a` (if not already present)
- Configure your `~/.claude/settings.json` with the appropriate Stop hook
- Preserve all existing settings
- Auto-detect your OS and use the correct audio player

### Done!

Restart Claude Code and you'll hear "Buhi" every time a task completes.

## 🚀 How It Works

Buhi configures Claude Code's **Stop hook** to trigger audio playback when tasks finish. The skill:

1. **Auto-detects your OS** and selects the appropriate audio command:
   - **macOS**: `afplay` (pre-installed)
   - **Linux**: `paplay` or `aplay` (requires PulseAudio or ALSA)
   - **Windows**: PowerShell SoundPlayer (pre-installed on Windows 10+)

2. **Manages the sound file**: Copies `buhi.m4a` to `~/.claude/` on first run

3. **Updates settings safely**: Merges with existing `~/.claude/settings.json` configuration

The resulting hook configuration looks like this:

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
