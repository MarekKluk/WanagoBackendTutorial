
import * as mongoose from 'mongoose';
import Task from './task.interface';

const taskSchema = new mongoose.Schema({
    userId: String,
    title: String,
    completed: Boolean,
});

const taskModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema);

export default taskModel;
