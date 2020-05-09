import { Controller, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {

  @Post()
  create(){
    console.log('This is task create on controller.');
    return 'This is task create on controller.';
  }
}
