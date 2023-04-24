import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import * as Cannon from 'cannon';

import { App } from './App';
import './index.css';

window.CANNON = Cannon;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
