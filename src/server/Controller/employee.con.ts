import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../../entities/Employees';
import { Repository } from 'typeorm';

@Controller('api/employee/')
@Injectable()
export class EmpController {
  constructor(
    @InjectRepository(Employees) private EmpRepo: Repository<Employees>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const employee = await this.EmpRepo.find();
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const employee = await this.EmpRepo.findOne({ where: { employeeId: id } });
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const employee = await this.EmpRepo.save({
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          phoneNumber: fields.phoneNumber,
          hireDate: fields.hireDate,
          salary: fields.salary,
          commissionPct: fields.commissionPct,
          xempId: fields.xempId,
          department: fields.department,
          job: fields.job,
          manager: fields.manager,
        })
        return employee;
    } catch (error) {
      return error.message;
    }
  }

  @Put(':id')
  public async Updated(
    @Body() fields: any,
    @Param('id') id: number,
  ) {
    try {
        await this.EmpRepo.update(id, {
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          phoneNumber: fields.phoneNumber,
          hireDate: fields.hireDate,
          salary: fields.salary,
          commissionPct: fields.commissionPct,
          xempId: fields.xempId,
          departments: fields.departments,
          department: fields.department,
          job: fields.job,
          manager: fields.manager,
          employees: fields.employees,
          jobHistories: fields.jobHistories,
        });
        return await this.EmpRepo.findOne({ where: { employeeId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const employee = await this.EmpRepo.delete(id);
      return 'Delete' + employee.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
