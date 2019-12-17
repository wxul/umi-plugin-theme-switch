import { IConfig } from 'umi-types';

export default {
  routes: [{ path: '/', component: './index' }],
  plugins: [
    [
      'umi-plugin-theme-switch',
      {
        themes: [
          {
            name: 'light',
            variables: {
              '--bg-global-color': '#ccc',
              '--font-main-color': '#333',
            },
          },
          {
            name: 'dark',
            variables: {
              '--bg-global-color': '#333',
              '--font-main-color': '#ccc',
            },
          },
        ],
      },
    ],
  ],
} as IConfig;
