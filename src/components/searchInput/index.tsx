import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Icon, EIconName } from 'components/icon';
import { Loader } from 'components/loader';
import { ICity } from 'api/city';
import { EmtyOption } from './EmtyOption';
import { Option } from './Option';
import * as classes from './styles.module.less';

export const EVENT_KEY_CODES = {
	ARROW_DOWN: 'ArrowDown',
	ARROW_UP: 'ArrowUp',
	ESC: 'Escape',
};

interface ISearchInputProps {
	value: string;
	loading: boolean;
	options: ICity[];
	onChange: (value: string) => void;
	onSelectCity: (data: ICity) => void;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
	value,
	loading,
	options,
	onChange,
	onSelectCity,
}) => {
	const searchInputEl = useRef(null);
	const listEl = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		searchInputEl.current.addEventListener('keydown', handleKeyDown);
		return () => {
			searchInputEl.current.removeEventListener('keydown', handleKeyDown);
		};
	}, [searchInputEl]);

	useEffect(() => {
		if (value.length > 0) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [value]);

	const handleKeyDown = (event: KeyboardEvent): void => {
		switch (event.key) {
			case EVENT_KEY_CODES.ARROW_UP:
				return handleArrowUp();
			case EVENT_KEY_CODES.ARROW_DOWN:
				return handleArrowDown();
			case EVENT_KEY_CODES.ESC:
				return setIsOpen(false);
		}
	};

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
		onChange(e.target.value);

	const onOptionSelect = (option: ICity) => {
		setIsOpen(false);
		onSelectCity(option);
	};

	const handleArrowDown = () => {
		const focusableElements = listEl.current.children;
		const focusable = [...focusableElements];
		const index = focusable.indexOf(document.activeElement);
		let nextIndex = 0;

		nextIndex = index + 1 < focusable.length ? index + 1 : index;
		focusableElements[nextIndex].focus();
	};

	const handleArrowUp = () => {
		const focusableElements = listEl.current.children;
		const focusable = [...focusableElements];
		const index = focusable.indexOf(document.activeElement);
		let nextIndex = 0;

		nextIndex = index > 0 ? index - 1 : 0;
		focusableElements[nextIndex].focus();
	};

	const renderContent = () => {
		const isEmpty = !loading && options.length === 0;

		if (loading) {
			return <Loader />;
		} else if (isEmpty) {
			return <EmtyOption city={value} />;
		} else {
			return options.map((item) => (
				<Option
					key={`${item.lat}-${item.lon}`}
					{...item}
					onSelect={onOptionSelect}
				/>
			));
		}
	};

	return (
		<div className={classes.container} ref={searchInputEl}>
			<div className={classes.dropdown}>
				<input
					type="text"
					value={value}
					onChange={onInputChange}
					placeholder="Search"
					className={classes.input}
				/>
				<div className={classes.icon}>
					<Icon name={EIconName.Search} />
				</div>
			</div>
			{isOpen && (
				<div className={classes.list} ref={listEl}>
					{renderContent()}
				</div>
			)}
		</div>
	);
};
