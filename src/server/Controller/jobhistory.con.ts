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
import { JobHistory } from '../../entities/JobHistory';
import { Repository } from 'typeorm';

@Controller('api/job_history/')
@Injectable()
export class JobHistoryController {
  constructor(
    @InjectRepository(JobHistory) private JobHistoryRepo: Repository<JobHistory>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const jobHistory = await this.JobHistoryRepo.find();
      return jobHistory;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const jobHistory = await this.JobHistoryRepo.findOne({ where: { employeeId: id } });
      return jobHistory;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const jobHistory = await this.JobHistoryRepo.save({
          employeeId: fields.employeeId,
          department: fields.department,
          job: fields.job,
          startDate: fields.startDate,
          endDate: fields.endDate,
        })
        return jobHistory;
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
        await this.JobHistoryRepo.update(id, {
          employeeId: fields.employeeId,
          department: fields.department,
          job: fields.job,
          startDate: fields.startDate,
          endDate: fields.endDate,
        });
        return await this.JobHistoryRepo.findOne({ where: { employeeId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const jobHistory = await this.JobHistoryRepo.delete(id);
      return 'Delete' + jobHistory.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
