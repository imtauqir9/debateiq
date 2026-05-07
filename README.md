# DebateIQ — AI Debate Strategist

A multi-layer AI reasoning app for Cricket & Food debates, built with Claude + ElevenLabs voice.

## Features
- 4 debate topics (Cricket & Food)
- 5-layer reasoning engine (Context → Argue → Counter → Critique → Final Verdict)
- 10 knowledge sources (ESPNCricinfo, WHO, BBC, Reuters etc.)
- ElevenLabs voice with browser fallback
- Live telemetry (tokens, latency, efficiency)
- Export to Markdown, Plain text, JSON

## Deploy
Hosted on Netlify. Auto-deploys on every push to `main`.

## Tech
Single HTML file — no build step, no dependencies, no framework.
Powered by Anthropic Claude API + ElevenLabs TTS API.
