#!/bin/bash

# colors
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
    echo -e "    ${bold}$0${normal} [${underl}command${normal}]\n"
    echo -e "Here is a list of available commands\n"
    echo -e "    ${bold}deploy${normal} [${underl}branch${normal}]    Run deploy script from current or provided branch"
    echo -e "    ${bold}help${normal}               Print this help messages to standard output"
}

if [ "$1" == "deploy" ]; then
    if [ -n "$2" ]; then
		git checkout "$2"
	fi

	echo -e "Deploying ${bold}voidcontests/frontend${normal} from ${bold}$(git rev-parse --abbrev-ref HEAD)${normal} branch"

	echo "Pulling latest changes..."
	git pull

	echo "Building project..."
	npm run build > /dev/null

	echo "Starting server..."
	npm run start
elif [ "$1" == "help" ]; then
    help
fi
