import React from 'react';

interface PopupProps {
  handleCancelBtn: () => void,
  handleValidateBtn: (id: string) => void,
  cancelText: string,
  validateText: string,
  popupMessage: string,
  id: string,
}

const PopupModal = (props: PopupProps) => {
  const {
    handleCancelBtn,
    handleValidateBtn,
    cancelText,
    validateText,
    popupMessage,
    id,
  } = props;

  return (
    <>
      <div className="popup__container">
        <div className="popup__modal">
          <p className="popup__message">{popupMessage}</p>
          <div className="btn__container">
            <button onClick={handleCancelBtn} className="form__btn back" type="button">{cancelText}</button>
            <button onClick={() => handleValidateBtn(id)} className="form__btn" type="button">{validateText}</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default PopupModal;
