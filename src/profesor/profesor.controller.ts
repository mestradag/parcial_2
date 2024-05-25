import { Controller, Post, Get, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body('grupoInvestigacion') grupoInvestigacion: string): Promise<ProfesorEntity> {
        try {
            return await this.profesorService.crearProfesor(grupoInvestigacion);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async findProfesorById(@Param('id') id: number): Promise<ProfesorEntity> {
        try {
            const profesor = await this.profesorService.findProfesorById(id);
            if (!profesor) {
                throw new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
            }
            return profesor;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async deleteProfesor(@Param('id') id: number): Promise<void> {
        try {
            await this.profesorService.deleteProfesor(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':cedula')
    async eliminarProfesor(@Param('cedula') cedula: number): Promise<void> {
        try {
            await this.profesorService.eliminarProfesor(cedula);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
