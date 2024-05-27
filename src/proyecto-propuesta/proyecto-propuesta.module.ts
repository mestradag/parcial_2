import { Module } from '@nestjs/common';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';
import { TypedEventEmitter } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { ProyectoPropuestaController } from './proyecto-propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity, PropuestaEntity])],
  providers: [ProyectoPropuestaService],
  controllers: [ProyectoPropuestaController]
})
export class ProyectoPropuestaModule {}
