/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProfesorPropuestaEntity } from './profesor-propuesta.entity';
import { ProfesorPropuestaService } from './profesor-propuesta.service';

@Controller('profesor-propuesta')
export class ProfesorPropuestaController {
    constructor(private readonly profesorPropuestaService: ProfesorPropuestaService) {}

    @Get()
    async getAll(): Promise<ProfesorPropuestaEntity[]> {
        return this.profesorPropuestaService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ProfesorPropuestaEntity> {
        return this.profesorPropuestaService.getById(id);
    }

    @Post()
    async create(@Body() profesorPropuesta: ProfesorPropuestaEntity): Promise<ProfesorPropuestaEntity> {
        return this.profesorPropuestaService.create(profesorPropuesta);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() profesorPropuesta: ProfesorPropuestaEntity): Promise<ProfesorPropuestaEntity> {
        return this.profesorPropuestaService.update(id, profesorPropuesta);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.profesorPropuestaService.delete(id);
    }
}
