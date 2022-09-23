import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
  className: string;
  buttonTitle: string;
  type: "reset" | "button" | "submit";
  onClick?: () => void;
  icon?: IconDefinition;
  iconClass?: string;
}
const SubmitButton = React.forwardRef<HTMLButtonElement, PropsType>((props, ref) => {
  return (
    <button
      type={props.type}
      ref={ref}
      className={"border border-2 position-absolute shadow-sm componentbtn " + props.className}
      onClick={props.onClick}
    >
      {props.icon ? (
        <FontAwesomeIcon className={props.iconClass} icon={props.icon} />
      ) : (
        <h6>{props.buttonTitle}</h6>
      )}
    </button>
  );
});
SubmitButton.displayName = "SubmitButton";
export default SubmitButton;
