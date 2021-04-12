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
        <p className="itemCard__date">{formattedDate}</p>
        <Link to={`/items/${itemDetails._id}/edit`} className="itemCard__btn">Edit</Link>
        <button className="itemCard__btn" type="button">Delete</button>
      </Link>
    </>
  );
};

export default ItemCard;
