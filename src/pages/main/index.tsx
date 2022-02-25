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

    if (cardsFromLocalStorage?.length > 0) {
      setCards(cardsFromLocalStorage);
      const citiesFromLocalStorage = cardsFromLocalStorage.map((item) => ({
        name: item.name,
        lat: item.coord.lat,
        lon: item.coord.lon,
        country: item.sys.country,
      }));

      setCities(citiesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('cards', JSON.stringify(cards));
    } else {
      localStorage.removeItem('cards');
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

  const onSelectCity = (data: ICity) => {
    setInputValue('');
    setCities([...cities, data]);
  };

  const onDeleteCard = (id: number) => {
    const newCards = cards.filter((item) => item.id !== id);

    setCards(newCards);
  };

  const isEmptyList = cards.length === 0;
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
            onSelectCity={onSelectCity}
            onChange={onSearchInputChange}
          />
        </div>
        <div className={classes.list}>
          {isEmptyList && (
            <div className={classes.emptyList}>
              List is empty, please select city
            </div>
          )}
          {cards.map((item) => (
            <Card key={item.id} {...item} onDeleteCard={onDeleteCard} />
          ))}
        </div>
      </section>
    </div>
  );
};
