"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportCssVariables = supportCssVariables;
exports.isBrowserDarkMode = isBrowserDarkMode;
exports.getScopeElementAll = getScopeElementAll;
exports.getScopeElement = getScopeElement;
exports.getTheme = getTheme;
exports.switchTheme = switchTheme;

/// <reference path="./index.d.ts" />

/**
 * TODO
 */

/**
 * 浏览器是否支持css变量
 */
function supportCssVariables() {
  return typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('--test', '0');
}
/**
 * 浏览器是否在黑暗模式
 * @see https://stackoverflow.com/questions/50840168/how-to-detect-if-the-os-is-in-dark-mode-in-browsers
 */


function isBrowserDarkMode() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getScopeElementAll() {
  if (typeof window === 'undefined') return null;
  return document.querySelectorAll(UMI_THEME_SCOPE);
}

function getScopeElement() {
  if (typeof window === 'undefined') return null;
  return document.querySelector(UMI_THEME_SCOPE);
}
/**
 * 获取当前的主题
 */


function getTheme() {
  if (typeof window === 'undefined') return null;
  var theme = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_theme') : '';
  if (theme) return theme;
  var ele = getScopeElement();
  return ele && ele.getAttribute(UMI_THEME_ATTRIBUTE);
}
/**
 * 切换主题
 * @param name
 */


function switchTheme(name) {
  var ele = getScopeElementAll();

  if (ele && ele.length) {
    [].forEach.call(ele, function (e) {
      e.setAttribute(UMI_THEME_ATTRIBUTE, name);
    });
    window.localStorage.setItem('umi_theme', name || '');
  }
}