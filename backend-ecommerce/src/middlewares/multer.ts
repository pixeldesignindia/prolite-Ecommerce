
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
// import { Request, Response, NextFunction } from "express"; // Import Request, Response, and NextFunction types from express
// import multer from "multer";
// import { v4 as uuid } from "uuid";
// import { promisify } from "util";
// import path from 'path'
// import { Callback } from "mongoose";

// // const storage = multer.diskStorage({
// //   destination(req: Request, file, callback) {
// //     callback(null, "uploads");
// //   },
// //   filename(req: Request, file, callback) {
// //     const id = uuid();
// //     const extName = file.originalname.split(".").pop();
// //     callback(null, `${id}.${extName}`);
// //   },
// // });

// // const multerSingleUpload = promisify(multer({ storage }).single("photo"));
// // const multerMultipleUpload = promisify(multer({ storage }).array("photos"));

// // export async function singleUpload(req: Request, res: Response, next: NextFunction) { // Provide explicit types for req, res, and next
// //   try {
// //     await multerSingleUpload(req, res);
// //     // Continue processing the request or send a response
// //     res.status(200).json({ message: "File uploaded successfully" });
// //      next();
// //   } catch (error) {
// //     // Pass the error to the error handling middleware
// //     next(error);
// //   }
// // }

// // export async function multipleUpload(req: Request, res: Response, next: NextFunction) { // Provide explicit types for req, res, and next
// //   try {
// //     await multerMultipleUpload(req,res);
// //     // Continue processing the request or send a response

// //     next();

// //   } catch (error) {
// //     // Pass the error to the error handling middleware
// //     next(error);
// //   }
// // }
// const storage = multer.diskStorage({
//     destination:function(req: Request, file, cb){
//         if(file.mimetype === 'image/jpeg' 
//         || file.mimetype === 'image/png'){
//             cb(null,path.join(__dirname,'../public/image'));
//         }
//         else{
//             cb(null,path.join(__dirname,'../public/document'));
//         }
//     },
//     filename:function(req,file,cb){
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name);
//     }
// });

// const fileFilter = (req:Request,file,cb:Callback) => {
//     if (file.fieldname === "image") {
//         (file.mimetype === 'image/jpeg' 
//          || file.mimetype === 'image/png')
//         ? cb(null,true)
//         : cb(null,false);
//     }
//     else if(file.fieldname === "document"){
//         (file.mimetype === 'application/msword' 
//         || file.mimetype === 'application/pdf')
//         ? cb(null,true)
//         : cb(null,false);
//     }
// }

// export const upload = multer({
//     storage:storage,
//     fileFilter:fileFilter
// }).fields([{ name: 'photos', maxCount: 6 }, { name: 'displayPhoto', maxCount: 1 }]);


import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from 'path'
import ErrorHandler from "../utils/utility-class.js";

const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype === 'image/webp') {
            cb(null,"uploads");
        } else {
            cb(null, path.join(__dirname, '../public/document'));
        }
    },
    filename: function(req, file: Express.Multer.File, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.fieldname === "photos") {
        (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype ==="image/webp")
        ? cb(null, true)
        : cb(new ErrorHandler('Invalid file type for photos',400));
    } else if (file.fieldname === "displayPhoto") {
        (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype ==="image/webp")
        ? cb(null, true)
        : cb(new ErrorHandler('Invalid file type for display photo',400));
    } else if (file.fieldname === "document") {
        (file.mimetype === 'application/msword' || file.mimetype === 'application/pdf')
        ? cb(null, true)
        : cb(new ErrorHandler('Invalid file type for document',400));
    } else {
        cb(new ErrorHandler('Invalid fieldname',400));
    }
}

// export const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// }).fields([{ name: 'photos', maxCount: 6 }, { name: 'displayPhoto', maxCount: 1 }]);

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'photos', maxCount: 6 },
    { name: 'displayPhoto', maxCount: 3}
]);

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            // Handle multer errors
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // Handle other errors
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        // if (!req.files || !('displayPhoto' in req.files)) {
        //     return res.status(400).json({ message: 'No display photo uploaded' });
        // }
        // const displayPhotoFiles = req.files['displayPhoto'] as Express.Multer.File[];
        // console.log(displayPhotoFiles.length)
        // if (displayPhotoFiles.length > 1) {
        //     return res.status(400).json({ message: 'You can upload only a single display photo' });
        // }

        // No errors, proceed to the next middleware
        next();
    });
};

