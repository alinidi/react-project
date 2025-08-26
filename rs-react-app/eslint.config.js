import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']), //игнорирую dist
  {
    files: ['**/*.{ts,tsx}'], //применяю правила только к .ts, .tsx
    extends: [
      js.configs.recommended, //базовые правила
      ...tseslint.configs.recommendedTypeChecked, //смотрит в конфиг
      reactHooks.configs['recommended-latest'], //будет проверять хуки
      reactRefresh.configs.vite, //предотвращает баги при refresh (?)
    ],
    languageOptions: {
      ecmaVersion: 2020, //синтаксис (??, ?., async/await...)
      globals: globals.browser, //разрешены console, document, window...
      parserOptions: {
        //подключает tsconfig, чтобы понимать типы
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname, //поиск project относительно RootDir
      },
    },
    overrides: [
      //отключила проверку тестов
      {
        files: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
        ],
        parserOptions: { project: undefined },
      },
    ],
  },
]);
