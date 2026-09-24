---
title: "TrueSkill 2: An improved Bayesian skill rating system"
authors:
  - Tom Minka
  - Ryan Cleven
  - Yordan Zaykov
year: 2018
venue: "Microsoft Research technical report"
kind: report
url: "https://www.microsoft.com/en-us/research/publication/trueskill-2-improved-bayesian-skill-rating-system/"
section: matchmaking
tags:
  - trueskill
  - rating-systems
  - team-games
summary: "Extends TrueSkill with per-player statistics such as kills and deaths, squad effects, experience-based skill growth and handling of players who quit early. Used in Halo 5 and Gears of War 4."
date: 2026-09-01
---

## What changed since 2006

The original model only observes the final ranking of teams. TrueSkill 2 adds observations that are available in most shooters anyway:

- Individual statistics (kills, deaths) as additional noisy measurements of performance.
- A squad bonus for players who queue together.
- Skill drift as a function of games played, so returning players are not treated as new.
- Explicit handling of quitters, whose team result should not be trusted as a skill signal.

## Practical notes

The report reads as a description of a production system rather than a research paper. It is the best public account of what a large studio actually tunes.
