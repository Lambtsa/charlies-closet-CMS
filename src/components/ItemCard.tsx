import React from 'react';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  itemObj: {
    _id: string,
    itemTitle: string,
    itemDescription: string,
    itemImages: any[],
    itemGender: string,
    itemSize: string,
    itemCategory: string,
    itemSeason: string,
    itemPrice: string,
  }
}

const ItemCard = (props: ItemCardProps) => {
  const { itemObj } = props;

  const handleDeleteClick = (e: any) => {

  };
  return (
    <>
      <div className="itemcard__container">
        <div className="itemcard__content">
          <img className="itemcard__img" alt={itemObj.itemTitle} src={itemObj.itemImages[0]} />
          <div className="itemcard__main">
            <h3 className="itemcard__title">{itemObj.itemTitle}</h3>
            <p className="itemcard__category">{itemObj.itemCategory}</p>
          </div>
        </div>
        <p className="itemcard__subtitle">{itemObj.itemGender}</p>
        <p className="itemcard__subtitle">{itemObj.itemPrice}</p>
        <div className="itemcard__links">
          <Link className="itemcard__link" to={`/admin/items/${itemObj._id}`}>Edit</Link>
          <button type="button" className="itemcard__link" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </>
  )
};

export default ItemCard;
