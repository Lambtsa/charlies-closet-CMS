import React, { useEffect, useState } from 'react';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import ItemCard from '../components/ItemCard';
import Loader from '../components/validation/Loader';
import SnackBar from '../components/validation/SnackBar';

const Items = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <AccountNavigation>
        {error && <SnackBar type="error" message="There has been an error getting the items" state={error} setState={setError} />}
        {isLoading && <Loader />}
        <div className="list__container">
          <h1 className="form__title">Items</h1>
          {!isLoading && items.length > 0 && items.map((item: any) => (
            <ItemCard key={item._id} itemObj={item} />
          ))}
        </div>
      </AccountNavigation>
    </>
  )
};

export default Items;
