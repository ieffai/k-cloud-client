import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import './file.scss';
import dirLogo from '../../../../assets/img/folder.png';
import fileLogo from '../../../../assets/img/file.png';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

function File({ file }) {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);
  function openDirHandler() {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }

  const downloadHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  if (fileView === 'list') {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && (
          <button onClick={downloadHandler} className="file__btn file__download" />
        )}
        <button onClick={deleteHandler} className="file__btn file__delete" />
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img" />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button onClick={downloadHandler} className="file-plate__btn file-plate__download" />
          )}
          <button onClick={deleteHandler} className="file-plate__btn file-plate__delete" />
        </div>
      </div>
    );
  }
}

export default File;
