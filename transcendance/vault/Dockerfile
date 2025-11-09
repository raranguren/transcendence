FROM hashicorp/vault:1.21

RUN apk add --no-cache openssl

COPY vault.hcl /vault/config/vault.hcl
COPY backend.hcl /vault/policies/backend.hcl

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
