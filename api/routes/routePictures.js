const express = require('express');
const { listPictures, getPictureID, createPicture, editPicture, deletePicture } = require('../controllers/pictureController');
const router = express.Router();

router.get('/', listPictures);
router.get('/:id', getPictureID);
router.post('/', createPicture);
router.put('/:id', editPicture);
router.delete('/:id', deletePicture);

module.exports = router;