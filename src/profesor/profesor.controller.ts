import { Controller, Post, Get, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorData: ProfesorEntity): Promise<ProfesorEntity> {
        try {
            const { grupoInvestigacion, numeroExtension, cedula, nombre} = profesorData;
            return await this.profesorService.crearProfesor(cedula, nombre, grupoInvestigacion, numeroExtension);
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
    async deleteProfesor(@Param('id') id: number): Promise<{ message: string }> {
        try {
            await this.profesorService.deleteProfesor(id);
            return { message: 'Profesor eliminado corrrectamente' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:cedula')
    async eliminarProfesor(@Param('cedula') cedula: number): Promise<{ message: string }> {
        try {
            await this.profesorService.eliminarProfesor(cedula);
            return { message: 'Profesor eliminado correctamente' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
