---
title: "The Glicko system"
authors:
  - Mark E. Glickman
year: 1995
venue: "Boston University, technical note"
kind: report
url: "http://www.glicko.net/glicko/glicko.pdf"
section: related
tags:
  - glicko
  - rating-systems
summary: "Adds a rating deviation to Elo so that the update step depends on how much is known about each player. The direct ancestor of TrueSkill's uncertainty model, in a few pages of algebra."
date: 2026-09-01
---

## Why it matters

Glicko is the bridge between Elo and the Bayesian systems. It keeps Elo's logistic model of expected score but tracks a rating deviation $RD$ per player. A player who has not played for a while gets a growing $RD$, which makes their next results count more.

## Notes

- Glicko-2 (not in this collection yet) adds a volatility term for players whose results swing.
- The rating period concept, where all games in a window are processed together, is what most online implementations quietly drop.
