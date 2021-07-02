import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteAvatar, uploadAvatar } from '../../actions/user';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../config';
import sizeFormat from '../../utils/sizeFormat';
import './profile.scss';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const space = useSelector((state) => state.user.space);
  const avatar = currentUser?.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo;
  const deleteAvatarHandler = () => {
    dispatch(deleteAvatar());
  };
  const uploadAvatarHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
    e.target.value = '';
  };

  return (
    <div className="profile">
      <img src={avatar} alt="" className="profile__img" />
      <div className="profile__info">
        <span> Hi, {currentUser.email.split('@', 1)}!</span>
        <span>
          You already used {sizeFormat(space)} from {sizeFormat(currentUser.diskSpace)}
        </span>
      </div>
      <div className="profile__btns">
        <button className="profile__del-btn" onClick={deleteAvatarHandler}>
          Delete Avatar
        </button>
        <div className="profile__upload">
          <div className="profile__upload-label">
            Change Avatar
            <input
              className="profile__upload"
              accept="image/*"
              type="file"
              placeholder="Upload avatar"
              onChange={(e) => uploadAvatarHandler(e)}
            />
          </div>
        </div>
      </div>
      <NavLink to="/">
        <button className="profile__back">Back</button>
      </NavLink>
    </div>
  );
}

export default Profile;
