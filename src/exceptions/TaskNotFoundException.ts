
import HttpException from "./HttpException";

class TaskNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Post with id ${id} not found`);
    }
}

export default TaskNotFoundException;
