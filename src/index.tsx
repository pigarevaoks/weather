import * as React from 'react';
import { render } from 'react-dom';
import { Hello } from './components/Hello';

const App = () => {
  return (
    <div>
      <p>Oksana best girl in the world</p>
      <Hello compiler="Parcel" framework="React" />
    </div>
  );
};

render(<App />, document.getElementById('app'));
