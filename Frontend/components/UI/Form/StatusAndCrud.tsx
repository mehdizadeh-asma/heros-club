import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import StatusView from "../Form/StatusView";

interface PropsType {
  editClick: (id: string) => void;
  deleteClick: (id: string) => void;
  status: string;
  id: string;
}
const StatusAndCrud = (props: PropsType) => {
  function editClickHandler(id: string) {
    props.editClick(id);
  }

  function deleteClickHandler(id: string) {
    props.deleteClick(id);
  }

  return (
    <div className="row d-inline-flex justify-content-center mx-1  mb-1  ">
      <div className="col-2">
        <FontAwesomeIcon
          className="iconawesomeSimple text-info "
          onClick={editClickHandler.bind(this, props.id)}
          icon={faEdit}
        />
      </div>
      <div className="col-2">
        <FontAwesomeIcon
          className="iconawesomeSimple iconawesomeTrash text-danger "
          onClick={deleteClickHandler.bind(null, props.id)}
          icon={faTrash}
        />
      </div>
      <div className="d-flex justify-content-center col-8 pt-1">
        <StatusView Status={props.status} />
      </div>
    </div>
  );
};
export default StatusAndCrud;
