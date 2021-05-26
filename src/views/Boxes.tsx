import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { ValidationContext } from '../hooks/ValidationContext';
import baseApiUrl from '../helpers/api-service';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import PopupModal from '../components/PopupModal';

const Boxes = () => {
  const [boxes, setBoxes] = useState<any>([]);
  const { setError, setIsValid, setValidationMessage } = useContext(ValidationContext);
  const token = JSON.parse(localStorage.token);
  const [isLoading, setIsLoading] = useState(true);
  const [checkValidation, setCheckValidation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetch(`${baseApiUrl}/boxes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('There has been an error getting the users');
        }
        return response.json();
      })
      .then(data => setBoxes(data))
      .catch((error) => {
        setError(true);
        setValidationMessage(error.message);
      })
      .finally(() => setIsLoading(false));
      /* eslint-disable-next-line */
  }, []);

  const filters: any = {
    name: 'Par nom',
    price: 'Par prix',
  }

  const handleDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setCheckValidation(true);
  };

  const handleCancelBtn = () => {
    setCheckValidation(false);
  }

  const handleValidateBtn = (id: string) => {
    // setIsLoading(true);
    // fetch(`${baseApiUrl}/boxes/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   }
    // }).then(response => {
    //     if (!response.ok) {
    //       throw new Error('There has been an issue deleting this item');
    //     }
    //     setIsValid(true);
    //     setValidationMessage('Item deleted successfully');
    //   })
    //   .catch((error) => {
    //     setError(true);
    //     setValidationMessage(error.message)
    //   })
    //   .finally(() => setIsLoading(false))
    // setCheckValidation(false);
  }

  const handleFilterClick = (filter: string) => {
    const filteredBoxes = boxes.sort((a: any, b: any) => {
      setActiveFilter(filter);
      if (filter === 'price') {
        return a.boxPrice = b.boxPrice;
      }
      if (filter === 'name') {
        return a.boxTitle.localeCompare(b.boxTitle);
      }
      /* not sure about this */
      return a - b;
    });
    setBoxes(filteredBoxes);
  };

  return (
    <>
      <AccountNavigation>
        <div className="list__container">
          <h1 className="form__title">Users</h1>
          <div className="filters__container">
            <div className="filters">
              {Object.keys(filters).map((filter: string, index: number) => (
                <button
                  key={index}
                  className={`filters__btn ${activeFilter === filter ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleFilterClick(filter)}>
                    {`${filters[filter]}`}
                </button>
              ))}
            </div>
          </div>
          {boxes.length > 0 && boxes.map((box: any) => (
            <div key={box._id} className="itemcard__container boxes">
              <div className="itemcard__content">
                <div>
                  <h3 className="itemcard__title">{box.boxTitle}</h3>
                  <p className="itemcard__category email">{box.priceId}</p>
                </div>
              </div>
              <p className="itemcard__subtitle price">{`${box.boxPrice} €`}</p>
              <div className="itemcard__links">
                <Link className="itemcard__link" to={`/admin/boxes/${box.priceId}`}>Edit</Link>
                <button type="button" className="itemcard__link" onClick={() => handleDeleteClick(box._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {checkValidation && (
          <PopupModal
            id={deleteItemId}
            handleCancelBtn={handleCancelBtn}
            handleValidateBtn={handleValidateBtn}
            cancelText="cancel"
            validateText="confirm"
            popupMessage="Are you sure you want to delete this item?" />
        )}
      </AccountNavigation>
    </>
  )
};

export default Boxes;
