import { Module } from '@nestjs/common';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProyectoEstudianteController } from './proyecto-estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity, EstudianteEntity])],
  providers: [ProyectoEstudianteService],
  controllers: [ProyectoEstudianteController]
})
export class ProyectoEstudianteModule {}
