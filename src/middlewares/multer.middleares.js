import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/temp')
    },
    filename: function (req, file, cb) {

        //you can also change the original file name as you wish
        
        cb(null, file.originalname)
    }
})


const upload = multer({ storage })

export default upload;