import React from "react";
import { Form } from "react-bootstrap";

interface PropsType {
  Type: string;
  Title: string;
  Required?: boolean;
  LabelClassName?: string;
  InputClassName?: string;
  ValidationMessage?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  return (
    <div className="row">
      <Form.Group controlId="validationCustom01">
        <Form.Floating>
          <Form.Control
            Required={props.Required}
            Type={props.Type}
            className={"border border-1 shadow-sm rounded-4 " + props.InputClassName}
            ref={ref}
          />
          <Form.Control.Feedback tooltip type="invalid">
            {props.ValidationMessage}
          </Form.Control.Feedback>
          <label htmlFor="floatingInputCustom" className={props.LabelClassName}>
            <h6> {props.Title}</h6>
          </label>
        </Form.Floating>
      </Form.Group>
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
