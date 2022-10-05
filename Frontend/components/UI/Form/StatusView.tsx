import React from "react";

export const StatusList: { Status: string; Style: string }[] = [
  { Status: "Active", Style: "text-success" },
  { Status: "Deactive", Style: "text-secondary" },
  { Status: "Running", Style: "text-warning" },
  { Status: "Waiting", Style: "text-primary" },
  { Status: "Done", Style: "text-secondary" },
];

interface PropsType {
  Status: string;
}

const StatusView = (props: PropsType) => {
  const first = StatusList.find((obj) => {
    return obj.Status === props.Status;
  });
  return <h6 className={first?.Style}>{props.Status}</h6>;
};

export default StatusView;
