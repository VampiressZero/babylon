import { FC } from 'react';

import { Playground } from 'features/Playground';

import styles from './App.module.css';

export const App: FC = () => (
  <div className={styles.root}>
    <Playground />
  </div>
);
