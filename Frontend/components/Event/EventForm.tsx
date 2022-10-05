import path from "path";
import dateFormat from "dateformat";
import React from "react";
import { MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

import { StoreType } from "store";
import Field from "models/Field";
import Event, { PaymentType, StatusType } from "models/Event";
import Helper from "utils/Helper";

import FloatingInput from "../UI/Form/FloatingInput";
import UploadfileWithPreview from "../UI/Form/UploadfileWithPreview";
import Datepicker from "../UI/Form/Datepicker";
import FilteredDropDown, { FilteredDropDownItem } from "../UI/Form/FilteredDropDown";
import { StatusList } from "../UI/Form/StatusView";

interface ForwardRefHandle {
  Submit: () => void;
}
interface PropsType {
  ForEdit: Event | undefined;
}

const EventForm = React.forwardRef<ForwardRefHandle, PropsType>((props, ref) => {
  // #region Definitions
  type UploadfileWithPreviewHandle = React.ElementRef<typeof UploadfileWithPreview>;

  const fieldList = useSelector((state: StoreType) => state.Fields);

  const refEventIDHidden = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refPaymentType = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refFieldImage =
    useRef<UploadfileWithPreviewHandle>() as MutableRefObject<UploadfileWithPreviewHandle>;
  const refTitleInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refDateInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refTimeInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refPlaceInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refCostInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const refGeolocationInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const [fileUploaded, setFileUploaded] = useState<FormData | undefined>(undefined);
  const [uploadImageUrl, setUploadImageUrl] = useState<string | undefined>(undefined);

  const [selectedField, setSelectedField] = useState<FilteredDropDownItem | undefined>(undefined);
  const [selectedStatus, setselectedStatus] = useState<FilteredDropDownItem | undefined>(undefined);

  const [ShowSwitch, setShowSwitch] = useState(true);
  const folderPath = "uploads/events";
  //#endregion

  //#region initials
  useEffect(() => {
    Field.Get();
  }, []);

  let convertedField: FilteredDropDownItem[] | undefined;
  if (fieldList)
    convertedField = fieldList.map((field) => ({ key: field._id, value: field.Title }));

  const convertedStatus = StatusList.map((item) => ({
    key: item.Status,
    value: item.Status,
  }));

  if (
    props.ForEdit &&
    refEventIDHidden.current &&
    refEventIDHidden.current.value !== props.ForEdit._id
  ) {
    const EditedEvent = props.ForEdit;
    const convertedDate = new Date(EditedEvent.EventDate);
    if (refEventIDHidden.current) {
      refEventIDHidden.current.value = EditedEvent._id;
      refTitleInput.current.value = EditedEvent.Title ?? "";
      refFieldImage.current.SetImage(EditedEvent.ImageUrl);
      refPlaceInput.current.value = EditedEvent.Address ?? "";
      refGeolocationInput.current.value = EditedEvent.Geolocation ?? "";
      refDateInput.current.value = dateFormat(convertedDate, "yyyy-mm-dd");
      refTimeInput.current.value = dateFormat(convertedDate, "HH:mm:ss");
      if (EditedEvent.Field?._id && EditedEvent.Field?.Title)
        setSelectedField({ key: EditedEvent.Field?._id, value: EditedEvent.Field?.Title });
      setselectedStatus({ key: EditedEvent.Status, value: EditedEvent.Status });

      if (EditedEvent.PaymentType === "FREE") {
        setShowSwitch(true);
      } else {
        setShowSwitch(false);
        if (refCostInput.current) {
          refCostInput.current.value = EditedEvent.Cost ?? "0";
        }
      }
    }
  }

  //#endregion

  // function ClearForm() {
  //   refEventIDHidden.current.value = "";
  //   refTitleInput.current.value = "";
  //   refDateInput.current.value = "";
  //   refTimeInput.current.value = "";
  //   refPlaceInput.current.value = "";
  //   if (ShowSwitch) refCostInput.current.value = "";
  //   refGeolocationInput.current.value = "";

  //   setShowSwitch(false);
  //   setSelectedField(undefined);
  //   setselectedStatus(undefined);

  //   refPaymentType.current.checked = true;
  //   setUploadImageUrl(undefined);
  //   setFileUploaded(undefined);
  // }

  // #region submit

  useImperativeHandle(ref, () => ({
    Submit: async () => {
      const enteredTitle = refTitleInput.current.value;
      const enteredPaymentType = refPaymentType.current.checked
        ? PaymentType.Free
        : PaymentType.Cost;
      const enteredCost = refPaymentType.current.checked ? "0" : refCostInput.current.value;
      const enteredDate = new Date(refDateInput.current.value + " " + refTimeInput.current.value);
      const enteredPlace = refPlaceInput.current.value;
      const enteredGeolocation = refGeolocationInput.current.value;
      const enteredFieldId = selectedField?.key;
      const enteredStatus = selectedStatus?.value as StatusType;
      if (!props.ForEdit) {
        const event = new Event(
          "1",
          enteredTitle,
          enteredDate,
          enteredStatus,
          enteredPaymentType,
          uploadImageUrl,
          enteredPlace,
          enteredCost,
          enteredFieldId,
          enteredGeolocation
        );

        if (uploadImageUrl && fileUploaded) {
          const fileName = path.basename(uploadImageUrl);
          const folderName = path.dirname(uploadImageUrl);
          await Helper.UploadFile(folderName, fileName, fileUploaded);
        }
        if (enteredFieldId) event.Field = Field.GetByID(enteredFieldId);

        await event.Add();
      } else {
        const Oldevent = props.ForEdit as Event;

        const eventId = Oldevent._id;
        const imageUrl = uploadImageUrl ?? refFieldImage.current.GetImage();
        if (Oldevent.Title) refTitleInput.current.value = Oldevent.Title;

        const editedEvent = new Event(
          eventId,
          enteredTitle,
          enteredDate,
          enteredStatus,
          enteredPaymentType,
          imageUrl,
          enteredPlace,
          enteredCost
        );

        if (uploadImageUrl && fileUploaded) {
          const fileName = path.basename(uploadImageUrl);
          const folderName = path.dirname(uploadImageUrl);
          await Helper.UploadFile(folderName, fileName, fileUploaded);
        }

        if (uploadImageUrl && Oldevent.ImageUrl) Helper.DeleteFile(Oldevent.ImageUrl);

        await editedEvent.Edit();
      }
    },
  }));

  //#endregion

  // #region drops

  function DropDownSelectHandler(key: string, value: string) {
    setSelectedField({ key, value });
  }
  function DropDownStatusSelectHandler(key: string, value: string) {
    setselectedStatus({ key, value });
  }

  function StatusChangeHandler() {
    setShowSwitch(refPaymentType.current?.checked);
  }

  function UploadfileChangeHandler(imageurl: string | undefined, uploadedFile: FormData) {
    setUploadImageUrl(imageurl);
    setFileUploaded(uploadedFile);
  }
  //#endregion

  return (
    <div className="row d-inline-flex w-100">
      <input type="hidden" ref={refEventIDHidden} />
      <div className="col-6 d-flex flex-column ">
        <FloatingInput
          LabelClassName="text-success pt-2 "
          Type="text"
          Title="Event Title"
          ref={refTitleInput}
          Required={true}
          InputClassName="floatinginput mb-5"
          ValidationMessage="Please Provide A Title"
        />
        <div className="col-12 mb-5">
          <Datepicker ref={refDateInput}></Datepicker>
        </div>
        <div className="col-12 mb-5">
          <FilteredDropDown
            Items={convertedField}
            DefaultText="Please Choose Field"
            onSelect={DropDownSelectHandler}
            SelectedValue={selectedField?.value}
          />
        </div>
        <div className="col-12 mb-4 ">
          <FilteredDropDown
            Items={convertedStatus}
            DefaultText="Please Choose Status"
            onSelect={DropDownStatusSelectHandler}
            SelectedValue={selectedStatus?.value}
          />
        </div>
        <div className="col-12 mb-4">
          <UploadfileWithPreview
            onUpload={UploadfileChangeHandler}
            folderName={folderPath}
            ref={refFieldImage}
            Required={true}
          />
        </div>
      </div>
      <div className="col-6 d-flex flex-column ">
        <FloatingInput
          LabelClassName="text-success pt-2 "
          Type="text"
          Title="Event Geolocation"
          ref={refGeolocationInput}
          InputClassName="floatinginput mb-5"
        />
        <FloatingInput
          LabelClassName="text-success pt-2 "
          Type="text"
          Title="Event Place"
          ref={refPlaceInput}
          Required={true}
          InputClassName="floatinginput mb-5"
          ValidationMessage="Please Provide A Place"
        />
        <FloatingInput
          LabelClassName="text-success pt-2 "
          Type="time"
          Title="Event Time"
          ref={refTimeInput}
          InputClassName="floatinginputMidsize mb-5"
          Required={true}
          ValidationMessage="Please Provide A Time"
        />
        <div className="col-12 my-1 d-flex flex-column">
          <Form.Check
            className="mb-1"
            type="switch"
            id="statusActive"
            label={ShowSwitch ? "Free" : "Paid"}
            defaultChecked={true}
            ref={refPaymentType}
            onChange={StatusChangeHandler}
          />
          {!ShowSwitch && (
            <FloatingInput
              LabelClassName="text-success pt-2 "
              Type="number"
              Title="Event Cost"
              ref={refCostInput}
              ValidationMessage="Please Provide A Numeric Value Greater Than 0"
              InputClassName="floatinginputMidsize"
            />
          )}
        </div>
      </div>
    </div>
  );
});

EventForm.displayName = "EventForm";

export default EventForm;
