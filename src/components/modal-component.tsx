import React from "react";
import "../assets/styles/ContactModal.css";

interface ModalProps {
  name: string;
  email: string;
  company: string;
  username: string;
  website: string;
  phone: string;
  addressCity: string;
  addressStreet: string;
  addressSuite: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  name,
  email,
  company,
  username,
  website,
  phone,
  addressCity,
  addressStreet,
  addressSuite,
  isOpen,
  onClose,
}) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleInsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleOutsideClick}
    >
      <div className="modal-card" onClick={handleInsideClick}>
        <div className="modal-header">
          <div className="model-header-info">
            <div className="modal-title"> {name}</div>
            <div className="modal-description">{company} </div>
          </div>
          <i
            id="close-icon"
            className="fa-solid fa-xmark icon"
            onClick={onClose}
          ></i>
        </div>
        <div className="modal-content">
          <div className="column modal-content--username">
            Username:<span> {username}</span>
          </div>
          <div className="column modal-description--address">
            Address: <span> {addressCity}</span> <span> {addressStreet}</span>{" "}
            <span> {addressSuite}</span>
          </div>
          <div className="column modal-title--phone">
            Phone: <span> {phone}</span>
          </div>
          <div className="column modal-description-web">
            <div className="modal-description--email">
              Email: <span> {email}</span>
            </div>
            <div className="modal-title--website">
              Website: <span> {website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
