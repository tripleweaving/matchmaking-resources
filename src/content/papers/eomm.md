---
title: "EOMM: An Engagement Optimized Matchmaking Framework"
authors:
  - Zhengxing Chen
  - Su Xue
  - John Kolen
  - Navid Aghdaie
  - Kazi A. Zaman
  - Yizhou Sun
  - Magy Seif El-Nasr
year: 2017
venue: "WWW 2017"
kind: paper
url: "https://arxiv.org/abs/1702.06820"
doi: "10.1145/3038912.3052559"
section: matchmaking
tags:
  - matchmaking
  - engagement
  - optimization
summary: "Frames matchmaking as an optimisation problem whose objective is player retention rather than match fairness, and shows on real game data that the two objectives produce different pairings."
date: 2026-09-02
---

## Why it matters

Most of this collection is about estimating skill. EOMM asks a different question: given skill estimates, which pairing should the matchmaker actually choose? The paper's answer is the pairing that maximises the probability that both players keep playing, predicted from their recent history of wins and losses.

## Points worth noting

- The framework is agnostic to the rating system underneath.
- The evaluation uses a churn model trained on real match logs from an EA title.
- The paper is also the standard citation in the debate about whether engagement-optimised matchmaking is good for players.
