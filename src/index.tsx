import * as React from 'react';
import { render } from 'react-dom';
import { Card } from './components/Card';
import { Loader } from './components/Loader';
import * as classes from './styles/styles.less';

const App = () => {
  return (
    <div className={classes.container}>
      <h1>Weather forecast</h1>
      <Loader />
      <Card />
    </div>
  );
};

render(<App />, document.getElementById('app'));
