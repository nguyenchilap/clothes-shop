import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, './uploads/');
    },
    filename: (req, file, done) => {
        done(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, done) => {
    
}