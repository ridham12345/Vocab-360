import express from 'express';
import multer from 'multer';
import * as UserController from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//storage object used to store the image files to localstorage
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null,'./ui/src/public/uploads');
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

// get url to fetch all the user objects and post url to create a new user
router.route('/users')
    .get(UserController.index)
    .post(UserController.save);

//get url to get user object based on id, put url to update user object based on id, delete url to delete userobject based on id
router.route('/user/:id')
    .get(UserController.get)
    .put(upload.single("image"),UserController.update)
    .delete(UserController.remove);

//get url to get user deck 
router.route('/userdecks')
    .get(auth, UserController.getUserDeck)

//put url to update the user words in the user object, post url to fetch user words based on the filter provided,
router.route('/userWordList')
    .put(auth, UserController.updateWordslist)
    .post(auth, UserController.getWords)

//post url to get all words of particular type of the user
router.route('/userProfile')
    .post(auth, UserController.getUserWords)

// post url to signin user
router.route('/signin')
    .post(UserController.signin)

export default router;