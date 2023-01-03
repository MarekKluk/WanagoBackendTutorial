
import {IsBoolean, IsString} from 'class-validator';

class CreateTaskDto {
    @IsString()
    public userId: string;

    @IsString()
    public title: string;

    @IsBoolean()
    public completed: boolean;
}

export default CreateTaskDto;
