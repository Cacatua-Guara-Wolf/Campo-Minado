color 08
echo off
cls

chcp 65001 >nul
echo   .,-:::::   :::.     .        :::::::::::.    ...         .        :   ::::::.    :::.  :::.   :::::::-.      ...
echo ,;;;'````'   ;;`;;    ;;,.    ;;;`;;;```.;;;.;;;;;;;.      ;;,.    ;;;  ;;;`;;;;,  `;;;  ;;`;;   ;;,   `';, .;;;;;;;.
echo [[[         ,[[ '[[,  [[[[, ,[[[[,`]]nnn]]',[[     \[[,    [[[[, ,[[[[, [[[  [[[[[. '[[ ,[[ '[[, `[[     [[,[[     \[[,
echo $$$        c$$$cc$$$c $$$$$$$$"$$$ $$$""   $$$,     $$$    $$$$$$$$"$$$ $$$  $$$ "Y$c$$c$$$cc$$$c $$,    $$$$$,     $$$
echo `88bo,__,o, 888   888,888 Y88" 888o888o    "888,_ _,88P    888 Y88" 888o888  888    Y88 888   888,888_,o8P'"888,_ _,88P
echo   "YUMMMMMP"YMM   ""` MMM  M'  "MMMYMMMb     "YMMMMMP"     MMM  M'  "MMMMMM  MMM     YM YMM   ""` MMMMP"`    "YMMMMMP"

echo.
title 🟡 Campo Minado
node deploy-commands.js

title 🟢 Campo Minado
node index.js

title ⛔ Campo Minado
pause