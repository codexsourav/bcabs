import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads');
    },
    filename: function (req, file, cb) {
        const allowExt = ['jpg', 'png', 'jpeg', 'webp'];
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
        const fileExtension = file.originalname.split('.').pop().toLowerCase();

        if (!allowExt.includes(fileExtension)) {
            return cb(new Error('Invalid File format Not allowed! .' + fileExtension + ' File'));
        }

        const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;
        cb(null, uniqueFileName);
    },
});

const uploader = multer({ storage: storage });

export default uploader;
