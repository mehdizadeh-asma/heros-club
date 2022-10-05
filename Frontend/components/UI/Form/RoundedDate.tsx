import dateFormat from "dateformat";

interface ParamTypes {
  Date: string | undefined;
}

const RoundedDate = (props: ParamTypes) => {
  const convertedDate = new Date(props.Date ?? Date.now());
  const month = dateFormat(convertedDate, "mmm"); //.toUpperCase();
  const day = convertedDate.getDate();

  return (
    <div className="row w-100  h-75">
      <div className="border w-100 h-100 border-secondary rounded-circle d-flex flex-column justify-content-around  text-white bg-secondary py-1 mx-2 my-0">
        <h5 className="mb-0 roundedDate">{day}</h5> <h5 className="mt-0">{month}</h5>
      </div>
    </div>
  );
};
export default RoundedDate;
