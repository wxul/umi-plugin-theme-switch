import { IConfig } from 'umi-types';

export default {
  routes: [{ path: '/', component: './index' }],
  // 覆盖antd的less变量定义，https://ant.design/docs/react/customize-theme-cn
  // 有些less变量可能会被用于计算例如@primary-color，这时用css变量赋值会出现编译错误，暂时没有很好的解决方法，可以把所有涉及到此变量的计算变量都覆盖了_(:з」∠)_
  // 所有的less变量在此 https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  theme: {
    // 只覆盖了一部分变量用于举例
    '@body-background': 'var(--body-background)',
    '@component-background': 'var(--component-background)',
    '@text-color': 'var(--font-main-color)',
    '@heading-color': 'var(--font-main-color)',
    '@border-color-base': 'var(--border-color)',
    '@box-shadow-base': 'var(--box-shadow)',
    '@icon-color': 'var(--font-main-color)',
  },
  plugins: [
    [
      'umi-plugin-theme-switch',
      {
        themes: [
          {
            name: 'light',
            variables: {
              'body-background': '#fff', // 这里可以省略前缀 -- ，插件会自动补齐
              'component-background': '#fafafa',
              'border-color': '#e6e6e6',
              'font-main-color': '#333',
            },
          },
          {
            name: 'dark',
            variables: {
              'body-background': '#2f3843',
              'component-background': '#232b36',
              'border-color': '#465261',
              'font-main-color': '#a2b3c7',
            },
          },
        ],
      },
    ],
    [
      'umi-plugin-react',
      {
        antd: true,
      },
    ],
  ],
} as IConfig;
