import { useRef } from "react";
import Card from "react-bootstrap/card";
import Image from "react-bootstrap/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faClock, faMoneyBill, faEarth } from "@fortawesome/free-solid-svg-icons";

import Helper from "utils/Helper";
import { PaymentType, StatusType } from "models/Event";
import Field from "models/Field";

import StatusAndCrud from "../UI/Form/StatusAndCrud";
import ConfirmModal from "../UI/Form/ConfirmModal";
import RoundedDate from "../UI/Form/RoundedDate";

interface PropsType {
  Id: string;
  Title: string;
  Status: StatusType;
  PaymentType: PaymentType;
  EventDate: string;
  ImageUrl?: string;
  Cost?: string;
  Field?: Field;
  Address: string;
  onDelete: (id: string) => void;
  onShow: (id: string) => void;
}

const EventCard: React.FC<PropsType> = (props) => {
  type ConfirmModalHandle = React.ElementRef<typeof ConfirmModal>;
  const refConfirmModal = useRef<ConfirmModalHandle>(null);

  const eventDate = new Date(props.EventDate);
  const TimeString = eventDate.toLocaleTimeString();

  function editClickHandler() {
    props.onShow(props.Id);
  }

  function deleteClickHandler() {
    refConfirmModal.current?.Show();
  }
  function yesClickHandler() {
    refConfirmModal.current?.Hide();
    props.onDelete(props.Id);

    if (props.ImageUrl) Helper.DeleteFile(props.ImageUrl);
  }
  function noClickHandler() {
    refConfirmModal.current?.Hide();
  }
  return (
    <Card className="cardbody mb-5 shadow rounded-4 mx-2">
      <div className="row  pt-2 h-25 mb-4">
        <div className="col-8 px-1 d-flex justify-content-end  align-items-start">
          <Image
            id="imgPreview88"
            className="img-fluid shadow border col-12 align-self-end h-100 w-75"
            src={props.ImageUrl}
            height="5rem"
            alt="hgjh"
            rounded
          />
        </div>
        <div className="col-4 text-center ">
          {/* <div className=" row border border-secondary rounded-circle justify-content-around  text-white bg-secondary ">
            nov 10
          </div> */}
          <RoundedDate Date={props.EventDate}></RoundedDate>
        </div>
        {/* <div className="col-1"></div> */}
      </div>
      <div className="row">
        <h5 className=" px-4 eventTitle d-flex justify-content-start">{props.Field?.Title}</h5>
      </div>
      <div className="row ">
        <h5 className=" px-4 eventDescription d-flex justify-content-start">{props.Title}</h5>
      </div>
      <div className="row text-center ">
        <hr className=" w-75  mx-4"></hr>
      </div>
      <div className="row d-flex justify-content-start px-3 align-items-start">
        <FontAwesomeIcon className="iconawesomeSimplecard col-2" icon={faMapMarker} />
        <div className="col-10 align-top  px-0">
          <h6 className=" d-flex justify-content-start">{props.Address}</h6>
        </div>
      </div>
      <div className="row d-flex justify-content-start px-3  align-items-center">
        <FontAwesomeIcon className="iconawesomeSimplecard col-2" icon={faClock} />
        <div className="col-10 align-top px-0">
          <h6 className=" d-flex justify-content-start">{TimeString}</h6>
        </div>
      </div>
      <div className="row d-flex justify-content-start px-3 ">
        <FontAwesomeIcon
          className="iconawesomeSimplecard col-2 align-items-center "
          icon={faMoneyBill}
        />
        <div className="col-10 align-top px-0 ">
          <h6 className="text-danger d-flex justify-content-start ">
            {props.PaymentType === "FREE" ? "FREE" : "Cost " + "$" + props.Cost}
          </h6>
        </div>
      </div>
      <div className="row d-flex justify-content-start px-3 align-items-center">
        <FontAwesomeIcon className="iconawesomeSimplecard col-2" icon={faEarth} />
        <div className="col-10 align-top  px-0">
          <h6 className=" d-flex justify-content-start">find the place on the map</h6>
        </div>
      </div>
      <div className="row w-100 h-25"></div>

      <div className="row w-100">
        <StatusAndCrud
          onEdit={editClickHandler}
          onDelete={deleteClickHandler}
          Status={props.Status}
          Id={props.Id}
        />
      </div>
      <ConfirmModal
        Title="Delete Confirmation"
        Message="Are You Sure You Want To Delete This Item?"
        onYesClick={yesClickHandler}
        onNoClick={noClickHandler}
        ref={refConfirmModal}
      />
    </Card>
  );
};
export default EventCard;
