import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/public')
  @Unprotected()
  getpublic(): string {
    return `${this.usersService.getHello()} from public`;
  }
  @Get('/user')
  getUser(): string {
    return `${this.usersService.getHello()} from user`;
  }
  @Get('/admin')
  getAdmin(): string {
    return `${this.usersService.getHello()} from admin`;
  }
  @Get('/all')
  getAll(): string {
    return `${this.usersService.getHello()} from all`;
  }
}
