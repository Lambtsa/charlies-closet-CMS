import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../modules/api-service';

const ItemsDetails = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getItemById(id);
      const data = await response.json();
      setItemDetails(data);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <>
      {error && <p>There is an error</p>}
      {!error && (
        <section>
          <h2>{itemDetails.itemTitle}</h2>
        </section>
      )}
    </>
  );
};

export default ItemsDetails;
