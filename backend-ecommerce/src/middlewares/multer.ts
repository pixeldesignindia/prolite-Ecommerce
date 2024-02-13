
// import multer from "multer";
// import { v4 as uuid } from "uuid";

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, "uploads");
//   },
//   filename(req, file, callback) {
//     const id = uuid();
//     const extName = file.originalname.split(".").pop();
//     callback(null, `${id}.${extName}`);
//   },
// });

// export const singleUpload = multer({ storage }).single("photo");

// export const multipleUpload = multer({ storage }).array('photos');
import { Request, Response, NextFunction } from "express"; // Import Request, Response, and NextFunction types from express
import multer from "multer";
import { v4 as uuid } from "uuid";
import { promisify } from "util";

const storage = multer.diskStorage({
  destination(req: Request, file, callback) {
    callback(null, "uploads");
  },
  filename(req: Request, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const multerSingleUpload = promisify(multer({ storage }).single("photo"));
const multerMultipleUpload = promisify(multer({ storage }).array("photos"));

export async function singleUpload(req: Request, res: Response, next: NextFunction) { // Provide explicit types for req, res, and next
  try {
    await multerSingleUpload(req, res);
    // Continue processing the request or send a response
    res.status(200).json({ message: "File uploaded successfully" });
     next();
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
}

export async function multipleUpload(req: Request, res: Response, next: NextFunction) { // Provide explicit types for req, res, and next
  try {
    await multerMultipleUpload(req,res);
    // Continue processing the request or send a response

    next();

  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
}
