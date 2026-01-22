---
name: buhi
description: Provide voice-based task completion notifications to assist Human-in-the-Loop workflows.
user-invocable: true
---

# Buhi - Sound Effect

Play a cute "Buhi" (pig sound) effect.

## Instructions

When the user runs `/buhi`, detect the OS and play the sound using the appropriate command:

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

That's it! Just detect the OS and play the sound from the skill directory.
