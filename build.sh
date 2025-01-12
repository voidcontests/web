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

write_build_stats() {
    CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    GIT_COMMIT=$(git rev-parse --short HEAD)
    GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

    # remove all lines started with NEXT_PUBLIC_BUILD
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' '/^NEXT_PUBLIC_BUILD/d' .env
    else
        # Linux
        sed -i '/^NEXT_PUBLIC_BUILD/d' .env
    fi

    echo "NEXT_PUBLIC_BUILD_TIME=\"$CURRENT_TIME\"" >> .env
    echo "NEXT_PUBLIC_BUILD_BRANCH=\"$GIT_BRANCH\"" >> .env
    echo "NEXT_PUBLIC_BUILD_COMMIT=\"$GIT_COMMIT\"" >> .env
}


if [ "$1" == "deploy" ]; then
    if [ -n "$2" ]; then
		git checkout "$2"
	fi

	echo -e "Deploying ${bold}voidcontests/frontend${normal} from ${bold}$(git rev-parse --abbrev-ref HEAD)${normal} branch"

	echo "Pulling latest changes..."
	git pull
	
	write_build_stats

	echo "Downloading new dependencies..."
	npm i

	echo "Building project..."
	npm run build

	echo "Starting server..."
	npm run start
elif [ "$1" == "help" ]; then
	help
fi
