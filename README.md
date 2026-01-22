# Buhi

A Claude Code skill that provides audible task completion notifications.

## Overview

Buhi adds sound notifications to your Claude Code workflow. When tasks complete, you'll hear a distinctive "Buhi" sound - perfect for knowing when long-running operations finish without constantly monitoring your terminal.

The skill automatically detects whether it's installed globally or locally, and configures the appropriate `settings.json` file with absolute paths for reliable operation. No manual configuration required - just run `/buhi` once and you're done.

## Quick Start

### Installation

You can install Buhi globally or locally in your project:

**Global installation** (notifications for all projects):
```bash
npx add-skill guchey/buhi
```

**Local installation** (notifications only for this project):
```bash
npx add-skill guchey/buhi --local
```

### Setup

Run the command to test the sound and configure automatic notifications:

```bash
/buhi
```

That's it! The `/buhi` command will:
1. Detect whether it's installed globally or locally
2. Play the notification sound
3. Automatically configure the appropriate `settings.json` file with the correct absolute paths
4. Enable task completion notifications

Now every time a Claude Code task completes, you'll hear the sound (globally or per-project, depending on your installation).

## What's Included

- `/buhi` - Command to play the sound and configure automatic notifications
- `buhi.m4a` - Audio file (cute pig sound effect)
- Automatic Stop hook configuration with intelligent path detection:
  - Global: `~/.claude/settings.json` (affects all projects)
  - Local: `.claude/settings.json` (project-specific)
- Absolute path resolution (works regardless of current directory)

## Features

- **Zero configuration**: Just run `/buhi` and it's ready to use
- **Smart path detection**: Automatically detects global vs local installation
- **Cross-platform**: Works on macOS, Linux, and Windows
- **Absolute paths**: Uses absolute paths for reliable operation from any directory
- **Flexible installation**: Choose global (all projects) or local (per-project) notifications
- **Customizable**: Adjust volume, change sounds, or disable as needed

## Use Cases

- Long-running builds and compilations
- Test suite execution
- Large file operations
- Background task completion notifications
- Staying focused while waiting for operations to complete

## Documentation

For detailed usage, customization options, and troubleshooting, see [SKILL.md](skills/buhi/SKILL.md).

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Note**: The name "Buhi" comes from the Japanese onomatopoeia for a pig's snort (ブヒ).
