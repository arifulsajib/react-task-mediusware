import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ContactsList = ({ number }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className="my-2" onClick={handleShow}>
        {number?.phone}
      </li>
      {/* Details modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>{number?.country?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{number?.phone}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactsList;
