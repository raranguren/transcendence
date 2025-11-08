import Vault from "node-vault"

const vaultClient = Vault({
	endpoint: process.env.VAULT_ADDR || "http://vault:8200",
	token: process.env.VAULT_TOKEN || "root",
});

export { vaultClient }