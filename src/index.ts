// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
import { isAbsolute, join } from 'path';

export interface UmiPluginThemeSwitchOptions {
  themes: UmiPluginThemeItem[];
  // themePrefix?: string;
  defaultTheme?: string;
  autoDetect?: {
    enable: boolean;
    darkTheme: string;
    lightTheme: string;
  };
  remember?: boolean;
  attribute?: string;
}

export interface UmiPluginThemeItem {
  name: string;
  variables: string | UmiPluginCssVariables;
}

export interface UmiPluginCssVariables {
  [K: string]: string;
}

export function generateStyles(
  cssVariables: UmiPluginCssVariables,
  scope: string = ':root'
) {
  const cssAssign = Object.entries(cssVariables).map(([k, v]) => {
    return `${addCssVariablesPrefix(k)}: ${v};`;
  });
  return `${scope}{${cssAssign.join('')}}`.trim();
}

/**
 * 生成style的cssText
 * @param themes
 * @param attribute
 * @param defaultTheme
 */
export function generateAllStyles(
  themes: UmiPluginThemeItem[],
  attribute: string,
  defaultTheme: string
) {
  let cssText = '';
  themes.forEach(theme => {
    if (theme.name === defaultTheme) {
      cssText += generateStyles(
        theme.variables as UmiPluginCssVariables,
        ':root'
      );
    } else {
      cssText += generateStyles(
        theme.variables as UmiPluginCssVariables,
        `:root body[${attribute}=${theme.name}]`
      );
    }
    cssText += '\n';
  });
  return cssText;
}

/**
 * filepath => Object
 * @param themes
 * @param cwd
 */
export function convertThemesFilePath(
  themes: UmiPluginThemeItem[],
  cwd: string
) {
  return themes.map(theme => {
    if (typeof theme.variables === 'string') {
      // path
      let path = theme.variables;
      if (!isAbsolute(path)) {
        path = join(cwd, path);
      }
      return {
        name: theme.name,
        variables: require(path) as UmiPluginCssVariables
      };
    } else {
      return theme;
    }
  });
}

/**
 * 强制补齐css变量前面的 `--` 符号
 * @param variable
 */
export function addCssVariablesPrefix(variable: string) {
  return variable.replace(/^[\-]*/, '--');
}

export default function(api: IApi, options: UmiPluginThemeSwitchOptions) {
  let opts = options;
  const { cwd } = api;
  let { themes, defaultTheme, attribute } = opts;
  // const _themePrefix = themePrefix || '';
  const _attr = attribute || 'umi-theme';
  let _defaultTheme = defaultTheme;
  if (!themes.find(t => t.name === _defaultTheme)) {
    _defaultTheme = themes[0].name;
  }
  api.onOptionChange(newOpts => {
    opts = newOpts;
    api.restart();
  });

  api.addHTMLStyle({
    type: 'text/css',
    content: generateAllStyles(
      convertThemesFilePath(themes, cwd),
      _attr,
      _defaultTheme
    )
  });

  api.addEntryCodeAhead(`
    window['g_theme_attribute'] = ${JSON.stringify(_attr)};
  `);
}
