import { Controller, Post, Get, Param, Delete, Body, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ProfesorPropuestaService } from './profesor-propuesta.service';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity';

@Controller('profesor')
export class ProfesorPropuestaController {
  constructor(private readonly profesorPropuestaService: ProfesorPropuestaService) {}

  @Post(':profesorId/propuesta')
  async addPropuestaToProfesor(
    @Param('profesorId') profesorId: number,
    @Body() propuesta: PropuestaEntity,
  ): Promise<PropuestaEntity> {
    return this.profesorPropuestaService.addPropuestaToProfesor(profesorId, propuesta);
  }

  @Put(':profesorId/propuesta/:propuestaId')
  async associatePropuestaToProfesor(
    @Param('profesorId') profesorId: number,
    @Param('propuestaId') propuestaId: number,
  ): Promise<string> {
    try {
      return await this.profesorPropuestaService.associatePropuestaToProfesor(profesorId, propuestaId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':profesorId/propuestas')
  async findPropuestasByProfesorId(@Param('profesorId') profesorId: number, @Param('propuestaId') propuestaId: number): Promise<PropuestaEntity[]> {
    return this.profesorPropuestaService.findPropuestasByProfesorId(profesorId);
  }
}
