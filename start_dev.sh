#!/usr/bin/bash

function addserver {
    cd addserver
    npm run start
}
function subserver {
    cd subserver
    npm run start
}
function clockserver {
    cd clockserver
    npm run start
}
function apiserver {
    cd apiserver
    npm run start
}
function pubsubserver {
    cd pubsubserver
    npm run start
}
function www {
    cd www
    npm run start
}
addserver&subserver&clockserver&apiserver&pubsubserver&www