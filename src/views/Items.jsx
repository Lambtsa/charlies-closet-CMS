import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems } from '../modules/api-service';

import ItemCard from '../components/ItemCard';
import SnackBar from '../components/SnackBar';

const Items = () => {
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getAllItems();
      if (!response.ok) {
        setItemList([]);
        setError(true);
      } else {
        const data = await response.json();
        console.log(data);
        setItemList(data);
      }
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <>
      {!error && itemList && itemList.map(item => <ItemCard itemDetails={item} key={item._id} />)}
      <div className="btn__container">
        <Link className="btn btn__primary" to="/new-item">Add new</Link>
      </div>
      {error && <SnackBar state={error} setState={setError} type="error" message="There are no items yet." />}
    </>
  );
};

export default Items;
