import { response, request } from "express";
import Task from './task.model.js';
import {format} from 'date-fns';

export const createTask = async (req, res) =>{

    const {taskName, taskIntegrants, taskInitialDate, taskEndDate, taskStatus} = req.body;

    const datePartsIntial = taskInitialDate.split(" ");
    const dateIntial = datePartsIntial[0];
    const timeIntial = datePartsIntial[1];
    const [dayInitial, monthInitial, yearInitial] = dateIntial.split("/");
    const isoDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}T${timeIntial}:00.000Z`;

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
        msg: `${req.user.name} ${req.user.lastname} the task was created successful`
    });


}