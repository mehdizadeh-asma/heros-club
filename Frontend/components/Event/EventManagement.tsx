import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

import { StoreType } from "store";
import Event from "models/Event";

import FormModal from "../UI/Form/FormModal";
import EventCard from "./EventCard";
import EventForm from "./EventForm";

interface ForwardRefHandle {
  PopAddModal: () => void;
}

const EventManagement = React.forwardRef<ForwardRefHandle>((_props, ref) => {
  // const EventManagement: React.FC = () => {
  //#region initials
  useImperativeHandle(ref, () => ({
    PopAddModal: () => {
      refFormModal.current?.Show();
    },
  }));

  const [eventToEdit, setEventToEdit] = useState<Event | undefined>(undefined);

  type FormModalHandle = React.ElementRef<typeof FormModal>;
  const refFormModal = useRef<FormModalHandle>(null);

  type EventFormHandle = React.ElementRef<typeof EventForm>;
  const refEventForm = useRef<EventFormHandle>(null);

  const eventList = useSelector((state: StoreType) => state.Events);

  useEffect(() => {
    Event.Get();
  }, []);
  //#endregion

  // #region CarouselEvents
  async function EventCard_ShowHandler(id: string) {
    await refFormModal.current?.Show();
    const event = Event.GetByID(id);
    setEventToEdit(event);
  }
  async function EventCard_DeleteHandler(id: string) {
    await Event.Remove(id);
    setEventToEdit(undefined);
  }
  //#endregion

  function FormModal_SubmitHandler() {
    refEventForm.current?.Submit();
    refFormModal.current?.Hide();
  }

  function FormModal_CancelClick() {
    refFormModal.current?.Hide();
  }

  return (
    <div className="row d-flex ">
      <div className="col-11 d-flex justify-content-center my-2 ">
        {/* <MultiCarousel> */}
        {eventList.map((item) => (
          <EventCard
            key={item._id}
            onShow={EventCard_ShowHandler}
            onDelete={EventCard_DeleteHandler}
            Id={item._id}
            Title={item.Title}
            ImageUrl={item.ImageUrl}
            Status={item.Status}
            PaymentType={item.PaymentType}
            Field={item.Field}
            Cost={item.Cost}
            EventDate={item.EventDate.toString()}
            Address={item.Address as string}
          />
        ))}
        {/* </MultiCarousel> */}
      </div>
      <FormModal
        Title="Add/Edit Event"
        onSaveClick={FormModal_SubmitHandler}
        onCancelClick={FormModal_CancelClick}
        HeaderIcon={faCalendarCheck}
        ref={refFormModal}
      >
        <EventForm ref={refEventForm} ForEdit={eventToEdit}></EventForm>
      </FormModal>
    </div>
  );
});
EventManagement.displayName = "EventManagement";
export default EventManagement;
