import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import * as classes from './styles.module.less';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className={classes.container}>
      <Header />
      <section>
        <h1 className={classes.title}>Weather forecast</h1>
        <div className={classes.row}>
          <p className={classes.description}>
            Simple but powerful weather forcasting service based on
            OpenWeatherMap API
          </p>
          <SearchInput
            value={inputValue}
            onSubmit={() => console.log('onSubmit')}
            onChange={setInputValue}
            loading={false}
            options={[]}
          />
        </div>

        <Card />
      </section>
    </div>
  );
};
