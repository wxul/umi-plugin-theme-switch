import { join } from 'path';
import { IConfig } from 'umi-types';

export default {
  routes: [{ path: '/', component: './index' }],
  plugins: [
    [
      join(__dirname, '..', require('../package').main || 'index.js'),
      {
        // themes: [
        //   {
        //     name: 'light',
        //     variables: {
        //       '--bg-global-color': '#ccc',
        //       '--font-main-color': '#333'
        //     }
        //   },
        //   {
        //     name: 'dark',
        //     variables: {
        //       '--bg-global-color': '#333',
        //       '--font-main-color': '#ccc'
        //     }
        //   }
        // ],
        // themes: 'themes',
        themes: join(__dirname, 'themes'),
        // defaultTheme: 'light',
        // scope: '#root',
        // remember: true,
        // autoDetectDarkMode: {
        //   enable: true,
        // },
      },
    ],
  ],
} as IConfig;
