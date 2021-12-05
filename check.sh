#!/bin/bash
clear
echo "Going to Check if you got all the Prerequisites"
echo "Last Updated on 5Dec2021"
echo

# Code From https://stackoverflow.com/questions/3466166/how-to-check-if-running-in-cygwin-mac-or-linux
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machineos=Linux;;
    Darwin*)    machineos=Mac;;
    CYGWIN*)    machineos=Cygwin;;
    MINGW*)     machineos=MinGw;;
    *)          machineos="UNKNOWN:${unameOut}"
esac

# code from https://stackoverflow.com/questions/2924697/how-does-one-output-bold-text-in-bash/2924755
bold=$(tput bold)
normal=$(tput sgr0)

# My code
if [ ${machineos} == "Linux" ]
then
    echo "[✅] You are on $(uname -v)${machineos}"
else
    echo "[🚧] $(uname -v)${machineos} Not Supported. Check for Pre-requisites manually"
    exit
fi

if [[ $(which aws) != "" ]]
then
    echo "[✅] $(aws --version) Available"
    if [ -r ~/.aws/credentials ]
    then
        echo "[✅] AWS CLI Credentials Set"

    else
        echo "[🚧] AWS Credentials ${bold}Not Set${normal} hence Exiting"
        exit
    fi
else
    echo "[🚧] AWS ${bold}Not available!${normal} Install it first"
    exit
fi

if [[ $(which node) != "" ]]
then
    echo "[✅] NodeJS $(node --version) Available"
    if [[ $(which npm) != "" ]]
    then
        echo "[✅] NPM $(npm --version) Available"
    else
        echo "[🚧] NPM ${bold}Not available!${normal} hence Exiting"
        exit
    fi
else
    echo "[🚧] NodeJS ${bold}Not available!${normal} Install it first"
    exit
fi