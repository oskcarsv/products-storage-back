
import Role from '../role/role.model.js';

import User from '../user/user.model.js';

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
        throw new Error(`The ID: ${id} doesn't exist`);
    }
}