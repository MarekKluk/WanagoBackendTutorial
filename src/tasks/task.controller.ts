
import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Task from './task.interface';
import taskModel from './task.model';
import TaskNotFoundException from "../exceptions/TaskNotFoundException";
import validationMiddleware from "../middleware/validation.middleware";
import CreateTaskDto from "./task.dto";
import authMiddleware from "../middleware/auth.middleware";
import RequestWithUser from "../interfaces/requestWithUser.interface";

class TaskController implements Controller {
    public path = '/tasks';
    public router = express.Router();
    private task = taskModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getAllAuthorsTasks);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateTaskDto, true), this.modifyTask)
            .delete(`${this.path}/:id`, this.deleteTask)
            .post(this.path, authMiddleware, validationMiddleware(CreateTaskDto), this.createTask);
    }

    private getAllAuthorsTasks = (request: express.Request, response: express.Response) => {
        const userSearchedId = request.params.id
        this.task.find({ userId:userSearchedId })
            .then((tasks) => {
                response.send(tasks);
            });
    }

    private modifyTask = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const taskData: Task = request.body;
        this.task.findByIdAndUpdate(id, taskData, { new: true })
            .then((task) => {
                if(task) {
                    response.send(task);
                } else {
                    next(new TaskNotFoundException(id));
                }
            });
    }

    private deleteTask = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.task.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send((200).toString());
                } else {
                    next(new TaskNotFoundException(id));
                }
            });
    }

    private createTask = async (request: RequestWithUser, response: express.Response) => {
        const taskData: CreateTaskDto = request.body;
        const createdTask = new this.task({
            ...taskData,
            userId: request.user._id,
        });
        const savedTask = await createdTask.save();
        response.send(savedTask);
    }

}

export default TaskController;
