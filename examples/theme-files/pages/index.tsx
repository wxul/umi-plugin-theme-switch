import React, { Component } from 'react';
import styles from './index.css';
import { switchTheme, getTheme } from 'umi-plugin-theme-switch';

export default class Index extends Component {
  switchThemes = () => {
    const theme = getTheme();
    if (theme === 'dark') {
      switchTheme('light');
    } else {
      switchTheme('dark');
    }
  };
  render() {
    return (
      <div className={styles.normal}>
        <span onClick={this.switchThemes}>Click here to switch theme.</span>
      </div>
    );
  }
}
