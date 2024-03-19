#!/bin/bash

# inits git auto sync on dev branch cronjob

echo;
echo "  ↳ Matando processos pre-existentes no PM2"
echo;

sleep 1;

pm2 delete git;

echo;
echo "  ↳ Iniciando cronjob de sincronização automática com GitHub no branch 'main'"
echo;

sleep 1;

pm2 start "/root/app/scripts/git/git.js" --max-memory-restart 300M --name git;

echo;
echo "  ↳ Salvando estado do PM2"
echo;
sleep 2;

pm2 save;

echo;
echo "  ↳ Cronjob iniciado com sucesso!"
echo;