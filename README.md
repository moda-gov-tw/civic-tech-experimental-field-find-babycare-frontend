# find-babycare-frontend
本案為「112年數位發展部公民科技試驗場域示範案」由「一起加油陣線」團隊開發的「公托申請數位流程優化」透過與臺中市政府社會局的合作，提供既有公托申請流程解方，開發一申請公托的整合平台，提供申請、查詢、審核及管理等功能。本案為示範案例尚未正式上線提供服務。

This template should help get you started developing with Vue 3 in Vite.

這個模板應該能幫助你開始在 Vite 中使用 Vue 3 進行開發

## Prerequisites 先備條件

- node.js > 18
- [pnpm](https://pnpm.io/)

## Recommended IDE Setup 推薦的IDE配置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration 自訂配置

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup 安裝準備

```sh
nvm use 18
pnpm install
```

### Compile and Hot-Reload for Development 編譯及熱重載開發環境

```sh
pnpm i18n:build # Generate i18n files. Run this script every time after you update i18n.json
pnpm dev
```

### Compile and Minify for Production 編譯及壓縮正式環境

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/) 檢查工具

```sh
pnpm lint
```

### Design 設計

https://www.figma.com/file/bCUyDf8lZ2lVACZKJ0Bxvl/Find-Babycare-%E5%AF%B6%E5%AF%B6%E6%89%BE%E5%85%AC%E6%89%98?type=design&node-id=4648%3A3228&mode=design&t=IuJD19H0UVcVWS3N-1

### How to Automatically Switch to the Correct Version of Node.js Based on Project  如何自動切換到正確版本的 Node.js 

If you'd rather not manually use NVM, you can utilize .nvmrc for automatic switching.

### How to Set Up 如何安裝

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
