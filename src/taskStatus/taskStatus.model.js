import mongoose from "mongoose";

const TaskStatusSchema = mongoose.Schema({

    taskStatusName: {

        type: String,
        required: [true, "Task Status Name is required"]

    }

});

export  default mongoose.model('TaskStatus', TaskStatusSchema);