import { Body, Controller, Put } from '@nestjs/common';
import { IsValid } from '@nestcloud2/validations';
import { PersonDto } from './person.dto';

@Controller()
export class AppController {
    @Put('/')
    put(@Body('person', new IsValid()) person: PersonDto) {}
}
