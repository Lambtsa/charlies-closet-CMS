import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ValidationContext } from '../hooks/ValidationContext';
import baseApiUrl from '../helpers/api-service';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import InputField from '../components/inputs/InputField';
import SelectField from '../components/inputs/SelectField';
import Loader from '../components/validation/Loader';
import Images from '../components/inputs/Images';

const ItemDetails = () => {
  const { id } = useParams<any>();
  const { setError, isValid, setIsValid, setValidationMessage } = useContext(ValidationContext);
  const token = JSON.parse(localStorage.token);
  const [isLoading, setIsLoading] = useState(true);
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [itemGender, setItemGender] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemSize, setItemSize] = useState('');
  const [itemSeason, setItemSeason] = useState('');

  useEffect(() => {
    fetch(`${baseApiUrl}/items/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('There has been an error getting this item');
        }
        return response.json();
      })
      .then(data => {
        setItemTitle(data.itemTitle);
        setItemCategory(data.itemCategory);
        setItemDescription(data.itemDescription);
        setItemPrice(data.itemPrice / 100);
        setItemGender(data.itemGender);
        setItemSize(data.itemSize);
        setItemSeason(data.itemSeason);
        setItemImages(data.itemImages);
      })
      .catch((error) => {
        setError(true);
        setValidationMessage(error.message)
      })
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
    fetch(`${baseApiUrl}/items/${id}`, {
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
      setValidationMessage('The item has successfully been updated.')
      setIsValid(true);
    })
      .catch(() => {
        setValidationMessage('There has been an error in updating this item. Please try again.')
        setError(true);
        setIsLoading(false);
      });
  };

  if (isValid) {
    return (
      <Redirect to="/admin/items" />
    )
  }

  return (
    <>
      <AccountNavigation previous="items" handleSaveForm={handleSaveForm}>
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
            <Images state={{ itemImages, setItemImages }} itemTitle={itemTitle} />
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
