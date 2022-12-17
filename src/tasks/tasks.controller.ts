
import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Task from './task.interface';
import taskModel from './tasks.model';

class TasksController implements Controller {
    public path = '/todos';
    public router = express.Router();
    private task = taskModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllTasks);
        this.router.get(`${this.path}/:id`, this.getTaskById);
        this.router.patch(`${this.path}/:id`, this.modifyTask);
        this.router.delete(`${this.path}/:id`, this.deleteTask);
        this.router.post(this.path, this.createTask);
    }

    private getAllTasks = (request: express.Request, response: express.Response) => {
        this.task.find()
            .then((tasks) => {
                response.send(tasks);
            });
    }

    private getTaskById = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.task.findById(id)
            .then((task) => {
                response.send(task);
            });
    }

    private modifyTask = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const taskData: Task = request.body;
        this.task.findByIdAndUpdate(id, taskData, { new: true })
            .then((task) => {
                response.send(task);
            });
    }

    private createTask = (request: express.Request, response: express.Response) => {
        const taskData: Task = request.body;
        const createdTask = new this.task(taskData);
        createdTask.save()
            .then((savedTask) => {
                response.send(savedTask);
            });
    }

    private deleteTask = (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        this.task.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                } else {
                    response.send(404);
                }
            });
    }
}

export default TasksController;
