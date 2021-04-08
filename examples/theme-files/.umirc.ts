import { IConfig } from 'umi-types';

export default {
  routes: [{ path: '/', component: './index' }],
  plugins: ['umi-plugin-theme-switch'],
  'theme-switch':{
    themes: 'themes', // relative path
    // same as absolute path:
    // themes: path.join(__dirname, 'themes'),
    defaultTheme: 'light',
  }
} as IConfig;
