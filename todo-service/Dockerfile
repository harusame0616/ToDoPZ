FROM node:19.0-bullseye-slim

RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends procps git && apt-get clean && rm -rf /var/lib/apt/lists/*