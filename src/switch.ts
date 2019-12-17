/// <reference path="./index.d.ts" />
/**
 * TODO
 */

/**
 * 浏览器是否支持css变量
 */
export function supportCssVariables(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports('--test', '0')
  );
}

/**
 * 浏览器是否在黑暗模式
 * @see https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
 */
export function isBrowserDarkMode() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export function getScopeElementAll() {
  if (typeof window === 'undefined') return null;
  return document.querySelectorAll(UMI_THEME_SCOPE);
}

export function getScopeElement() {
  if (typeof window === 'undefined') return null;
  return document.querySelector(UMI_THEME_SCOPE);
}

/**
 * 获取当前的主题
 */
export function getTheme(): string {
  if (typeof window === 'undefined') return null;
  const theme = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_theme') : '';
  if (theme) return theme;
  const ele = getScopeElement();
  return ele && ele.getAttribute(UMI_THEME_ATTRIBUTE);
}

/**
 * 切换主题
 * @param name
 */
export function switchTheme(name: string) {
  const ele = getScopeElementAll();
  if (ele && ele.length) {
    [].forEach.call(ele, e => {
      e.setAttribute(UMI_THEME_ATTRIBUTE, name);
    });
    window.localStorage.setItem('umi_theme', name || '');
  }
}
