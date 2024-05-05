import { response, request } from "express";
import Task from './task.model.js';
import {format} from 'date-fns';

export const createTask = async (req, res) =>{

    const {taskName, taskDescription, taskIntegrants, taskInitialDate, taskEndDate, taskStatus} = req.body;

    const datePartsInitial = taskInitialDate.split(" ");
    const dateInitial = datePartsInitial[0];
    const timeInitial = datePartsInitial[1];
    const [dayInitial, monthInitial, yearInitial] = dateInitial.split("/");
    const isoDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}T${timeInitial}:00.000Z`;

    const datePartsEnd = taskEndDate.split(" ");
    const dateEnd = datePartsEnd[0];
    const timeEnd = datePartsEnd[1];
    const [dayEnd, monthEnd, yearEnd] = dateEnd.split("/");
    const isoDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}T${timeEnd}:00.000Z`;

    const task = Task({

        taskName,
        taskDescription,
        taskCreator: req.user.name,
        taskIntegrants: req.user.role === 'USER_ROLE' ? undefined : taskIntegrants,
        taskInitialDate: isoDateInitial,
        taskEndDate: isoDateEnd,
        taskStatus

    });

    await task.save();

    res.status(200).json({
        msg: `${req.user.name} with username ${req.user.username} the task was created successful`
    });
};

export const updateTask = async (req, res = response) =>{

    const {taskId} = req.body;

    const {_id, taskCreator, ...rest} = req.body;

    const datePartsInitial = rest.taskInitialDate.split(" ");
    const dateInitial = datePartsInitial[0];
    const timeInitial = datePartsInitial[1];
    const [dayInitial, monthInitial, yearInitial] = dateInitial.split("/");
    const isoDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}T${timeInitial}:00.000Z`;

    const datePartsEnd = rest.taskEndDate.split(" ");
    const dateEnd = datePartsEnd[0];
    const timeEnd = datePartsEnd[1];
    const [dayEnd, monthEnd, yearEnd] = dateEnd.split("/");
    const isoDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}T${timeEnd}:00.000Z`;

    await Task.findByIdAndUpdate(taskId, {...rest, taskInitialDate: isoDateInitial, taskEndDate: isoDateEnd});

    const task = await Task.findOne({_id: taskId});

    res.status(200).json({
        msg: `The task was update succesfully`
    });

}


export const deleteTask = async(req, res) =>{

    const {taskId} = req.body;

    const task = await Task.findByIdAndUpdate(taskId, {taskStatus: "CANCEL"});

    res.status(200).json({
        msg: `Task deleted successfully`
    })

}

export const listTask = async (req, res = response) => {

    const { limit, from } = req.query;
    const query = { taskStatus: {$ne:"CANCEL"} };

    const [total, task] = await Promise.all([
        Task.countDocuments(query),
        Task.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        task
    });

}

export const listTaskByUser = async (req, res = response) => {

    try {
        
        const { limit, from } = req.query;
        const { name } = req.user;
        const query = { taskStatus: {$ne:"CANCEL"}, taskCreator: name };

        const [total, task] = await Promise.all([
            Task.countDocuments(query),
            Task.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            task
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error ocurred when try to list the task by user.");
    }
}