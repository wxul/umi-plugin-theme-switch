"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateStyles = generateStyles;
exports.generateAllStyles = generateAllStyles;
exports.addCssVariablesPrefix = addCssVariablesPrefix;
exports.parseFilepathThemes = parseFilepathThemes;
exports.requireTSFile = requireTSFile;
exports.default = _default;

var _path = require("path");

var _assert = _interopRequireDefault(require("assert"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function resolvePath(cwd, path) {
  return !(0, _path.isAbsolute)(path) ? (0, _path.join)(cwd, path) : path;
}

function generateStyles(cssVariables, scope) {
  var cssAssign = Object.entries(cssVariables).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return "".concat(addCssVariablesPrefix(k), ": ").concat(v, ";");
  });
  return "".concat(scope, "{").concat(cssAssign.join(''), "}").trim();
}
/**
 * 生成style的cssText
 * @param themes
 * @param attribute
 * @param defaultTheme
 */


function generateAllStyles(themes, scope, attribute, defaultTheme) {
  var cssText = '';
  themes.forEach(function (theme) {
    if (theme.name === defaultTheme) {
      cssText += generateStyles(theme.variables, scope);
    } else {
      cssText += generateStyles(theme.variables, "".concat(scope, "[").concat(attribute, "=").concat(theme.name, "]"));
    }

    cssText += '\n';
  });
  return cssText;
}
/**
 * 强制补齐css变量前面的 `--` 符号
 * @param variable
 */


function addCssVariablesPrefix(variable) {
  return variable.replace(/^[\-]*/, '--');
}
/**
 * filepath => Object
 * @param filepath
 * @param cwd
 */


function parseFilepathThemes(filepath, cwd) {
  var path = resolvePath(cwd, filepath);
  return _globby.default.sync('*.{js,json}', {
    cwd: path
  }).map(function (name) {
    var _name = name.substring(0, name.lastIndexOf('.'));

    var fullpath = (0, _path.join)(path, name);
    var variables = /\.ts$/.test(name) ? requireTSFile(fullpath) : require(fullpath);
    return {
      name: _name,
      variables: variables
    };
  });
}

function requireTSFile(fullPath) {// TODO
}

var defaultConfig = {
  scope: ':root',
  autoDetectDarkMode: null,
  remember: false,
  attribute: 'umi-theme'
};

function _default(api, options) {
  var opts = Object.assign({}, defaultConfig, options);
  var cwd = api.cwd;
  var _opts = opts,
      themes = _opts.themes,
      defaultTheme = _opts.defaultTheme,
      attribute = _opts.attribute,
      scope = _opts.scope,
      remember = _opts.remember,
      autoDetectDarkMode = _opts.autoDetectDarkMode;
  (0, _assert.default)(themes, '[umi-plugin-theme-switch]: option "themes" is reuired');

  var _themes = typeof themes === 'string' ? parseFilepathThemes(themes, cwd) : themes;

  var _defaultTheme = defaultTheme;

  if (!_themes.find(function (t) {
    return t.name === _defaultTheme;
  })) {
    _defaultTheme = _themes[0].name;
  }

  api.onOptionChange(function (newOpts) {
    opts = Object.assign({}, defaultConfig, newOpts);
    api.restart();
  });
  api.addHTMLStyle({
    type: 'text/css',
    content: generateAllStyles(_themes, scope, attribute, _defaultTheme)
  });
  api.chainWebpackConfig(function (config) {
    config.plugin('theme-config').use(require('webpack/lib/DefinePlugin'), [{
      UMI_THEME_ATTRIBUTE: JSON.stringify(attribute),
      UMI_THEME_SCOPE: JSON.stringify(scope)
    }]);
  }); // 记住上一次选中的主题

  var detecteLastTheme = '';

  if (remember) {
    // 检测上一次缓存的主题 并当成默认主题设置 避免默认主题覆盖上一次选中的主题
    detecteLastTheme = "__defaultTheme = window.localStorage.getItem('umi_theme') || __defaultTheme";
  } // 默认主题


  api.addEntryCodeAhead("\n    ;(function(){\n      window['_default_theme'] = ".concat(JSON.stringify(_defaultTheme), ";\n      var __defaultTheme = ").concat(JSON.stringify(_defaultTheme), ";\n      if(typeof localStorage !== 'undefined'){\n        ").concat(detecteLastTheme, "\n        window.localStorage.setItem('umi_theme', __defaultTheme);\n      }\n    })();\n  ")); // 记住上次选择过的主题

  if (remember) {
    api.addEntryCodeAhead("\n      ;(function(){\n        const theme = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_theme') : '';\n        if(!theme) return;\n        [].forEach.call(document.querySelectorAll(UMI_THEME_SCOPE)||[],e=>{\n          e.setAttribute(UMI_THEME_ATTRIBUTE, theme);\n        })\n      })();\n    ");
  } // 自动检测暗色主题，如果remember也为true，则只在页面没有设置过theme的情况下才检测


  if (autoDetectDarkMode && autoDetectDarkMode.enable) {
    api.addEntryCodeAhead("\n      ;(function(){\n        const isBrowserDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;\n        if(!isBrowserDarkMode) return;\n        const remember = ".concat(remember, ";\n        const theme = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_theme') : '';\n        if(!remember || (remember && !theme)){\n          [].forEach.call(document.querySelectorAll(UMI_THEME_SCOPE)||[],e=>{\n            e.setAttribute(UMI_THEME_ATTRIBUTE, \"").concat(autoDetectDarkMode.darkTheme || 'dark', "\");\n          })\n        }\n      })();\n    "));
  }
}