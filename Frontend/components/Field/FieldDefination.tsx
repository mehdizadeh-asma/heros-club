import path from "path";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import NewField from "./NewField";
import FieldCard from "./FieldCard";
import MultiCarousel from "../UI/Carousel/MultiCarousel";

import { StoreType } from "store";
import Field, { StatusType } from "models/Field";
import Helper from "utils/Helper";

const FieldDefination: React.FC = () => {
  const fieldList = useSelector((state: StoreType) => state.Fields);
  const [fieldToEdit, setFieldToEdit] = useState<Field | undefined>(undefined);

  // console.log("FieldDefination Loaded...");

  useEffect(() => {
    Field.Get();
  }, []);

  async function AddFieldHandler(field: Field, uploadedFile?: FormData) {
    if (uploadedFile && field.ImageUrl) {
      const fileName = path.basename(field.ImageUrl);
      const folderName = path.dirname(field.ImageUrl);
      Helper.UploadFile(folderName, fileName, uploadedFile);
    }

    await field.Add();
  }

  async function DeleteFieldHandler(id: string) {
    await Field.Remove(id);

    setFieldToEdit(undefined);
  }

  function ShowFieldHandler(id: string) {
    const field = Field.GetByID(id);

    setFieldToEdit(field);
  }

  async function EditFieldHandler(field: Field, uploadedFile?: FormData) {
    if (uploadedFile && field.ImageUrl) {
      const fileName = path.basename(field.ImageUrl);
      const folderName = path.dirname(field.ImageUrl);
      Helper.UploadFile(folderName, fileName, uploadedFile);
    }
    setFieldToEdit(undefined);
    await field.Edit();
  }

  function ClearHandler() {
    setFieldToEdit(undefined);
  }

  return (
    <div className="row d-flex flex-column   ">
      <div className="col d-flex justify-content-center my-2">
        <div className="col-7">
          <NewField
            ForEdit={fieldToEdit}
            onAdd={AddFieldHandler}
            onSave={EditFieldHandler}
            onClear={ClearHandler}
          />
        </div>
      </div>
      <div className="col-5 d-inline-flex  justify-content-center position-relative "></div>
      <div>
        {fieldList && (
          <MultiCarousel>
            {fieldList.map((item) => (
              <FieldCard
                key={item._id}
                Id={item._id}
                Title={item.Title as string}
                ImageUrl={item.ImageUrl as string}
                Status={item.Status as StatusType}
                onShowField={ShowFieldHandler}
                onDelete={DeleteFieldHandler}
              />
            ))}
          </MultiCarousel>
        )}
      </div>
    </div>
  );
};
export default FieldDefination;
