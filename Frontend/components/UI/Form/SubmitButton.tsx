import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface PropsType {
  Title: string;
  Type: "reset" | "button" | "submit";
  ClassName?: string;
  Icon?: IconDefinition;
  IconClass?: string;
  onClick?: () => void;
}
const SubmitButton = React.forwardRef<HTMLButtonElement, PropsType>((props, ref) => {
  return (
    <button
      type={props.Type}
      ref={ref}
      className={"border border-2 position-absolute shadow-sm componentbtn " + props.ClassName}
      onClick={props.onClick}
    >
      {props.Icon ? (
        <FontAwesomeIcon className={props.IconClass} icon={props.Icon} />
      ) : (
        <h6>{props.Title}</h6>
      )}
    </button>
  );
});
SubmitButton.displayName = "SubmitButton";
export default SubmitButton;
