import { useState } from "react";
import { AnchorProps } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type FilteredDropDownItem = { key: string; value: string };

interface PropsType {
  Items: FilteredDropDownItem[] | undefined;
  onSelect: (key: string, value: string) => void;
  SelectedValue?: string;
  DefaultText: string;
}

const FilteredDropDown = (props: PropsType) => {
  const [selectedValue, setSelectedValue] = useState(props.DefaultText);

  if (props.SelectedValue && selectedValue != props.SelectedValue)
    setSelectedValue(props.SelectedValue);

  const selectedHandler = (eventKey: string | null, event: any) => {
    setSelectedValue(event.target.innerText);
    if (props.onSelect && eventKey) props.onSelect(eventKey, event.target.innerText);
  };

  const CustomToggle = React.forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
    return (
      <a
        className="border border-1 rounded-4 border-success w-100 py-2 px-3 roundeddropdown"
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          props.onClick?.(e);
        }}
      >
        {props.children}
        <FontAwesomeIcon className="iconawsomepurple" icon={faSortDown} />
      </a>
    );
  });

  CustomToggle.displayName = "CustomToggle";

  const CustomMenu = React.forwardRef<HTMLDivElement, AnchorProps>(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto "
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child: any) => !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  CustomMenu.displayName = "CustomMenu";

  return (
    <Dropdown className="roundeddropdown " onSelect={selectedHandler}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {selectedValue}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {props.Items &&
          props.Items.map((item) => (
            <Dropdown.Item key={item.key} eventKey={item.key}>
              {item.value}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default FilteredDropDown;
