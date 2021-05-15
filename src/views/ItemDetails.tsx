import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import InputField from '../components/inputs/InputField';
import SelectField from '../components/inputs/SelectField';
import SnackBar from '../components/validation/SnackBar';
import Loader from '../components/validation/Loader';

const ItemDetails = () => {
  const { id } = useParams();
  const token = JSON.parse(localStorage.token);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemGender, setItemGender] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemSize, setItemSize] = useState('');
  const [itemSeason, setItemSeason] = useState('');
  const [isValid, setIsValid] = useState(false);
 
  useEffect(() => {
    console.log(typeof itemPrice)
  }, [itemPrice]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/items/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItemTitle(data.itemTitle);
        setItemCategory(data.itemCategory);
        setItemDescription(data.itemDescription);
        setItemPrice(data.itemPrice / 100);
        setItemGender(data.itemGender);
        setItemSize(data.itemSize);
        setItemSeason(data.itemSeason);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
      /* eslint-disable-next-line */
  }, [])

  const genderOptions = {
    'boy': 'Garçon',
    'girl': 'Fille',
  }
  const sizeOptions = {
    '3 months': '3 mois',
    '6 months': '6 mois',
    '9 months': '9 mois',
  }
  const categoryOptions = {
    'tops': 'Hauts',
    'bottoms': 'Bas',
    'sets': 'Ensembles',
  }
  const seasonOptions = {
    'winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
  }

  const handleSaveForm = () => {
    console.log(typeof itemPrice);
    const newItemObj = {
      itemTitle,
      itemCategory,
      itemDescription,
      itemPrice: itemPrice * 100,
      itemGender,
      itemSize,
      itemSeason,
    };
    setIsLoading(true);
    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newItemObj),
    }).then(response => {
      if (!response.ok) {
        throw new Error('This item could not be updated')
      }
      setIsValid(true);
    })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  if (isValid) {
    return (
      <Redirect to="/admin/items" />
    )
  }

  return (
    <>
      <AccountNavigation handleSaveForm={handleSaveForm}>
        {isValid && <SnackBar type="success" message="This item has been updated successfully" state={isValid} setState={setIsValid} />}
        {error && <SnackBar type="error" message="There has been an error getting this item" state={error} setState={setError} />}
        {isLoading && <Loader />}
        <form className="form__container account">
          <h1 className="form__title">Item details</h1>
          <div className="split__container">
            <InputField
              id="title"
              label="Titre"
              type="text"
              value={itemTitle}
              setValue={setItemTitle}
              placeholder="Item title" />
            <label className="description" htmlFor="message">
              Description
              <textarea
                id="description"
                value={itemDescription}
                onChange={(e: any) => setItemDescription(e.target.value)}
                className="form__input"
                placeholder="Enter description" />
            </label>
            <SelectField
              state={itemCategory}
              setState={setItemCategory}
              name="category"
              label="Catégorie"
              options={categoryOptions} />
            <InputField
              id="price"
              step={0.01}
              label="Prix"
              type="number"
              value={itemPrice}
              setValue={setItemPrice}
              placeholder="Item price" />
            <SelectField
              state={itemGender}
              setState={setItemGender}
              name="gender"
              label="Genre"
              options={genderOptions} />
            <SelectField
              state={itemSize}
              setState={setItemSize}
              name="size"
              label="Taille"
              options={sizeOptions} />
            <SelectField
              state={itemSeason}
              setState={setItemSeason}
              name="season"
              label="Saison"
              options={seasonOptions} />
          </div>
        </form>
      </AccountNavigation>
    </>
  )
};

export default ItemDetails;
