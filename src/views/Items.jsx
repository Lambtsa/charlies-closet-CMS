import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAllItems } from '../modules/api-service';

import ItemCard from '../components/ItemCard';
import SnackBar from '../components/SnackBar';
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';

const Items = () => {
  const history = useHistory();
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const response = await getAllItems();
        if (!response.ok) {
          setItemList([]);
          setIsLoading(false);
          setError(true);
        } else {
          const data = await response.json();
          setItemList(data);
          setIsLoading(false);
          setError(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <SideBar />
      {isLoading && <Loader />}
      {!isLoading
        && (
        <section className="content__container">
          {!error && !isLoading && itemList
            && itemList.map(item => <ItemCard itemDetails={item} key={item._id} />)}
          <div className="btn__container">
            <button className="btn btn__secondary" type="button" onClick={() => history.push('/')}>Back</button>
            <Link className="btn btn__primary" to="/new-item">Add new</Link>
          </div>
          {error && <SnackBar state={error} setState={setError} type="error" message="There are no items yet." />}
        </section>
        )}
    </>
  );
};

export default Items;
