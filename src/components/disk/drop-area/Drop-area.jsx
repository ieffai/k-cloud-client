import React from 'react';
import './drop-area.scss';

function DropArea({ onDragEnter, onDragLeave, onDrop }) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
      className="drop-area">
      Drag and drop your files here
    </div>
  );
}

export default DropArea;
