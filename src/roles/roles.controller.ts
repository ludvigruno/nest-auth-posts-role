import { Body, Param, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role-dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post('/create-role')
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }

  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return await this.roleService.getRoleByValue(value);
  }
}
