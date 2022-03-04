import React, { useState, useEffect } from 'react';
import { Header } from 'components/header';
import { SearchInput } from 'components/searchInput';
import { CardsList } from 'components/cardsList';
import { weatherAPI, ICard } from 'api/weather';
import { cityAPI, ICity } from 'api/city';
import * as classes from './styles.module.less';

export const Main = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [cityOptions, setCityOptions] = useState<ICity[]>([]);
	const [cards, setCards] = useState<ICard[]>([]);
	const [isSearching, setIsSearching] = useState<boolean>(false);

	useEffect(() => {
		const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));
		if (cardsFromLocalStorage?.length > 0) {
			setCards(cardsFromLocalStorage);
		}
	}, []);

	useEffect(() => {
		if (searchValue) {
			setIsSearching(true);
			cityAPI.getCity(searchValue).then((results) => {
				setIsSearching(false);
				setCityOptions(results);
			});
		} else {
			setCityOptions([]);
		}
	}, [searchValue]);

	useEffect(() => {
		if (cards?.length > 0) {
			localStorage.setItem('cards', JSON.stringify(cards));
		} else {
			localStorage.removeItem('cards');
		}
	}, [cards]);

	const onSelectCity = async (data: ICity) => {
		setSearchValue('');
		const result = await weatherAPI.getWeather(data.lat, data.lon);
		const isDuplicate = cards.find((item) => item.id === result.id);

		if (isDuplicate) {
			alert('Сity already added!');
		} else {
			setCards((prevCards) => [...prevCards, result]);
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
