import { vaultClient } from './vault.client.ts'

//Function to read a secret from vault
//	path: path to the secret in vault (ex: secret/data/backend)
//	key: name of the data to read in secret (ex: "key", "apikey"...)
async function getSecret(path: string, key: string) {
	const result = await vaultClient.read(path);
	return result.data.data[key];
}

//Function to set a secret in vault
//
async function setSecret(path: string, key: string, value: string) {
	await vaultClient.write(path, { data: { [key]: value } });
}

export { getSecret };
export { setSecret };