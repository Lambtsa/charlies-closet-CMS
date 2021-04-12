import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ itemDetails }) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(itemDetails.itemCreationDateUTC).toLocaleDateString('en-uk', dateOptions);

  return (
    <>
      <Link to={`/items/${itemDetails._id}`} className="itemCard">
        <h3 className="itemCard__title">{itemDetails.itemTitle}</h3>
        <p className="itemCard__date">{itemDetails.itemCategory}</p>
        <p className="itemCard__date">{formattedDate}</p>
      </Link>
    </>
  );
};

export default ItemCard;
