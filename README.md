# find-babycare-frontend

This template should help get you started developing with Vue 3 in Vite.

## Prerequisites

- node.js > 18
- [pnpm](https://pnpm.io/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
nvm use 18
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm i18n:build # Generate i18n files. Run this script every time after you update i18n.json
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Design

https://www.figma.com/file/bCUyDf8lZ2lVACZKJ0Bxvl/Find-Babycare-%E5%AF%B6%E5%AF%B6%E6%89%BE%E5%85%AC%E6%89%98?type=design&node-id=4648%3A3228&mode=design&t=IuJD19H0UVcVWS3N-1

### How to Automatically Switch to the Correct Version of Node.js Based on Project

If you'd rather not manually use NVM, you can utilize .nvmrc for automatic switching.

### How to Set Up

Open your terminal and enter `vi ~/.zshrc` (please note that everyone's path may be different). Then, paste the following script on the last line:

```sh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

Once saved, enter `source ~/.zshrc` to apply the changes.
