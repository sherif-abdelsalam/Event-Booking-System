const multer = require('multer');

const storage = multer.memoryStorage(); // don't save to disk
const upload = multer({ storage });

module.exports = upload;
