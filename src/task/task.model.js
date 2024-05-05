import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({

    taskName: {

        type: String,
        required: [true, "Task Name is required"]

    },

    taskDescription: {

        type: String,
        required: [true, "Task Description is required"]
        
    },

    taskCreator: {

        type: String,
        required: [true, "The Creator of the Task is required"]

    },

    taskIntegrants: {

        type: [String],
        required: [true, "The Integrants of the Task is required"]

    },

    taskInitialDate: {

        type: Date,
        required: [true, "The Initial Date of the task is required"]

    },

    taskEndDate: {

        type: Date,

    },

    taskStatus: {

        type: String,
        required: [true, "The Status of the task is required"]

    }


});

export default mongoose.model('Task', TaskSchema);