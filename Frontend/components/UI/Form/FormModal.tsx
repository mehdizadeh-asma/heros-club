import React, { useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import SubmitButton from "../Form/SubmitButton";

interface PropsType {
  Title: string;
  HeaderIcon: IconDefinition;
  children: React.ReactNode;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

interface ForwardRefHandle {
  Show: () => void;
  Hide: () => void;
}

const FormModal = React.forwardRef<ForwardRefHandle, PropsType>((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  useImperativeHandle(ref, () => ({
    Show: () => {
      setShowModal(true);
    },
    Hide: () => setShowModal(false),
  }));

  async function SubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    props.onSaveClick();
    setValidated(false);
  }

  function CancelHandler() {
    setValidated(false);
    props.onCancelClick();
  }

  return (
    <div className="row">
      <Modal show={showModal}>
        <div className="row d-flex flex-column border border-1  rounded-4 shadow bg-white">
          <div className="row  d-inline-flex  w-100 justify-content-center position-relative ">
            <div className="mx-2 position-absolute translate-middle top-0 start-50  h-75">
              <div className="col-2  rounded-3 ModalBadge d-flex justify-content-center ">
                <FontAwesomeIcon className="iconawsomeWhiteBig" icon={props.HeaderIcon} />
              </div>
            </div>
            <div className="col-8 herogreentitle d-flex flex-column pt-2 ">
              <h5> {props.Title} </h5>
            </div>
          </div>
          <div className="row  d-inline-flex px-1 py-2 mx-1 w-100 ">
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={SubmitHandler}>
                {props.children}
                <div className="row d-inline-flex  justify-content-center mx-4 py-1 my-1 w-100 modalButtons">
                  <div className="col-3">
                    <SubmitButton
                      ClassName="border-danger text-white bg-danger rounded-3  px-3  py-1 "
                      Title="Cancel "
                      Type="button"
                      onClick={CancelHandler}
                    />
                  </div>
                  <div className="col-4">
                    <SubmitButton
                      ClassName=" text-white border-primary bg-primary rounded-3 px-4  py-1 "
                      Title=" Save "
                      Type="submit"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
});

FormModal.displayName = "FormModal";

export default FormModal;
