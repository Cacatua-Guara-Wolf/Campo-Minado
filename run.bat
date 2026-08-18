color 0f
echo off
cls

chcp 65001 >nul
echo  ▄▄·  ▄▄▄· • ▌ ▄ ·.  ▄▄▄·          • ▌ ▄ ·. ▪   ▐ ▄  ▄▄▄· ·▄▄▄▄
echo ▐█ ▌▪▐█ ▀█ ·██ ▐███▪▐█ ▄█▪         ·██ ▐███▪██ •█▌▐█▐█ ▀█ ██▪ ██ ▪
echo ██ ▄▄▄█▀▀█ ▐█ ▌▐▌▐█· ██▀· ▄█▀▄     ▐█ ▌▐▌▐█·▐█·▐█▐▐▌▄█▀▀█ ▐█· ▐█▌ ▄█▀▄
echo ▐███▌▐█ ▪▐▌██ ██▌▐█▌▐█▪·•▐█▌.▐▌    ██ ██▌▐█▌▐█▌██▐█▌▐█ ▪▐▌██. ██ ▐█▌.▐▌
echo ·▀▀▀  ▀  ▀ ▀▀  █▪▀▀▀.▀    ▀█▄▀▪    ▀▀  █▪▀▀▀▀▀▀▀▀ █▪ ▀  ▀ ▀▀▀▀▀•  ▀█▄▀▪

echo.
title 🟡 Campo Minado
node deploy-commands.js

echo.
title 🟢 Campo Minado
node index.js

title ⛔ Campo Minado
pause