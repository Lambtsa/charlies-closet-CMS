import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ValidationContext } from '../hooks/ValidationContext';
import baseApiUrl from '../helpers/api-service';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import InputField from '../components/inputs/InputField';
import Loader from '../components/validation/Loader';

const BoxDetails = () => {
  const { id } = useParams<any>();
  const { setError, isValid, setIsValid, setValidationMessage } = useContext(ValidationContext);
  const token = JSON.parse(localStorage.token);
  const [isLoading, setIsLoading] = useState(true);
  const [boxTitle, setBoxTitle] = useState('');
  const [boxPrice, setBoxPrice] = useState(0);
  const [priceId, setPriceId] = useState('');
  // const [boxServices, setBoxServices] = useState([])

  useEffect(() => {
    fetch(`${baseApiUrl}/boxes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('There has been an error getting this item');
        }
        return response.json();
      })
      .then(data => {
        setBoxTitle(data.boxTitle);
        setBoxPrice(data.boxPrice);
        setPriceId(data.priceId);
      })
      .catch((error) => {
        setError(true);
        setValidationMessage(error.message)
      })
      .finally(() => setIsLoading(false));
      /* eslint-disable-next-line */
  }, [])

  // const genderOptions = {
  //   'boy': 'Garçon',
  //   'girl': 'Fille',
  // }

  const handleSaveForm = () => {
    const newItemObj = {
      boxTitle,
      boxPrice,
      priceId,
    };
    setIsLoading(true);
    fetch(`${baseApiUrl}/boxes/${id}`, {
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
      <Redirect to="/admin/boxes" />
    )
  }

  return (
    <>
      <AccountNavigation previous="boxes" handleSaveForm={handleSaveForm}>
        {isLoading && <Loader />}
        <form className="form__container account">
          <h1 className="form__title">Item details</h1>
          <div className="split__container">
            <InputField
              id="title"
              label="Titre"
              type="text"
              value={boxTitle}
              setValue={setBoxTitle}
              placeholder="Titre formule" />
            <InputField
              id="title"
              label="Prix"
              type="text"
              value={boxPrice}
              setValue={setBoxPrice}
              placeholder="Prix formule" />
            <InputField
              id="title"
              label="Price Id"
              type="text"
              disabled={true}
              value={priceId}
              setValue={setPriceId}
              placeholder="Stripe price Id" />
          </div>
        </form>
      </AccountNavigation>
    </>
  )
};

export default BoxDetails;
