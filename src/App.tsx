import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

import { Playground } from 'features/Playground';

import styles from './App.module.css';

export const App: FC = () => (
  <Provider store={store}>
    <div className={styles.root}>
      <Playground />
    </div>
  </Provider>
);
