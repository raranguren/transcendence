#!/bin/sh
umask 0

# launch in prod mode, in the background
export VAULT_ADDR="http://127.0.0.1:8200"
vault server -config=/vault/config/vault.hcl > /dev/null 2>&1 &
sleep 2

# on first run, save root token
if [ ! -f /vault/data/unseal.txt ]; then
  vault operator init -key-shares=1 -key-threshold=1 > /vault/data/init-output.txt
  grep "Unseal Key 1:" /vault/data/init-output.txt | awk '{print $NF}' > /vault/data/unseal.txt
  grep "Initial Root Token:" /vault/data/init-output.txt | awk '{print $NF}' > /vault/data/token.txt
fi

UNSEAL_KEY=$(cat /vault/data/unseal.txt)
VAULT_TOKEN=$(cat /vault/data/token.txt)
vault operator unseal "$UNSEAL_KEY"

# on first run, prepare secrets and ready only token for backend
if [ ! -f /vault/data/backend-token.txt ]; then
  export VAULT_TOKEN
  vault secrets enable -version=2 -path=secret kv
  vault kv put secret/backend JWT_SECRET="$(openssl rand -base64 32)"
  
  vault policy write backend /vault/policies/backend.hcl
  vault token create -policy=backend -field=token > /vault/data/backend-token.txt
fi

wait