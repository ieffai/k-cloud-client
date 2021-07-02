import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';
import './uploader.scss';
import UploadFile from './UploadFile';

function Uploader() {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();
  const handlerUploaderClose = () => {
    dispatch(hideUploader());
  };
  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Uploads</div>
          <button className="uploader__close" onClick={handlerUploaderClose}>
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
}

export default Uploader;
