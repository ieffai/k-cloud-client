import React from 'react';
import './fileList.scss';
import File from './file/File';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function FileList() {
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);

  if (fileView === 'plate') {
    return (
      <div className="fileplate">
        {files.length ? (
          files.map((file) => <File key={file._id} file={file} />)
        ) : (
          <span className="empty">
            It's empty for now, add files, folders or drag and drop files right here
          </span>
        )}
      </div>
    );
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">File name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>

        {files.length ? (
          <TransitionGroup>
            {files.map((file) => (
              <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                <File file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <span className="empty">
            It's empty for now, add files, folders or drag and drop files right here
          </span>
        )}
      </div>
    );
  }
}

export default FileList;
