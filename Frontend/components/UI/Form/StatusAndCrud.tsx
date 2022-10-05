import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import StatusView from "../Form/StatusView";

interface PropsType {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  Status: string;
  Id: string;
}
const StatusAndCrud = (props: PropsType) => {
  function editClickHandler(id: string) {
    props.onEdit(id);
  }

  function deleteClickHandler(id: string) {
    props.onDelete(id);
  }

  return (
    <div className="row d-inline-flex justify-content-center mx-1  mb-1  ">
      <div className="col-2">
        <FontAwesomeIcon
          className="iconawesomeSimple text-info "
          onClick={editClickHandler.bind(null, props.Id)}
          icon={faEdit}
        />
      </div>
      <div className="col-2">
        <FontAwesomeIcon
          className="iconawesomeSimple iconawesomeTrash text-danger "
          onClick={deleteClickHandler.bind(null, props.Id)}
          icon={faTrash}
        />
      </div>
      <div className="d-flex justify-content-end col-8 pt-1  ">
        <StatusView Status={props.Status} />
      </div>
    </div>
  );
};
export default StatusAndCrud;
