/**
 * 主题作用域，为选择器字符串
 */
declare const UMI_THEME_SCOPE: string;
/**
 * 主题产生作用的属性，默认为 umi-theme
 */
declare const UMI_THEME_ATTRIBUTE: string;

declare module 'umi-plugin-theme-switch'{
  /**
   * 获取当前的主题
   */
  export function getTheme():string;

  /**
   * 切换主题
   * @param name
   */
  export function switchTheme(name:string):void;
}
