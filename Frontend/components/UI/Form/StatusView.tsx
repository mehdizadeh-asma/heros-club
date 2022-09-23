import React from "react";

const StatusArchive: { Status: string; Style: string }[] = [
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
  const first = StatusArchive.find((obj) => {
    return obj.Status === props.Status;
  });
  return <h6 className={first?.Style}>{props.Status}</h6>;
};

export default StatusView;
