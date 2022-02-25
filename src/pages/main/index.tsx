import React, { useState } from 'react';
import { Header } from '../../components/header';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import * as classes from './styles.module.less';
import { cityAPI } from '../../api/city';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [cardsList, setCardsList] = useState([]);

  const onSearchInputChange = async (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const cities = await cityAPI.getCity(value);
      setCityOptions(cities);
    }
  };

  const onAddCity = (data) => {
    setInputValue('');
    setCardsList([...cardsList, data]);
  };

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
            loading={false}
            options={cityOptions}
            onAddCity={onAddCity}
            onChange={onSearchInputChange}
          />
        </div>
        {cardsList.map((item) => (
          <Card key={item.lat} {...item} />
        ))}
      </section>
    </div>
  );
};
