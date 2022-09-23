import { useState } from "react";
import Card from "react-bootstrap/card";
import Image from "react-bootstrap/Image";

import Helper from "utils/Helper";
import { StatusType } from "models/Field";

import StatusAndCrud from "../UI/Form/StatusAndCrud";
import ConfirmModal from "../UI/Form/ConfirmModal";

interface PropsType {
  Id: string;
  Title: string;
  ImageUrl: string;
  Status: StatusType;
  onDelete: (id: string) => void;
  onShowField: (id: string) => void;
}
const FieldCard: React.FC<PropsType> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // console.log("Field Card Loaded....");

  function deleteClickHandler() {
    setShowModal(true);
  }
  function editClickHandler() {
    props.onShowField(props.Id);
  }

  function YesClickHandler() {
    setShowModal(false);
    props.onDelete(props.Id);
    Helper.DeleteFile(props.ImageUrl);
  }
  function NoClickHandler() {
    setShowModal(false);
  }

  return (
    <Card className="cardbodyField mb-5 shadow rounded-4 ">
      <div className="row justify-content-center  pt-1 h-50">
        <div className="col-8 d-flex  justify-content-center  align-items-start mt-0">
          <Image className=" img-fluid shadow-lg" src={props.ImageUrl} alt={props.Title} rounded />
        </div>
      </div>
      <div className="row justify-content-center   fieldTitle h-25">{props.Title}</div>
      <div className="row text-center text-secondary  h-25 ">
        <h5>{15} members</h5>
      </div>
      <div className="row">
        <StatusAndCrud
          editClick={editClickHandler}
          deleteClick={deleteClickHandler}
          status={props.Status}
          id={props.Id}
        />
      </div>
      <ConfirmModal
        ShowModal={showModal}
        Title="Delete Confirmation"
        Message="Are You Sure You Want To Delete This Item?"
        onYesClick={YesClickHandler}
        onNoClick={NoClickHandler}
      />
    </Card>
  );
};
export default FieldCard;
