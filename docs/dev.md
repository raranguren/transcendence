# Onboarding for dev environment
The purpose of this document is to make sure we have similar development environment.

## Node Version
We have node v.16 in clusters, but that is quite old. To use newer versions without building the container every time, we can install Node Version Manager (nvm) in our home dir.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

(Source: [github.com/nvm-sh](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating))

Reopen the terminal and verify it worked:
```
nvm install 24
node --version
```

We should now make sure that our Dockerfiles start with:
```
FROM node:24
```

We can also add this part to all `package.json` files:
```
  "engines": {
    "node": ">=24.0.0"
  },
```

## VSCode extensions

Typescript is already supported, npm package auto-completion is also supported by default in VsCode.

Optional packages:
- Mermaidchart
- Docker DX
