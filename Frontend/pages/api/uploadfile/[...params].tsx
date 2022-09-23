import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

import multiparty from "multiparty";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const contentType = req.headers["content-type"];
  if (!contentType || contentType.indexOf("multipart/form-data") < 0) {
    res.status(501).json({ message: "File not found!" });
    return;
  }

  const params = req.query.params as string[];

  const fileName = params.pop() as string;

  const folderName = path.join(process.cwd(), "\\public", ...params);

  if (!fs.existsSync(folderName)) fs.mkdirSync(folderName, { recursive: true });

  const fullPath = path.join(folderName, fileName);

  const form = new multiparty.Form({ uploadDir: folderName });

  await form.parse(req, function (_err, _fields, files) {
    const file = files.imageFile[0];
    fs.renameSync(file.path, fullPath);
  });

  res.status(201).json({ message: "File Uploaded" });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
