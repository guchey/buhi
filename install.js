#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = os.homedir();
const claudeDir = path.join(homeDir, '.claude');
const settingsPath = path.join(claudeDir, 'settings.json');
const soundDestPath = path.join(claudeDir, 'buhi.m4a');
const soundSourcePath = path.join(__dirname, 'buhi.m4a');

// Detect OS and set appropriate command
function getPlayCommand() {
  const platform = os.platform();
  const soundPath = soundDestPath;

  switch (platform) {
    case 'darwin':
      return `afplay ${soundPath}`;
    case 'linux':
      // Try paplay first (PulseAudio), fall back to aplay (ALSA)
      return `command -v paplay >/dev/null 2>&1 && paplay ${soundPath} || aplay ${soundPath}`;
    case 'win32':
      return `powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`;
    default:
      return `afplay ${soundPath}`; // Default to macOS
  }
}

// Create .claude directory if it doesn't exist
if (!fs.existsSync(claudeDir)) {
  console.log('Creating ~/.claude directory...');
  fs.mkdirSync(claudeDir, { recursive: true });
}

// Copy sound file
console.log('Copying buhi.m4a to ~/.claude/...');
fs.copyFileSync(soundSourcePath, soundDestPath);
console.log('✓ Sound file copied successfully');

// Read or create settings.json
let settings = {};
if (fs.existsSync(settingsPath)) {
  console.log('Reading existing settings.json...');
  try {
    const content = fs.readFileSync(settingsPath, 'utf8');
    settings = JSON.parse(content);
  } catch (error) {
    console.error('Warning: Could not parse existing settings.json. Creating new one.');
    settings = {};
  }
} else {
  console.log('Creating new settings.json...');
}

// Add Stop hook
if (!settings.hooks) {
  settings.hooks = {};
}

const stopHook = {
  matcher: "",
  hooks: [
    {
      type: "command",
      command: getPlayCommand()
    }
  ]
};

if (!settings.hooks.Stop) {
  settings.hooks.Stop = [stopHook];
  console.log('✓ Added Stop hook to settings.json');
} else {
  // Check if buhi hook already exists
  const hasExistingHook = settings.hooks.Stop.some(hook =>
    hook.hooks && hook.hooks.some(h =>
      h.command && h.command.includes('buhi.m4a')
    )
  );

  if (!hasExistingHook) {
    settings.hooks.Stop.push(stopHook);
    console.log('✓ Added Stop hook to existing hooks');
  } else {
    console.log('✓ Buhi hook already exists, skipping');
  }
}

// Write settings.json
fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
console.log('✓ Settings saved successfully');

console.log('\n🐕 Buhi installation complete!');
console.log('\nPlease restart Claude Code for the changes to take effect.');
console.log('\nYour tasks will now be accompanied by a cute "Buhi" sound! 🎵\n');
