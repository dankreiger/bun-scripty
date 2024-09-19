#!/usr/bin/env bash

if [ "$CI" = true ]; then
  echo "Running in CI"
else
  echo "Running in local"
  bun run build
fi

bun link

sleep 5

echo "Running tests"
