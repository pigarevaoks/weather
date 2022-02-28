import React from 'react';
import { Card } from 'components/card';
import { ICard } from 'api/weather';
import * as classes from './styles.module.less';

export interface ICardsListProps {
  cards: ICard[];
  onDeleteCard: (id: number) => void;
}

export const CardsList: React.FC<ICardsListProps> = ({
  cards,
  onDeleteCard,
}) => {
  const isEmptyList = cards.length === 0;

  return (
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
  );
};
