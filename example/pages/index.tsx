import React from 'react';
import styles from './index.css';
import { switchTheme, getTheme } from '../../';

export default function() {
  function switchThemes() {
    const theme = getTheme();
    if (theme === 'dark') {
      switchTheme('light');
    } else {
      switchTheme('dark');
    }
  }

  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <a onClick={switchThemes}>click to switch</a>
    </div>
  );
}
