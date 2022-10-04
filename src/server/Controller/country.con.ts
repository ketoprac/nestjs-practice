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
import { Countries } from '../../entities/Countries';
import { Repository } from 'typeorm';

@Controller('api/country/')
@Injectable()
export class CountryController {
  constructor(
    @InjectRepository(Countries) private CountryRepo: Repository<Countries>,
  ) {}

  @Get()
  public async GetAll() {
    try {
      const country = await this.CountryRepo.find();
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    try {
      const country = await this.CountryRepo.findOne({ where: { countryId: id } });
      return country;
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  public async Create(@Body() fields: any) {
    try {
        const country = await this.CountryRepo.save({
          countryName: fields.countryName,
          region: fields.region,
          locations: fields.locations,
        })
        return country;
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
        await this.CountryRepo.update(id, {
          countryName: fields.countryName,
          region: fields.region,
          locations: fields.locations,
        });
        return await this.CountryRepo.findOne({ where: { countryId: id } });
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    try {
      const country = await this.CountryRepo.delete(id);
      return 'Delete' + country.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }

}
