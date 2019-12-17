import { IConfig } from 'umi-types';
import { join } from 'path';

export default {
  routes: [{ path: '/', component: './index' }],
  plugins: [
    [
      'umi-plugin-theme-switch',
      {
        themes: 'themes/',
        defaultTheme: 'light',
      },
    ],
  ],
} as IConfig;
