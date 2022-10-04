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
import { Departments } from '../../entities/Departments';
import { Repository } from 'typeorm';

@Controller('api/department/')
@Injectable()
export class DepController {
  constructor(
    @InjectRepository(Departments) private DepartmentRepo: Repository<Departments>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const department = await this.DepartmentRepo.find();
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const department = await this.DepartmentRepo.findOne({ where: { departmentId: id } });
      return department;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const department = await this.DepartmentRepo.save({
          departmentName: fields.departmentName,
          location: fields.location,
          manager: fields.manager,
          employees: fields.employees,
          jobHistories: fields.jobHistories,
        })
        return department;
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
        await this.DepartmentRepo.update(id, {
          departmentName: fields.departmentName,
          location: fields.location,
          manager: fields.manager,
          employees: fields.employees,
          jobHistories: fields.jobHistories,
        });
        return await this.DepartmentRepo.findOne({ where: { departmentId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const department = await this.DepartmentRepo.delete(id);
      return 'Delete' + department.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
