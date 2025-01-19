#!/bin/bash

cd ./backend
npm run dev &
pid1=$!
cd ../frontend
npm run dev &
pid2=$!

cd ../../hivemq-ce-2024.9/bin
./run.sh &
pid3=$!

cleanup() {
  kill $pid1
  kill $pid2
  kill $pid3
  exit 0
}

trap cleanup SIGINT

while true; do
  sleep 1
done