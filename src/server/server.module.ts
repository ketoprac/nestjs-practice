import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigMulter } from './Middleware/multer.conf';
import { MulterModule } from '@nestjs/platform-express';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { Departments } from '../entities/Departments';
import { Jobs } from '../entities/Jobs';
import { Locations } from '../entities/Locations';
import { Employees } from '../entities/Employees';
import { JobHistory } from '../entities/JobHistory';
import { RegControll } from './Controller/reg.con';
import { CountryController } from './Controller/country.con';
import { DepController } from './Controller/department.con';
import { JobController } from './Controller/job.con';
import { LocController } from './Controller/location.con';
import { EmpController } from './Controller/employee.con';
import { JobHistoryController } from "./Controller/jobhistory.con";

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries, Departments, Jobs, Locations, Employees, JobHistory]),
    MulterModule.register(ConfigMulter.UploadFiles()),
  ],
  providers: [],
  controllers: [RegControll, CountryController, DepController, JobController, LocController, EmpController, JobHistoryController],
})
export class ServerModule {}