import React from 'react';
import { render } from 'react-dom';
import { Main } from './pages/main';

const App = () => <Main />;

render(<App />, document.getElementById('app'));
