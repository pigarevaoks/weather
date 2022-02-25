import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import { cityAPI, ICity } from '../../api/city';
import { weatherAPI } from '../../api/weather';
import * as classes from './styles.module.less';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (cities.length > 0) {
      getWeatherInfo();
    }
  }, [cities]);

  useEffect(() => {
    const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));
    if (cardsFromLocalStorage.length > 0) {
      setCards(cardsFromLocalStorage);
      const citiesFromLocalStorage = cardsFromLocalStorage.map(
        ({ name, coord: { lat, lon }, sys: { country } }) => ({
          name,
          lat,
          lon,
          country,
        })
      );
      setCities(citiesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('cards', JSON.stringify(cards));
    }
  }, [cards]);

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

  const onAddCity = (data: ICity) => {
    setInputValue('');
    setCities([...cities, data]);
  };

  return (
    <div className={classes.container}>
      <Header />
      <section>
        <h1 className={classes.title}>Weather forecast</h1>
        <div className={classes.row}>
          <span className={classes.description}>
            Simple but powerful weather forcasting service based on
            OpenWeatherMap API
          </span>
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
