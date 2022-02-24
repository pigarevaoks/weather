import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Icon, EIconName } from '../icon';
import { Loader } from '../Loader';
import { ICity } from '../../api/city';
import { EmtyCard } from './EmtyCard';
import { Card } from './Card';
import * as classes from './styles.module.less';

interface ISearchInputProps {
  value: string;
  loading: boolean;
  options: ICity[];
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  loading,
  options,
  onChange,
  onSubmit,
}) => {
  const inputEl = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    inputEl.current.addEventListener('focusin', () => setIsFocused(true));
    inputEl.current.addEventListener('focusout', () => setIsFocused(false));
    return () => {
      inputEl.current.removeEventListener('focusin', () => setIsFocused(true));
      inputEl.current.addEventListener('focusout', () => setIsFocused(false));
    };
  }, [inputEl.current]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const isTyping = value.length > 0;
  const isEmpty = options.length === 0;

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <div className={classes.input}>
        <input
          type="text"
          ref={inputEl}
          value={value}
          onChange={onInputChange}
          placeholder="Search"
          className={classes.searchInput}
        />
        <button className={classes.searchButton} type="submit">
          <Icon name={EIconName.Search} />
        </button>
      </div>
      {isFocused && isTyping && (
        <div className={classes.list}>
          {loading && <Loader />}
          {isEmpty && <EmtyCard city={value} />}
          {options.map(({ name, country, lat, lon }) => (
            <Card key={lat} city={name} code={country} lat={lat} lon={lon} />
          ))}
        </div>
      )}
    </form>
  );
};
