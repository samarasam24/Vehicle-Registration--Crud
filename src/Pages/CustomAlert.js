import React from 'react';
import '../PageStyles/CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <div className="custom-alert-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default CustomAlert;
