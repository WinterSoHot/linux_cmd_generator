# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linux 命令生成器 - A React + Electron desktop application that generates copyable Linux commands through an interactive GUI.

## Architecture

- **Frontend**: React 19 with Vite for building
- **Desktop**: Electron with separate main process
- **Single state**: All state managed in App.jsx with useState hooks
- **Command config**: `src/commands.js` contains all command definitions and generation logic

## Commands

### Development
```bash
npm install              # Install dependencies
npm run dev             # Start Vite dev server (web mode)
npm run electron:dev    # Run Electron app with hot reload
```

### Build
```bash
npm run build           # Build web assets
npm run electron:build  # Build Electron app for current platform
npm run electron:build:mac    # macOS (.dmg, .zip)
npm run electron:build:win    # Windows (.exe)
npm run electron:build:linux  # Linux (.AppImage, .deb, .rpm)
```

## Code Structure

### Key Files
- `src/App.jsx` - Main React component with state management and command generation logic
- `src/commands.js` - Command configuration object defining all categories, params, and options
- `electron/main.js` - Electron main process, creates BrowserWindow
- `vite.config.js` - Vite configuration with base path for Electron

### Command Generation
The `generateCommand()` function in `App.jsx` builds command strings:
1. Starts with selected action (e.g., `ls`, `cp`)
2. Adds flags from checkbox selections
3. Adds parameters based on category-specific logic (switch statement)
4. Filters empty values and joins with spaces

### Conditional Params
Params in `commands.js` use `condition` property:
- String: Show when action equals value
- Array: Show when action is in array
- Function: Dynamic options based on form values

## Patterns

- Form values stored in single `formValues` state object
- Checkbox flags stored as arrays
- Search results filter command index and auto-select category + command
- Clipboard copy with fallback for older browsers
