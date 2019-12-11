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

export function getTheme(): string {
  return document.body.getAttribute(window['g_theme_attribute']);
}

export function switchTheme(name: string) {
  document.body.setAttribute(window['g_theme_attribute'], name);
}
