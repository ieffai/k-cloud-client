import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input';

function Popup({ type }) {
  const [dirName, setDirName] = React.useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(setPopupDisplay('none'));
    setDirName('');
  };

  const createHandler = () => {
    dispatch(createDir(currentDir, dirName));
    closePopup();
  };

  const sendToReg = () => {
    <Redirect to="/registration" />;
  };

  if (type === 'upload') {
    return (
      <div className="popup" onClick={closePopup} style={{ display: popupDisplay }}>
        <div className="popup__content" onClick={(event) => event.stopPropagation()}>
          <div className="popup__header">
            <div className="popup__title">Create new folder</div>
            <button className="popup__close" onClick={closePopup}>
              X
            </button>
          </div>
          <Input
            type="text"
            placeholder="Type folder name..."
            value={dirName}
            setValue={setDirName}
          />
          <button className="popup__create" onClick={createHandler}>
            Create folder
          </button>
        </div>
      </div>
    );
  }
  if (type === 'info') {
    return (
      <div className="popup" onClick={closePopup} style={{ display: popupDisplay }}>
        <div className="popup__content" onClick={(event) => event.stopPropagation()}>
          <div className="popup__header">
            <div className="popup__title">ERROR</div>
            <button className="popup__close" onClick={closePopup}>
              X
            </button>
          </div>
          <p className="popup__message">Plaese login</p>
          <button className="popup__create" onClick={sendToReg}>
            Action
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
