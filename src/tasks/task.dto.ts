
import {IsBoolean, IsNumber, IsString} from 'class-validator';

class CreateTaskDto {
    @IsString()
    public userId: string;

    @IsNumber()
    public id: number;

    @IsString()
    public title: string;

    @IsBoolean()
    public completed: boolean;
}

export default CreateTaskDto;
