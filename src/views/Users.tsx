import React, { useEffect, useState, useContext } from 'react';
import { ValidationContext } from '../hooks/ValidationContext';
import baseApiUrl from '../helpers/api-service';

/*
  Components
*/
import AccountNavigation from '../components/AccountNavigation';
import ItemCard from '../components/ItemCard';
import Loader from '../components/validation/Loader';
import PopupModal from '../components/PopupModal';

const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const { setError, setIsValid, setValidationMessage } = useContext(ValidationContext);
  const token = JSON.parse(localStorage.token);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetch(`${baseApiUrl}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('There has been an error getting the users');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch((error) => {
        setError(true);
        setValidationMessage(error.message);
      })
      .finally(() => setIsLoading(false));
      /* eslint-disable-next-line */
  }, []);

  const filters: any = {
    name: 'Par nom',
    status: 'Par étape',
  }

  const handleFilterClick = (filter: string) => {
    const filteredUsers = users.sort((a: any, b: any) => {
      setActiveFilter(filter);
      if (filter === 'name') {
        return a.userDetails.last_name.localeCompare(b.userDetails.last_name);
      }
      if (filter === 'status') {
        return a.onboardingProgress.step.localeCompare(b.onboardingProgress.step);
      }
    });
    setUsers(filteredUsers);
  };

  return (
    <>
      <AccountNavigation>
        {isLoading && <Loader />}
        {!isLoading && (
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
            {users.length > 0 && users.map((user: any) => (
              <div key={user._id} className="itemcard__container">
                <div className="itemcard__content">
                  <div>
                    <h3 className="itemcard__title">{`${user.userDetails.first_name} ${user.userDetails.last_name}`}</h3>
                    <p className="itemcard__category email">{user.email}</p>
                  </div>
                </div>
                <p className="itemcard__subtitle">{`${user.userDetails.telephone ? user.userDetails.telephone : '-'}`}</p>
                <p className="itemcard__subtitle step">{user.onboardingProgress.step}</p>
                <p className={`itemcard__paymentStatus ${user.onboardingProgress.finished ? 'paid' : 'prospect'}`}>{`${user.onboardingProgress.finished ? 'payé' : 'lead'}`}</p>
              </div>
            ))}
          </div>
        )}
      </AccountNavigation>
    </>
  )
};

export default Users;
