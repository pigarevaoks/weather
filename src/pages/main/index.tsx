import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import * as classes from './styles.module.less';
import { cityAPI } from '../../api/city';
import { weatherAPI } from '../../api/weather';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getWeatherInfo();
  }, [cities]);

  const getWeatherInfo = async () => {
    const result = await Promise.all(
      cities.map(({ lat, lon }) => weatherAPI.getWeather(lat, lon))
    );
    setCards(result);
  };

  const onSearchInputChange = async (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const cities = await cityAPI.getCity(value);
      setCityOptions(cities);
    }
  };

  const onAddCity = (data) => {
    setInputValue('');
    setCities([...cities, data]);
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
        <div className={classes.list}>
          {cards.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
