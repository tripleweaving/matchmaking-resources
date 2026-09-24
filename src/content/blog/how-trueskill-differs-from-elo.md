---
title: "How TrueSkill differs from Elo"
description: "Uncertainty is the whole point. Why one number per player is not enough once matches involve teams."
date: 2026-09-20
authors:
  - yanushvy
tags:
  - rating-systems
  - elo
  - trueskill
---

Elo and TrueSkill both try to answer the same question: given what we have seen so far, how strong is this player? They differ in what they are willing to admit they do not know.

## Elo: one number, one update rule

Elo assigns a single rating $R$ to each player.[^elo-origin] The expected score of player $A$ against player $B$ is a logistic function of the rating gap:

$$
E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}
$$

After a game with actual score $S_A \in \{0, \tfrac{1}{2}, 1\}$ the rating moves by a fixed step size $K$:

$$
R_A' = R_A + K\,(S_A - E_A)
$$

The rule is simple to implement and easy to explain to players. Its weakness is that $K$ has to do two jobs at once: it must be large for new players whose rating is mostly noise, and small for veterans whose rating is well established. Most implementations bolt on a schedule for $K$ to compensate.

## TrueSkill: a belief, not a number

TrueSkill models each player's skill as a Gaussian belief $\mathcal{N}(\mu, \sigma^2)$. The mean $\mu$ plays the role of the Elo rating; the standard deviation $\sigma$ records how unsure the system still is. New players start with a large $\sigma$, so a single result moves them a lot. As evidence accumulates, $\sigma$ shrinks and updates become smaller on their own. There is no $K$ to tune.

The displayed rating is usually the conservative estimate[^conservative]

$$
\text{rank} = \mu - 3\sigma
$$

which rewards players for reducing uncertainty as well as for winning.

## Teams and draws come for free

Because TrueSkill is a factor graph, a team's performance is just the sum of its members' performances, and a match outcome is a set of ordering constraints between team performances. That is why it handles free-for-all matches, teams of unequal size and draws without special cases. Extending Elo to those settings requires ad-hoc averaging.

## Match quality

TrueSkill also gives the matchmaker a number to optimise. For two players the probability of a draw, used as a proxy for match quality, is

$$
q = \sqrt{\frac{2\beta^2}{2\beta^2 + \sigma_A^2 + \sigma_B^2}}
\;\exp\!\left(-\frac{(\mu_A - \mu_B)^2}{2\,(2\beta^2 + \sigma_A^2 + \sigma_B^2)}\right)
$$

where $\beta$ is the per-game performance variance.[^beta] A matchmaker can search for the opponent that maximises $q$ instead of the one whose rating is numerically closest.

## Further reading

The original TrueSkill paper and its successor are in the [papers](/papers?tag=trueskill) section, together with notes on the parts that matter in practice.

[^elo-origin]: Arpad Elo designed the system for chess in the 1960s; it was adopted by FIDE in 1970 and only later borrowed by video games.
[^conservative]: Xbox Live used $k = 3$, which puts a player's displayed rank at the 99.7th percentile lower bound of their skill belief.
[^beta]: A common default is $\beta = \sigma_0 / 2$, half the initial skill standard deviation.
