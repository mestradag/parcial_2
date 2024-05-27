/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity])],
  providers: [EstudianteService],
  controllers: [EstudianteController]
})
export class EstudianteModule {}
