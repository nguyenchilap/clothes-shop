import multer from "multer";
import storage from "../shared/cloudinary.js";

const fileFilter = (req, file, done) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        done(null, true);
    } else {
        done({message: 'Unsupported file'}, false);
    }
}

const upload = multer({
    storage,
    fileFilter
});

export default upload