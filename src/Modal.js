import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#fff', // White background
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  padding: '20px', // Adding padding for content spacing
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Adding a slight shadow for depth
  borderRadius: '8px', // Rounded corners for a softer look
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black overlay
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
