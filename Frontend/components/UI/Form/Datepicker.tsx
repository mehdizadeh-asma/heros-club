import React from "react";
import { Form } from "react-bootstrap";

const Datepicker = React.forwardRef<HTMLInputElement>((_props, ref) => {
  return (
    <div>
      <div className="row">
        <div className="col-12 ">
          <Form.Group controlId="dob">
            <Form.Control
              Type="date"
              name="dob"
              placeholder="Please Choose Date"
              title="Please Choose Date"
              className="border border-1 rounded-4 border-success  py-2 px-3 roundeddropdown floatinginput"
              pattern="mm/dd/yyyy"
              Required
              ref={ref}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
});
Datepicker.displayName = "Datepicker";
export default Datepicker;
