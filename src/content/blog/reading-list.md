---
title: "Reading list: getting started with matchmaking research"
description: "A short path through the papers in this collection, in the order that made sense to me."
date: 2026-09-05
authors:
  - yanushvy
tags:
  - reading-list
  - matchmaking
  - rating-systems
---

If you are new to the topic, this is the order I would read the papers in the [papers](/papers) section.

1. **Elo, *The Rating of Chessplayers, Past and Present*.** Not a game paper at all, but every later system is described in relation to it. Skim the first chapters for the model and skip the historical tables.
2. **Glickman, *The Glicko System*.** The first widely used rating system that tracks uncertainty explicitly. Short, readable, and it makes TrueSkill much easier to understand.
3. **Herbrich, Minka and Graepel, *TrueSkill*.** The system behind Xbox Live matchmaking. Read it for the factor graph formulation and the match quality criterion.
4. **Minka, Cleven and Zaykov, *TrueSkill 2*.** What changed after a decade of shipping it in Halo and Gears of War: per-player statistics, squads and quitting.
5. **Chen et al., *EOMM*.** A different objective altogether. Once you have seen the rating systems, this paper is the argument for why the rating alone is not what a matchmaker should optimise.

Each entry in the papers section has its own notes. Filter by the [`rating-systems`](/tags/rating-systems) tag to see the first four together.
