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
import { Locations } from '../../entities/Locations';
import { Repository } from 'typeorm';

@Controller('api/location/')
@Injectable()
export class LocController {
  constructor(
    @InjectRepository(Locations) private LocRepo: Repository<Locations>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const location = await this.LocRepo.find();
      return location;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    try {
      const location = await this.LocRepo.findOne({ where: { locationId: id } });
      return location;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const location = await this.LocRepo.save({
          streetAddress: fields.streetAddress,
          postalCode: fields.postalCode,
          city: fields.city,
          stateProvince: fields.stateProvince,
          departments: fields.departments,
          country: fields.country,
        })
        return location;
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
        await this.LocRepo.update(id, {
          streetAddress: fields.streetAddress,
          postalCode: fields.postalCode,
          city: fields.city,
          stateProvince: fields.stateProvince,
          departments: fields.departments,
          country: fields.country,
        });
        return await this.LocRepo.findOne({ where: { locationId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const location = await this.LocRepo.delete(id);
      return 'Delete' + location.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
