import React, { useState } from 'react';
import '../PageStyles/Popup.css';
import { useDispatch } from 'react-redux';
import { confirmDelete } from './Action';

const PopupMessage = () => {
  
 

  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsVisible(false);
    
  };

  const deleteDetail = () => {
    dispatch( confirmDelete() );
  }

  return (
    <>
      {isVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <p>Are you sure want to delete this?</p>
            <button onClick={handleClose} >Cancel</button>
            <button onClick={deleteDetail}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMessage;
