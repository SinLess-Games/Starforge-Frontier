import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import {
  configureRunAccessGate,
  installRunSdkSafetyNet,
} from './integrations/rundot';
import './styles/styles.css';

installRunSdkSafetyNet();

configureRunAccessGate({
  autoPromptLogin: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);