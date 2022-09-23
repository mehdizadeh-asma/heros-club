import React from "react";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import SubmitButton from "../Form/SubmitButton";

interface PropsType {
  Title: string;
  Message: string;
  ShowModal: boolean;
  onYesClick: () => void;
  onNoClick: () => void;
}
const ConfirmModal = (props: PropsType) => {
  return (
    <div className="row">
      <Modal show={props.ShowModal}>
        <div className="row d-flex flex-column border border-1  rounded-4 shadow bg-white">
          <div className="row  d-inline-flex  w-100 justify-content-center position-relative ">
            <div className="mx-2 position-absolute translate-middle top-0 start-50  h-75">
              <div className="col-2  rounded-3 ModalBadge d-flex justify-content-center ">
                <FontAwesomeIcon className="iconawsomeWhiteBig" icon={faQuestionCircle} />
              </div>
            </div>
            <div className="col-8 herogreentitle d-flex flex-column pt-2 ">
              <h5> {props.Title} </h5>
            </div>
          </div>
          <div className="row  d-inline-flex px-5 py-3 mx-1 w-100 confirmModalbody ">
            <h6> {props.Message}</h6>
          </div>
          <div className="row d-inline-flex  justify-content-center mx-5 py-1 my-1 w-100 confirmModalbody">
            <div className="col-3">
              <SubmitButton
                className=" text-white border-success bg-success  rounded-3 px-3  py-1  componentbtn"
                buttonTitle="YES"
                type="button"
                onClick={props.onYesClick}
              />
            </div>
            <div className="col-4">
              <SubmitButton
                className="border-danger text-white bg-danger rounded-3  px-3  py-1   componentbtn   "
                buttonTitle="NO"
                type="button"
                onClick={props.onNoClick}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ConfirmModal;
