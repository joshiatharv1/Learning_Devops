import  express  from 'express';
import userController from '../Controller/userController.js'
import basicAuthMiddleware from '../Middlewares/basicAuth.js';
const router = express.Router();


router.post('/', userController.register); //First TIme USers 
router.get('/', userController.getUserDetails);
router.get('/self', basicAuthMiddleware, userController.getUserDetails); //Get USer Info
router.put('/self', basicAuthMiddleware, userController.updateUserDetails); // Update User Info


export default router;
