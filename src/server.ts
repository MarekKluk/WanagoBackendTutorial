
import 'dotenv/config';
import App from './app';
import TaskController from './tasks/task.controller';
import validateEnv from './utils/validateEnv';
import AuthenticationController from "./authentication/authentication.controller";

validateEnv();

const app = new App(
    [
        new TaskController(),
        new AuthenticationController()
    ],
);

app.listen();

