#!/bin/bash

bold='\033[0;1m'
italic='\033[0;3m'
underl='\033[0;4m'
red='\033[0;31m'
green='\033[0;32m'
blue='\033[0;34m'
yellow='\033[0;33m'
normal='\033[0m'

help() {
    echo -e "${underl}Usage:${normal}\n"
    echo -e "    ${bold}$0${normal} [${underl}branch${normal}]\n"
}

# Check if the first argument is 'help'
if [ "$1" == "help" ]; then
    help
    exit 0
fi

if [ -n "$1" ]; then
    git checkout "$1"
fi

echo -e "Deploying ${bold}voidcontests/frontend${normal} from ${bold}$(git rev-parse --abbrev-ref HEAD)${normal} branch"

echo "Pulling latest changes..."
git pull

echo "Resetting all changes..."
git reset --hard && git clean -fdx

echo "Downloading new dependencies..."
bun install --frozen-lockfile

echo "Building project..."
bun run build

echo "Starting server..."
bun run start
