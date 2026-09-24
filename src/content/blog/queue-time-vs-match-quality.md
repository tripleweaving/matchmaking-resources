---
title: "Queue time and match quality pull in opposite directions"
description: "Every matchmaker eventually has to decide how long a player should wait for a better opponent. A small model of that trade-off."
date: 2026-09-12
authors:
  - yanushvy
tags:
  - matchmaking
  - queue-design
---

A matchmaker has two knobs it can turn for a waiting player: accept a worse match now, or keep waiting for a better one. Neither choice is free.

## The expanding window

The most common design is an expanding search window. A player with rating $\mu$ is initially only matched against opponents within $\pm w_0$, and the window grows with the time $t$ spent in queue:

$$
w(t) = w_0 + k\,t
$$

Small $w_0$ and $k$ give tight matches but long waits when the population is thin. Large values fill lobbies quickly and produce lopsided games at off-peak hours.

## What population size does

If players arrive as a Poisson process with rate $\lambda$ and their ratings are spread with density $f(\mu)$, the expected number of acceptable opponents that appear during a wait of length $t$ is roughly

$$
N(t) \approx \lambda\, t \int_{\mu - w(t)}^{\mu + w(t)} f(x)\,dx
$$

For a player in the middle of the distribution $f$ is large and $N(t)$ hits one almost immediately. For a player in the tails the integral is tiny, and $w(t)$ has to grow a long way before anybody qualifies. This is why the highest and lowest rated players in any game report the longest queues and the worst matches at the same time.

## Regions, modes and parties

Every additional constraint (region, game mode, party size, input device) partitions the population and shrinks $\lambda$ for each partition. A feature that splits the queue in two roughly doubles the expected wait for everyone unless the constraint is relaxed with time as well.

:::note
The practical takeaway is that queue time is a symptom of population density, not a parameter. Any change to matchmaking rules should be evaluated per rating band and per region, not on the global average.
:::

## Optimising for something else

Engagement-optimised matchmaking goes one step further and asks not "who is the fairest opponent" but "which opponent keeps this player playing". The [EOMM paper](/papers/eomm) in the papers section formalises that and shows that fairness and retention are not the same objective.
