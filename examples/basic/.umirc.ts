import { join } from 'path';
import { IConfig } from 'umi';

export default {
  // plugins: [join(__dirname, '../../', 'lib/index.js')],
  plugins: ['umi-plugin-theme-switch'],
  'theme-switch': {
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
  }
} as IConfig;
