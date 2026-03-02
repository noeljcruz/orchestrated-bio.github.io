---
layout: post
title: "Building Insight: From PhD Thesis to Patent-Pending Cancer Genomics Platform"
subtitle: "How a frustrated researcher's side project became a conversational AI platform for TCGA cancer data"
date: 2026-03-02
author: "Alex Nesta, PhD"
author_title: "CTO, Orchestrated Biosciences"
tags: [Engineering, Insight, Cancer Genomics]
description: "The story of building Insight, a conversational cancer genomics platform that makes TCGA data accessible through plain English questions."
image: /images/blog/building-insight.png
---

During my PhD, I spent countless hours writing custom R scripts just to answer basic questions about TCGA cancer data. "What's the survival difference between TP53 mutant and wild-type patients in BRCA?" should have been a quick lookup. Instead, it was a multi-hour scripting exercise involving data download, parsing, filtering, survival analysis, and visualization.

That frustration planted the seed for what would become **Insight**, a platform where you type a question in plain English and get an answer with publication-quality figures in seconds.

## The Problem

TCGA is one of the most valuable public datasets in cancer research: multi-omic data for 33 cancer types across more than 11,000 patients. But accessing it programmatically means understanding the data model, writing API calls, merging disparate tables on patient barcodes, applying the right statistical methods, and generating interpretable visualizations.

Most researchers, even computational ones, spend 80% of their time on data wrangling and only 20% on the actual scientific question. Insight flips that ratio.

## What We Built

Insight is not a chatbot with a database connection. It's a multi-phase agentic system with 38 specialized bioinformatics tools, built-in scientific validation, and a high-performance data engine underneath. You ask a question in natural language. The system figures out which tools to use, executes the analysis with validated statistical methods, generates publication-quality visualizations, and cross-references findings against the literature.

The AI handles understanding and explanation. The computation layer handles the science. The AI never invents numbers.

## What's Coming on This Blog

This post is the first in a series where I'll break down how we built Insight and the decisions behind it. Upcoming topics include:

- **Context engineering for scientific AI**: How we keep a 38-tool agent focused and accurate using semantic routing, hard tool pruning, and phase-aware guidance
- **Making ClickHouse work for cancer genomics**: Why we chose a columnar database over traditional approaches, and how Arrow and Polars give us zero-copy performance across 520+ studies
- **Scientific validation in agentic systems**: Gene grounding, statistical evidence checking, and why your AI should never report a p-value it didn't compute
- **Model-agnostic architecture**: How routing every LLM call through OpenRouter lets us use the best model for each task without vendor lock-in
- **Building a scientific reviewer agent**: An async critic that catches errors, suggests follow-ups, and builds persistent research memory across sessions

If you're a researcher tired of writing boilerplate code to ask basic questions about cancer data, [try Insight](https://insight.orchestrated.bio). And if you're an engineer building AI for science, I hope this series gives you some useful patterns to steal.

Follow us on [LinkedIn](https://www.linkedin.com/company/orchestrated-biosciences) for updates.
