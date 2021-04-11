import React, { useEffect, useState } from 'react';
import { getAllItems } from '../modules/api-service';

import ItemCard from '../components/ItemCard';

const Items = () => {
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getAllItems();
      console.log(response);
      const data = await response.json();
      console.log(data);
      setItemList(data);
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <>
      {!error && itemList.map(item => <ItemCard itemDetails={item} key={item._id} />)}
      {error && <p>There has been an error</p>}
    </>
  );
};

export default Items;
