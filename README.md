# LLAMA-AGENT

## Description

This is a simple agent that can be used to interact with custom data sources. It is designed to be used with Ollama.

## Pre-requisites

Deno runtime is required to run this agent.

## Usage

1. Put the data source file (txt, csv, json, pdf) in the data folder.
2. Update the .env file with the data source file name under `FILE_PATH`. Optionally, change the model name under `MODEL`.
3. Edit the query in the `main.ts` file.
4. Run the agent using the following command:
   `deno task main`
