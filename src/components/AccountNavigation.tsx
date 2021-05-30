import React, { useState, useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';
import { UserContext } from '../hooks/UserContext';

interface AccountType {
  children: any,
  previous?: string,
  handleSaveForm?: (e: any) => void,
}

const AccountNavigation = (props: AccountType) => {
  const { children, handleSaveForm, previous } = props;
  const { logoutUser } = useAuth();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleBtnClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCancelBtn = () => {
    if (previous) {
      history.push(`/admin/${previous}`);
    }
  };
  
  return (
    <>
      <header className="header account">
        <div className="header__container">
          <Link to="/admin/dashboard"><h2 className="header__logo">Charlie's closet</h2></Link>
          <button onClick={logoutUser} className="header__logout" type="button">Se déconnecter</button>
          <button type="button" onClick={handleBtnClick} className="header__icon" ><FontAwesomeIcon className="burger fixed" icon={faHamburger} /></button>
        </div>
      </header>
      <section className="account__container">
        <div className={`account__navigation ${isClicked ? 'clicked' : ''}`}>
          <div className="account__profile">
            <h3 className="profile__icon">{`${user.userDetails.first_name[0]} ${user.userDetails.last_name[0]}`}</h3>
            <div className="profile__details">
              <h3 className="profile__title">{`${user.userDetails.first_name} ${user.userDetails.last_name}`}</h3>
              <p className="profile__subtitle">{user.email}</p>
            </div>
          </div>
          <nav className="account__links">
            <NavLink activeClassName="account__link--selected" className="account__link" to="/admin/dashboard">Dashboard</NavLink>
            <NavLink activeClassName="account__link--selected" className="account__link" to="/admin/users">Users</NavLink>
            <NavLink activeClassName="account__link--selected" className="account__link" to="/admin/items">Items</NavLink>
            <NavLink activeClassName="account__link--selected" className="account__link" to="/admin/boxes">Boxes</NavLink>
            <button onClick={handleBtnClick} type="button" className="header__close"><FontAwesomeIcon icon={faTimes} /></button>
          </nav>
          <button onClick={logoutUser} className="account__logout" type="button">Se déconnecter</button>
        </div>
        <div className="account__content">
          {children}
            <div className="btn__container account">
              {previous && <button onClick={handleCancelBtn} className="form__btn back" type="button">Cancel</button>}
              {handleSaveForm && (
                <button onClick={handleSaveForm} className="form__btn" type="submit">Save</button>
              )}
            </div>
        </div>
      </section>
    </>
  );
};

export default AccountNavigation;
