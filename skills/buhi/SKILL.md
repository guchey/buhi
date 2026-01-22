---
name: buhi
description: Play a cute "Buhi" sound effect
user-invocable: true
---

# Buhi - Sound Effect

Play a cute "Buhi" (pig sound) effect. Use this to test the sound notification or trigger it manually.

## Instructions

When the user runs `/buhi`, play the sound file using the appropriate command for their OS:

1. First, ensure the sound file exists. If `~/.claude/buhi.m4a` doesn't exist, copy it from the skill directory:

```bash
if [ ! -f ~/.claude/buhi.m4a ]; then
  if [ -f ~/.claude/skills/buhi/buhi.m4a ]; then
    cp ~/.claude/skills/buhi/buhi.m4a ~/.claude/buhi.m4a
  elif [ -f ~/.claude/skills/.curated/buhi/buhi.m4a ]; then
    cp ~/.claude/skills/.curated/buhi/buhi.m4a ~/.claude/buhi.m4a
  fi
fi
```

2. Detect the OS and play the sound using the appropriate command:

**macOS:**
```bash
afplay ~/.claude/buhi.m4a
```

**Linux:**
```bash
paplay ~/.claude/buhi.m4a
```

**Windows:**
```bash
powershell -c "(New-Object Media.SoundPlayer '~/.claude/buhi.m4a').PlaySync()"
```

That's it! Just detect the OS, ensure the file exists, and play the sound.
