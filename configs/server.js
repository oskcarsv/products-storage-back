'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bcryptjs from 'bcryptjs';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import taskRoutes from '../src/task/task.routes.js';
import User from '../src/user/user.model.js';
import Role from '../src/role/role.model.js';
import TaskStatus from '../src/taskStatus/taskStatus.model.js'


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/products-storage/v1/users';
        this.authPath = '/products-storage/v1/auth';
        this.taskPath = '/products-storage/v1/task';

        this.defaultUserAndRole();
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async defaultUserAndRole(){

        const defaultCredentials = await Role.findOne({role: "SUPER_ROLE"});

        if(!defaultCredentials){


            const roleSUPER_ROLE = new Role({role: "SUPER_ROLE"});
            const roleADMIN_ROLE = new Role({role: "ADMIN_ROLE"});
            const roleUSER_ROLE = new Role({role: "USER_ROLE"});
            const defaultUser = new User({

                name: "Super",
                lastname: "Role",
                password: "superrole123",
                email: "super@gmail.com",
                role: "SUPER_ROLE"

            });
            const taskStatusNOT_STARTED = new TaskStatus({taskStatusName: "NOT_STARTED"});
            const taskStatusIN_PROGRESS = new TaskStatus({taskStatusName: "IN_PROGRESS"});
            const taskStatusDONE = new TaskStatus({taskStatusName: "DONE"});

            const salt = bcryptjs.genSaltSync();
            defaultUser.password = bcryptjs.hashSync(defaultUser.password, salt);

            await roleSUPER_ROLE.save();
            await roleADMIN_ROLE.save();
            await roleUSER_ROLE.save();
            await defaultUser.save();
            await taskStatusNOT_STARTED.save();
            await taskStatusIN_PROGRESS.save();
            await taskStatusDONE.save();

            console.log('Default credentials have been created');

        }else{

            console.log('Default credentials have already been created');

        }


    }

    async connectDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.taskPath, taskRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;