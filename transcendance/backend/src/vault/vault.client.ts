import { readFileSync } from "fs";
import Vault from "node-vault";

function tokenFromSecret() {
  if (!process.env.VAULT_TOKEN_FILE) return null;
  return readFileSync(process.env.VAULT_TOKEN_FILE, "utf8").trim();
}

const vaultClient = Vault({
  endpoint: process.env.VAULT_ADDR || "http://vault:8200",
  token: tokenFromSecret() || process.env.VAULT_TOKEN || "root",
});

export { vaultClient };
