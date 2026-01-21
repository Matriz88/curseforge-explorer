# curseforge-explorer

[🌐 Live demo](https://matriz88.github.io) | [📖 CurseForge REST API docs](https://docs.curseforge.com/rest-api/#getting-started)

> This repository is a playground for testing AI agents in real-world software development workflows.
> The app itself is just a vehicle: a small UI to explore the CurseForge API. A significant portion of the code is AI-generated.

## Purpose

The goal is not to build "yet another CurseForge client". The goal is to test a workflow where an AI agent:
- starts from a set of project guidance files (rules, structure, conventions)
- works on iterative tasks (features, refactors, bug fixes)
- stays consistent with architecture and style over time

In short: this repo is meant to evaluate how well an agent follows instructions, respects constraints, and produces maintainable changes.

## What's in this repo

### 1) A small but complete app
A simple "explorer" that can:
- search games, mods, and files
- view game, mod, and file details

### 2) Agent guidance files
These files are part of the experiment, not "extras":
- `.cursorrules`: operating rules and conventions for the agent (style, patterns, what to avoid)
- `PROJECT_STRUCTURE.md`: map and rationale of the project structure
- `.cursor/`: editor/agent configuration and context

The intent is to reduce ambiguity and make the agent behave like it just joined a standardized repo.

## How to use this for agent testing

Examples of useful benchmark tasks:
- add a small feature that touches UI + routing + an API call
- introduce caching, pagination, and search debounce
- refactor a module while keeping behavior and typing intact
- add tests (unit or e2e) and keep CI consistent
- improve accessibility and error handling

Things worth observing:
- does it actually follow `.cursorrules` or drift over time
- does it keep the structure described in `PROJECT_STRUCTURE.md`
- does it produce coherent code or isolated patches
- does it introduce regressions or break internal APIs

## Local setup

Prerequisites:
- Node.js (LTS recommended)

Install:
```bash
cd app
npm install
