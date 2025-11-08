FROM hashicorp/vault:1.16

COPY init-vault.sh /init-vault.sh

RUN chmod +x init-vault.sh

CMD vault server -dev -dev-root-token-id=root & \
    /init-vault.sh && \
    wait
# CMD ["sh", "-c", "vault server -dev -dev-root-token-id=root & sleep 5 && /init-vault.sh && tail -f /dev/null"]