import React, { useImperativeHandle, useState } from "react";

import Image from "react-bootstrap/Image";
import Resizer from "react-image-file-resizer";
import { Form } from "react-bootstrap";

interface PropsType {
  folderName: string;
  Required?: boolean;
  onUpload: (imageurl: string | undefined, uploadedFile: FormData) => void;
}

interface ForwardRefHandle {
  SetImage: (imageUrl: string | undefined) => void;
  GetImage: () => string | undefined;
}

// #region Resizer
const resizeFile = (file: Blob) =>
  new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      100,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });

const dataURIToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};
//#endregion

export const defaultAvatar = "/assets/images/default-avatar.png";

const UploadfileWithPreview = React.forwardRef<ForwardRefHandle, PropsType>((props, ref) => {
  const [ImagePreview, setImagePreview] = useState<string | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    SetImage: (imageUrl: string | undefined) => setImagePreview(imageUrl),
    GetImage: () => ImagePreview,
  }));

  // console.log("UploadFile Loaded...");

  async function uploadHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const formData = new FormData();

    if (event.target.files) {
      const file = event.target.files[0];

      const img = await resizeFile(file);
      const newFile = dataURIToBlob(img);
      formData.append("imageFile", newFile);
      setImagePreview(URL.createObjectURL(event.target.files[0]).toString());

      const imageUrl = `/${props.folderName}/${Date.now().toString() + ".jpg"}`;
      props.onUpload(imageUrl, formData);
      event.target.value = "";
    }
  }

  return (
    <Form.Group controlId="validationCustom01">
      <div className="d-flex flex-column text-center  ">
        <div>
          <Image
            className="img-fluid shadow border-secondary"
            src={ImagePreview ?? defaultAvatar}
            height="100px"
            width="100px"
            alt="default"
            rounded
          />
        </div>
        <div>
          <div className="row d-flex flex-column position-relative">
            <div className="col">
              <Form.Control
                Type="file"
                onChange={uploadHandler}
                className="shadow text-info mt-1 "
                Required={!props.Required && ImagePreview ? false : true}
              />
              <Form.Control.Feedback tooltip type="invalid" className="">
                Please Provide A JPEG Image
              </Form.Control.Feedback>
            </div>
          </div>
        </div>
      </div>
    </Form.Group>
  );
});

UploadfileWithPreview.displayName = "UploadfileWithPreview";

export default UploadfileWithPreview;
