/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async createEstudiante(@Body('codigo') codigo: string): Promise<EstudianteEntity> {
        try {
            return await this.estudianteService.createEstudiante(codigo);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async findEstudianteById(@Param('id') id: number): Promise<EstudianteEntity> {
        try {
            const estudiante = await this.estudianteService.findEstudianteById(id);
            if (!estudiante) {
                throw new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
            }
            return estudiante;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
