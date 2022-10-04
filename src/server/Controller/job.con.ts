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
import { Jobs } from '../../entities/Jobs';
import { Repository } from 'typeorm';

@Controller('api/job/')
@Injectable()
export class JobController {
  constructor(
    @InjectRepository(Jobs) private JobRepo: Repository<Jobs>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const job = await this.JobRepo.find();
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    try {
      const job = await this.JobRepo.findOne({ where: { jobId: id } });
      return job;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const job = await this.JobRepo.save({
          jobId: fields.jobId,
          jobTitle: fields.jobTitle,
          minSalary: fields.minSalary,
          maxSalary: fields.maxSalary,
          employees: fields.employees,
          jobHistories: fields.jobHistories,
        })
        return job;
    } catch (error) {
      return error.message;
    }
  }

  @Put(':id')
  public async Updated(
    @Body() fields: any,
    @Param('id') id: string,
  ) {
    try {
        await this.JobRepo.update(id, {
          jobTitle: fields.jobTitle,
          minSalary: fields.minSalary,
          maxSalary: fields.maxSalary,
          employees: fields.employees,
          jobHistories: fields.jobHistories,
        });
        return await this.JobRepo.findOne({ where: { jobId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: string) {
    try {
      const job = await this.JobRepo.delete(id);
      return 'Delete' + job.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
