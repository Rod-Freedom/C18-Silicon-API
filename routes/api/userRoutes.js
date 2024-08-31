import express from 'express';
import UserCtrl from '../../controllers/userController.js';

const router = express.Router();

router.route('/')
    .get(UserCtrl.getUsers)
    .post(UserCtrl.addUser);

router.route('/:_id')
    .get(UserCtrl.getUser)
    .put(UserCtrl.addRemoveLink)
    .delete(UserCtrl.deleteUser);

router.route('/update/:_id')
    .put(UserCtrl.updateUser);

export default router;