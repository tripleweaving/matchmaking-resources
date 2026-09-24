---
title: "Formatting showcase: everything a post can contain"
description: "A reference post exercising code blocks, math, definitions and theorems, inline graph drawings, tables, footnotes and the other building blocks available in this blog."
date: 2026-09-24
authors:
  - yanushvy
tags:
  - meta
---

This post exists so you can see every kind of element a post can use, and copy the Markdown for it. Delete it once you no longer need it.

## Code blocks

Fenced blocks are rendered by Expressive Code with line numbers, a file title, highlighted lines and collapsible sections. Inline code such as `nc 0.cloud.chals.io 12345` and `matching = nx.max_weight_matching(G){:python}` is highlighted too.

```python title="matchmaker.py" {6-7} collapse={1-3}
import networkx as nx
from typing import Iterable

def best_pairs(edges: Iterable[tuple[str, str, int]]) -> set[tuple[str, str]]:
    G = nx.Graph()
    G.add_weighted_edges_from(edges)
    return nx.max_weight_matching(G, maxcardinality=True)

print(best_pairs([("a", "b", 3), ("b", "c", 5), ("c", "d", 2)]))
```

Terminal sessions drop the line numbers:

```console
$ python matchmaker.py
{('b', 'c'), ('a', 'd')}
```

## Math

Inline math like $\mu - 3\sigma$ and display math with alignment:

$$
\begin{aligned}
E_A &= \frac{1}{1 + 10^{(R_B - R_A)/400}} \\
R_A' &= R_A + K\,(S_A - E_A)
\end{aligned}
$$

## Definitions, theorems, remarks

Mathematical callouts use the `:::name[Label]` syntax. Available names: `definition`, `theorem`, `lemma`, `corollary`, `proof`, `remark`, `notation`, `example`, plus the general-purpose `note`, `tip`, `warning`, `caution` and `important`. Add `{closed}` after the label to collapse one by default.

:::notation[Graphs]
A graph is written $G = (V, E)$ with vertex set $V$ and edge set $E \subset \{(x, y) \mid (x, y) \in V^2 \text{ and } x \neq y\}$.
:::

:::definition[Matching]
A **matching** $M \subseteq E$ is a set of edges no two of which share an endpoint. A vertex covered by an edge of $M$ is *matched*; otherwise it is *exposed*.
:::

:::theorem[Berge's theorem]
A matching $M$ is maximum if and only if there is no $M$-augmenting path.
:::

:::proof
Suppose $P$ is an $M$-augmenting path. Then $M \,\triangle\, P$ is a matching with one more edge than $M$, so $M$ was not maximum. The converse is the substantive direction and is left to the paper.
:::

:::remark[Why this matters for matchmaking]{closed}
A lobby of players with pairwise "fun" scores is exactly a weighted graph, and the matchmaker wants a maximum weight matching.
:::

:::example
Four players $a, b, c, d$ with edges $ab = 3$, $bc = 5$, $cd = 2$. The maximum weight matching is $\{bc\}$ with weight $5$; the maximum cardinality matching is $\{ab, cd\}$ with weight $5$ as well.
:::

:::warning
Callouts can also carry plain warnings.
:::

## Inline graph drawings

Diagrams are plain SVG written directly in the Markdown. Use the site's colour variables so they match the theme, and add `data-diagram` so the SVG scales to the column width.

<svg role="img" aria-label="A graph with five vertices" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 340" data-diagram="graph">
  <line x1="140" y1="90" x2="330" y2="230" stroke="var(--background-l3)" stroke-width="8"/>
  <line x1="330" y1="230" x2="470" y2="80" stroke="var(--background-l3)" stroke-width="8"/>
  <line x1="470" y1="80" x2="650" y2="120" stroke="var(--foreground-l5)" stroke-width="8"/>
  <line x1="470" y1="80" x2="560" y2="260" stroke="var(--background-l3)" stroke-width="8"/>
  <line x1="140" y1="90" x2="330" y2="230" stroke="var(--foreground-l5)" stroke-width="8"/>
  <circle cx="140" cy="90" r="34" fill="var(--background-l5)"/>
  <text x="140" y="100" text-anchor="middle" font-size="28" fill="var(--foreground-l0)">1</text>
  <circle cx="330" cy="230" r="34" fill="var(--background-l5)"/>
  <text x="330" y="240" text-anchor="middle" font-size="28" fill="var(--foreground-l0)">2</text>
  <circle cx="470" cy="80" r="34" fill="var(--background-l5)"/>
  <text x="470" y="90" text-anchor="middle" font-size="28" fill="var(--foreground-l0)">3</text>
  <circle cx="650" cy="120" r="34" fill="var(--background-l5)"/>
  <text x="650" y="130" text-anchor="middle" font-size="28" fill="var(--foreground-l0)">4</text>
  <circle cx="560" cy="260" r="34" fill="var(--background-l5)"/>
  <text x="560" y="270" text-anchor="middle" font-size="28" fill="var(--foreground-l0)">5</text>
  <text x="235" y="140" font-size="22" fill="var(--foreground-l5)">3</text>
  <text x="560" y="86" font-size="22" fill="var(--foreground-l5)">5</text>
</svg>

The highlighted edges $\{1\text{–}2, 3\text{–}4\}$ form a matching.

## Tables

| Author(s) | Title | Year |
| --- | --- | --- |
| Edmonds | Paths, trees, and flowers | 1965 |
| Galil | Efficient algorithms for finding maximum matching in graphs | 1986 |
| Herbrich, Minka, Graepel | TrueSkill: a Bayesian skill rating system | 2006 |

## Inline extras

You can <u>underline</u>, <mark>highlight</mark>, use keyboard keys like <kbd>Ctrl</kbd> + <kbd>K</kbd>, and add footnotes.[^one] Footnotes appear in the right margin on wide screens.[^two]

> Blockquotes look like this.

- Bullet lists
- with several items
  1. and nested
  2. numbering

## Custom blocks

Raw HTML and a `<style>` tag are allowed in a post, so one-off blocks like a challenge info box can be written inline:

<style>
  info-box {
    display: block;
    margin-block: 0 1em;
    padding: var(--space-xs) var(--space-s);
    border: 2px solid var(--border);
    font-size: var(--step--1);
  }
  info-box dl { display: grid; grid-template-columns: max-content 1fr; gap: 0.25em 1em; }
  info-box dt { color: var(--muted-foreground); }
  info-box dd { margin: 0; }
</style>

<info-box>
  <dl>
    <dt>Category</dt><dd><code>PPC</code></dd>
    <dt>Points</dt><dd>9</dd>
    <dt>Remote</dt><dd><code>nc 0.cloud.chals.io [PORT]</code></dd>
  </dl>
</info-box>

[^one]: A short footnote.
[^two]: Footnotes can contain math too: $q = \sqrt{2\beta^2 / (2\beta^2 + \sigma_A^2 + \sigma_B^2)}$.
