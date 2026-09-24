---
title: "TrueSkill: A Bayesian Skill Rating System"
authors:
  - Ralf Herbrich
  - Tom Minka
  - Thore Graepel
year: 2006
venue: "NeurIPS 2006"
kind: paper
url: "https://www.microsoft.com/en-us/research/publication/trueskilltm-a-bayesian-skill-rating-system/"
section: matchmaking
tags:
  - trueskill
  - rating-systems
  - bayesian
summary: "Models each player's skill as a Gaussian belief and updates it by message passing on a factor graph, which handles teams, free-for-all matches and draws in one framework. The system behind Xbox Live matchmaking."
date: 2026-09-01
---

## Why it matters

TrueSkill replaced Elo on Xbox Live and became the reference design for team-based rating. The key idea is to keep an explicit uncertainty $\sigma$ per player instead of a single rating, so that new players converge quickly and veterans stay stable without a hand-tuned $K$ factor.

## Model in one paragraph

Each player $i$ has skill $s_i \sim \mathcal{N}(\mu_i, \sigma_i^2)$. In a given game the player performs $p_i \sim \mathcal{N}(s_i, \beta^2)$, a team's performance is the sum of its members' performances, and the observed ranking of teams imposes ordering constraints (with a draw margin $\varepsilon$). Inference is approximate message passing; the posterior is projected back to a Gaussian per player after every match.

## Things to remember

- The conservative rank $\mu - 3\sigma$ is what players see, so reducing uncertainty is itself rewarded.
- $\beta$ controls how noisy a single game is; a larger $\beta$ means more games are needed before skill is trusted.
- Match quality is defined as the draw probability, which the matchmaker maximises directly.

## Where to add the PDF

Place the file at `public/pdfs/trueskill.pdf` and set `pdf: "/pdfs/trueskill.pdf"` in this entry's frontmatter. The embedded viewer and the download button appear automatically.
