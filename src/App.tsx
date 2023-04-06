import { FC } from 'react';

import { Playground } from './features/Playground';
import styles from './App.module.css';
import { SettingsMenu } from './features/SettingsMenu';

export const App: FC = () => (
  <div className={styles.root}>
    <Playground />
    <SettingsMenu />
  </div>
);
