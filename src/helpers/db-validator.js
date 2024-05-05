
import Role from '../role/role.model.js';

import User from '../user/user.model.js';

import Task from '../task/task.model.js';

import TaskStatus from '../taskStatus/taskStatus.model.js';

export const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The Role ${role} doesn't exists in database`);
    }
}

export const isValidTaskStatus = async (taskStatusName = '') => {
    const existTastStatus = await TaskStatus.findOne({ taskStatusName });
    if (!existTastStatus) {
        throw new Error(`The Task Status ${taskStatusName} doesn't exists in database`);
    }
}

export const existentEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`The Email ${email} was register`);
    }
}

export const existentUsername = async (username = '') => {
    const existUsername = await User.findOne({ username });

    if (existUsername) {
        throw new Error(`The Username ${username} was register`);
    }
}

export const existUserWithId = async (id = '') => {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`The User with ID: ${id} doesn't exist`);
    }
}

export const existTaskWithId = async (id = '') => {
    const existTask = await Task.findById(id);

    if (!existTask) {
        throw new Error(`The task with ID: ${id} doesn't exist`);
    }
}

export const isAdminOrSuperRole = (req, res, next) => {
    if(req.user.role === 'USER_ROLE' && req.body.taskIntegrants){
        return res.status(400).json({
            errors: [
                {
                    type: "field",
                    msg: "Only administrators can assign tasks to users",
                    path: "taskIntegrants",
                    location: "body"
                }
            ]
        });
    }
    next();
}

export const existUsernameForTask = async (taskIntegrants = []) =>{

    for (const integrant of taskIntegrants) {

        if(integrant.includes('@')){

            const existEmail = await User.findOne({ email: integrant });

            if(!existEmail){

                throw new Error(`We dont find the email ${integrant} in the DataBase.`);

            }

        }else{

            const existUsername = await User.findOne({ username: integrant });

            if (!existUsername) {
                throw new Error(`We dont find a username with the name ${integrant}.`);
            }
            
        }
    }

}

