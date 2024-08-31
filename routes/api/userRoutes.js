import express from 'express';
import UserCtrl from '../../controllers/userController.js';

const router = express.Router();

router.route('/')
    .get(UserCtrl.getUsers)
    .post(UserCtrl.addUser);

router.route('/populated')
    .get(UserCtrl.getUsersFull)

router.route('/:_id')
    .get(UserCtrl.getUser)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

router.route('/link/:_id')
    .put(UserCtrl.addRemoveLink);

router.route('/update/:_id')

export default router;