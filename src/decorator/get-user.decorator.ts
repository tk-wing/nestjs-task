import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator((data, req): User => req.user);
