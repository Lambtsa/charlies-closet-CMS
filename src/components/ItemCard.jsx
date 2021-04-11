import React from 'react';

const ItemCard = ({ itemDetails }) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(itemDetails.itemCreationDateUTC).toLocaleDateString('en-uk', dateOptions);

  return (
    <>
      <button className="itemCard" type="button">
        <img className="itemCard__img" src={itemDetails.itemImages[0]} alt={itemDetails.itemTitle} />
        <div className="itemCard__details">
          <h3 className="itemCard__title">{itemDetails.itemTitle}</h3>
          <p className="itemCard__subtitle">{itemDetails.itemDescription}</p>
        </div>
        <p className="itemCard__date">{formattedDate}</p>
      </button>
    </>
  );
};

export default ItemCard;
