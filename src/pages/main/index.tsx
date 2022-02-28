import React, { useState, useEffect } from 'react';
import { Header } from 'components/header';
import { SearchInput } from 'components/searchInput';
import { CardsList } from 'components/cardsList';
import { cityAPI, ICity } from 'api/city';
import { weatherAPI } from 'api/weather';
import { useDebounce } from 'hooks';
import * as classes from './styles.module.less';

export const Main = () => {
  const [searchValue, setSearchValue] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [cards, setCards] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [isSearching, setIsSearching] = useState(false);

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
    if (debouncedSearchValue) {
      setIsSearching(true);
      cityAPI.getCity(debouncedSearchValue).then((results) => {
        setIsSearching(false);
        setCityOptions(results);
      });
    } else {
      setCityOptions([]);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (cities.length > 0) {
      getWeatherInfo();
    }
  }, [cities]);

  useEffect(() => {
    if (cards?.length > 0) {
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

  const onSelectCity = (data: ICity) => {
    setSearchValue('');
    const isDuplicate = cities.find((item) => item.name === data.name);

    if (isDuplicate) {
      alert('Сity already added!');
    } else {
      setCities((prevCities) => [...prevCities, data]);
    }
  };

  const onDeleteCard = (id: number) => {
    const newCards = cards.filter((item) => item.id !== id);

    setCards(newCards);
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
            value={searchValue}
            loading={isSearching}
            options={cityOptions}
            onSelectCity={onSelectCity}
            onChange={setSearchValue}
          />
        </div>
        <CardsList cards={cards} onDeleteCard={onDeleteCard} />
      </section>
    </div>
  );
};
