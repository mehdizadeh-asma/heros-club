import { useRef } from "react";
import Card from "react-bootstrap/card";
import Image from "react-bootstrap/Image";

import StatusAndCrud from "../UI/Form/StatusAndCrud";
import ConfirmModal from "../UI/Form/ConfirmModal";

import Helper from "utils/Helper";
import { StatusType } from "models/Field";

interface PropsType {
  Id: string;
  Title: string;
  ImageUrl: string;
  Status: StatusType;
  onDelete: (id: string) => void;
  onShowField: (id: string) => void;
}
const FieldCard: React.FC<PropsType> = (props) => {
  type ConfirmModalHandle = React.ElementRef<typeof ConfirmModal>;
  const refConfirmModal = useRef<ConfirmModalHandle>(null);
  // console.log("Field Card Loaded....");

  function deleteClickHandler() {
    refConfirmModal.current?.Show();
  }
  function editClickHandler() {
    props.onShowField(props.Id);
  }

  function YesClickHandler() {
    refConfirmModal.current?.Hide();

    props.onDelete(props.Id);
    Helper.DeleteFile(props.ImageUrl);
  }
  function NoClickHandler() {
    refConfirmModal.current?.Hide();
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
          onEdit={editClickHandler}
          onDelete={deleteClickHandler}
          Status={props.Status}
          Id={props.Id}
        />
      </div>
      <ConfirmModal
        Title="Delete Confirmation"
        Message="Are You Sure You Want To Delete This Item?"
        onYesClick={YesClickHandler}
        onNoClick={NoClickHandler}
        ref={refConfirmModal}
      />
    </Card>
  );
};
export default FieldCard;
