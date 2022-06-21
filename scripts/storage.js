'use strict'

function getStorage(name){
    return localStorage.getItem(name)? JSON.parse(localStorage.getItem(name)): [];
}

function setStorage(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}

function removeStorage(name){
    localStorage.removeItem(name);
}
