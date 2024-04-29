import { response, request } from "express";
import Task from './task.model.js';
import {format} from 'date-fns';

export const createTask = async (req, res) =>{

    const {taskName, taskIntegrants, taskInitialDate, taskEndDate, taskStatus} = req.body;

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
        taskCreator: req.user.name,
        taskIntegrants,
        taskInitialDate: isoDateInitial,
        taskEndDate: isoDateEnd,
        taskStatus


    });

    await task.save();

    res.status(200).json({
        msg: `${req.user.name} with username ${req.user.username} the task was created successful`
    });


}

export const updateTask = async (req, res = response) =>{

    const {id} = req.body;

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

    await Task.findByIdAndUpdate(id, {rest, taskInitialDate: isoDateInitial, taskEndDate: isoDateEnd});

    const task = await Task.findOne({_id: id});

    res.status(200).json({
        msg: `The task was update succesfully`
    });

}

export const deleteTask = async(req, res) =>{

    const {id} = req.params;

    const task = await Task.findByIdAndUpdate(id, {taskStatus: "CANCEL"});

    res.status(200).json({
        msg: `TASK deleted successfully`
    })

}

export const listTasks = async (req, res = response) => {

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