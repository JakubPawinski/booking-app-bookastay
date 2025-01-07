#!/bin/bash

cd ./backend
npm run dev &
pid1=$!
cd ../frontend
npm run dev &
pid2=$!

cleanup() {
  kill $pid1
  kill $pid2
  exit 0
}

trap cleanup SIGINT

while true; do
  sleep 1
done