import React from "react";
import { Form } from "react-bootstrap";

interface PropsType {
  type: string;
  placeholder: string;
  className: string;
  title: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  return (
    <div className="row">
      <Form.Floating>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          className=" border border-1 shadow-sm rounded-3 floatinginput "
          ref={ref}
        />
        <label htmlFor="floatingInputCustom" className={props.className}>
          <h6 className="px-1"> {props.title}</h6>
        </label>
      </Form.Floating>
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
