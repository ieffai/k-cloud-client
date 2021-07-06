import React from 'react';
import './navbar.scss';
import Logo from '../../assets/img/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/user';
import { searchFiles } from '../../actions/file';
import { getFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const [searchName, setSearchName] = React.useState('');
  const [searchTimeout, setSearchTimeout] = React.useState(false);
  const avatar = currentUser?.avatar
    ? `${API_URL + 'api/files/' + currentUser.id + '\\' + currentUser.avatar}`
    : avatarLogo;

  const logoutHandler = () => {
    dispatch(logout());
  };
  const searchChangeHandler = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };
  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/">
          <img src={Logo} alt="" className="navbar__logo" />
        </NavLink>
        <div className="navbar__header">kCLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={searchChangeHandler}
            className="navbar__search"
            type="text"
            placeholder="Search for something..."
          />
        )}

        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Log In</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Create account</NavLink>
          </div>
        )}

        {isAuth && (
          <NavLink to="/profile" className="navbar__user-info">
            <div className="navbar__profile-container">
              <span className="navbar__name">{currentUser.email.split('@', 1)}</span>
              <img src={avatar} alt="" className="navbar__avatar" />
            </div>
          </NavLink>
        )}

        {isAuth && (
          <div className="navbar__exit" onClick={logoutHandler}>
            Exit
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
