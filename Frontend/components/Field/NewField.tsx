import React, { MutableRefObject, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

import FloatingInput from "../UI/Form/FloatingInput";
import UploadfileWithPreview, { defaultAvatar } from "../UI/Form/UploadfileWithPreview";
import SubmitButton from "../UI/Form/SubmitButton";

import Field, { StatusType } from "models/Field";
import Helper from "utils/Helper";

interface PropsType {
  ForEdit: Field | undefined;
  onAdd: (field: Field, formData?: FormData) => void;
  onSave: (field: Field, formData?: FormData) => void;
  onClear: () => void;
}

const NewField: React.FC<PropsType> = (props) => {
  const refIDHidden = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refTitleInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refAddButton = useRef<HTMLButtonElement>() as MutableRefObject<HTMLButtonElement>;
  const refFieldImage = useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>;
  const refFieldStatus = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const [fileUploaded, setFileUploaded] = useState<FormData | undefined>(undefined);
  const [uploadImageUrl, setUploadImageUrl] = useState<string | undefined>(undefined);

  // console.log("NewField Loaded...");

  const folderName = "uploads/fields";

  if (props.ForEdit && refIDHidden.current.value !== props.ForEdit._id) {
    const editedfield = props.ForEdit;

    if (refIDHidden.current) refIDHidden.current.value = editedfield._id;
    if (editedfield.Title) refTitleInput.current.value = editedfield.Title;
    if (editedfield.Status)
      refFieldStatus.current.checked = editedfield.Status == StatusType.Active;
    if (editedfield.ImageUrl) refFieldImage.current.src = editedfield.ImageUrl;

    refAddButton.current.textContent = "Save Field";
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredTitle = refTitleInput.current.value;
    const fieldStatus = refFieldStatus.current.checked ? StatusType.Active : StatusType.Deactive;

    if (refAddButton.current.textContent === "Add Field") {
      const field = new Field("1", enteredTitle, uploadImageUrl, fieldStatus);

      props.onAdd(field, fileUploaded);
    } else {
      const Oldfield = props.ForEdit as Field;

      const fieldId = refIDHidden.current.value;
      const imageUrl = uploadImageUrl ?? refFieldImage.current.src;

      const editedField = new Field(fieldId, enteredTitle, imageUrl, fieldStatus);

      if (uploadImageUrl && Oldfield.ImageUrl) Helper.DeleteFile(Oldfield.ImageUrl);

      props.onSave(editedField, fileUploaded);
    }
    ClearField();
  }

  function ClearField() {
    refIDHidden.current.value = "";
    refTitleInput.current.value = "";

    refFieldStatus.current.checked = true;
    refFieldImage.current.src = defaultAvatar;

    setUploadImageUrl(undefined);
    setFileUploaded(undefined);
    refAddButton.current.textContent = "Add Field";
    props.onClear();
  }

  function UploadfileChangeHandler(imageurl: string | undefined, uploadedFile: FormData) {
    setUploadImageUrl(imageurl);
    setFileUploaded(uploadedFile);
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="hidden" ref={refIDHidden} />
      <div className="row d-inline-flex w-100   py-3 shadow border rounded-4  bg-white  ">
        <div className="d-flex flex-column text-center col-lg-6  ">
          <UploadfileWithPreview
            onUpload={UploadfileChangeHandler}
            folderName={folderName}
            ref={refFieldImage}
          />
        </div>
        <div className="col-lg-4  d-flex flex-column position-relative  justify-content-start">
          <Form.Check
            className="position-absolute top-0"
            type="switch"
            id="statusActive"
            label="Active"
            defaultChecked={true}
            ref={refFieldStatus}
          />
          <div className="row d-flex position-absolute bottom-0 ">
            <FloatingInput
              type="text"
              placeholder="FieldTitle"
              ref={refTitleInput}
              title="Field Title"
              className="text-info "
            />
          </div>
        </div>
        <div className="col-lg-2 position-relative ">
          <SubmitButton
            className=" text-info border-info bottom-0 rounded-3  start-0 py-2  componentbtn"
            buttonTitle="Add Field"
            type="submit"
            ref={refAddButton}
          />
          <SubmitButton
            className="border-info rounded-circle top-0 py-1 px-1 end-0 mx-3 "
            buttonTitle=""
            type="button"
            onClick={ClearField}
            icon={faEraser}
            iconClass=" roundImgBtn text-info border-info border-5 w-75"
          />
        </div>
      </div>
    </form>
  );
};

export default NewField;