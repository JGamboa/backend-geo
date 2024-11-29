const express = require('express');
const router = express.Router();
const { getUsers, addUser, updateUser, deleteUser, getUser} = require('../controllers/users');


router.get('/', getUsers);
router.post('/', addUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
