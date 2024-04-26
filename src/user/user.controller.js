import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';


export const createUser = async (req, res) => {
    const { name, lastname, email, password, role } = req.body;
    const user = new User({ name, lastname, email, password, role });


    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user,
    });
}


export const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, rest);

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'User updated successfully',
        user,
    });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { estado: false });

    const authenticatedUser = req.user;

    res.status(200).json({ msg: 'User desactivate', user, authenticatedUser });
}