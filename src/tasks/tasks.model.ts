
import * as mongoose from 'mongoose';
import Task from './task.interface';

const taskSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    title: String,
    completed: Boolean,
});

const taskModel = mongoose.model<Task>('Task', taskSchema);

export default taskModel;
