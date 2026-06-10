import type { Config } from 'prettier';

const config: Config = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,

  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      options: {
        printWidth: 120,
        tabWidth: 2
      }
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 100,
        proseWrap: 'always'
      }
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
        tabWidth: 2
      }
    }
  ]
};

export default config;