import express from 'express';
import morgan from 'morgan';
import clientsRoutes from './routes/clients.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cors from'cors';

import createRoles from './libs/initialSetup';

const app = express();
createRoles();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/clients', clientsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;