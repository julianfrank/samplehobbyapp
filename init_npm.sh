#!/usr/bin/bash

function addserver {
    cd addserver
    npm i
}
function subserver {
    cd subserver
    npm i
}
function clockserver {
    cd clockserver
    npm i
}
function apiserver {
    cd apiserver
    npm i
}
function pubsubserver {
    cd pubsubserver
    npm i
}
function www {
    cd www
    npm i
}
addserver&subserver&clockserver&apiserver&pubsubserver&www