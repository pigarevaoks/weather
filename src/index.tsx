import * as React from 'react';
import { render } from 'react-dom';
import { Card } from './components/Card';
import * as classes from './styles/styles.less';

const App = () => {
  return (
    <div className={classes.container}>
      <h1>Weather forecast</h1>
      <Card />
    </div>
  );
};

render(<App />, document.getElementById('app'));
