# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Variáveis de Ambiente

Este projeto usa variáveis de ambiente para as chaves da API do Google Maps e Google Places. Para configurar:

1. Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione suas chaves de API:

   ```
   VITE_GOOGLE_MAPS_API_KEY=sua_chave_da_api_google_maps
   VITE_GOOGLE_PLACES_API_KEY=sua_chave_da_api_google_places
   ```

3. As variáveis de ambiente são carregadas automaticamente pelo Vite durante o desenvolvimento e build.

Importante: O arquivo `.env` está incluído no `.gitignore` para evitar que suas chaves sejam publicadas no repositório. Não adicione chaves de API diretamente no código.
