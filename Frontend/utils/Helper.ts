import axios from "axios";
import path from "path";

class Helper {
  public static readonly BACKEND_URL = "http://localhost:8080";

  public static async UploadFile(folderName: string, fileName: string, uploadedFile: FormData) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const fullPath = path.join(folderName, fileName);

    await axios.post("api/uploadfile/" + fullPath, uploadedFile, config);
  }

  public static async DeleteFile(fileName: string) {
    await axios.post("api/deletefile", { FileName: fileName });
  }
}

export default Helper;
