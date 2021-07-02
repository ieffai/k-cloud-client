import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { FileList, Uploader, Select, Loader, DropArea } from './index';
import Popup from './Popup';
import './disk.scss';
import { setCurrentDir, setPopupDisplay, setView } from '../../reducers/fileReducer';

function Disk() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const viewType = useSelector((state) => state.files.view);
  const [dragEnter, setDragEnter] = React.useState(false);
  const [sort, setSort] = React.useState('type');

  React.useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }
  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const viewPlateHandler = () => {
    dispatch(setView('plate'));
  };
  const viewListHandler = () => {
    dispatch(setView('list'));
  };

  if (loader) {
    return <Loader />;
  }

  if (dragEnter) {
    return (
      <DropArea
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
      />
    );
  }

  return (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      <div className="disk__btns">
        {currentDir && (
          <button className="disk__btn" onClick={() => backClickHandler()}>
            Back
          </button>
        )}
        <button className="disk__btn" onClick={() => showPopupHandler()}>
          Create folder
        </button>

        <div className="disk__upload">
          <div className="disk__upload-label" htmlFor="disk__upload-input">
            {' '}
            Upload
            <input
              multiple={true}
              onChange={(event) => fileUploadHandler(event)}
              type="file"
              id="disk__upload-input"
            />
          </div>
        </div>
        <Select value={sort} onChange={sortHandler} />
        {viewType === 'list' && (
          <button className="disk__plate" onClick={viewPlateHandler}></button>
        )}
        {viewType === 'plate' && (
          <button className="disk__list " onClick={viewListHandler}></button>
        )}
      </div>
      <FileList />
      <Popup type={'upload'} />
      <Uploader />
    </div>
  );
}

export default Disk;
