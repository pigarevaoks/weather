import React from 'react';
import { render } from 'react-dom';
import { Main } from './pages/main';
import { ErrorBoundary } from './components/errorBoundary';

const App = () => (
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>
);

render(<App />, document.getElementById('app'));
