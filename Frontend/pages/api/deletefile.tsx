import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fileName = req.body.FileName as string;

  const absoluteFileName = path.join(process.cwd(), "\\public", fileName);

  if (fs.existsSync(absoluteFileName)) fs.unlinkSync(absoluteFileName);

  res.status(200).json({ message: "File Deleted" });
};

export default handler;
