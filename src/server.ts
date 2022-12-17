
import 'dotenv/config';
import App from './app';
import TasksController from './tasks/tasks.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [
        new TasksController(),
    ],
);

app.listen();
