const multer = require('multer');
console.log('Arepa');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../img/storage')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });
console.log(upload);
console.log(storage);

module.exports = upload;