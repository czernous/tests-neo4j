import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';
import { GeneratorProvider } from './generator-state/gnerator.provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GeneratorProvider>
      <App />
    </GeneratorProvider>
  </React.StrictMode>,
);
