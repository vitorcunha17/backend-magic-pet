import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import LikeController from './app/controllers/LikeController';
import PetController from './app/controllers/PetController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/refresh-token', SessionController.update);

routes.post('/posts', upload.single('file'), PostController.store);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts/:id', upload.single('file'), PostController.update);
routes.delete('/posts/:id', PostController.destroy);

routes.get('/likes/:id', LikeController.show);
routes.post('/likes/:postId', LikeController.store);
routes.delete('/likes/:postId', LikeController.destroy);

routes.post('/pets', PetController.store);
routes.get('/pets', PetController.index);

export default routes;
