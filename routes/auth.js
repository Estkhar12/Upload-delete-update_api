const express = require('express');

const authControllers = require("../controllers/auth");

const router = express.Router();

router.get('/', authControllers.getFiles);

router.post('/', authControllers.uploadFiles);

router.get('/:fileId', authControllers.getOneFile);

router.delete('/:fileId', authControllers.deleteFiles);



module.exports = router;


