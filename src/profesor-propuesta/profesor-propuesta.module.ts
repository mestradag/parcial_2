/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfesorPropuestaService } from './profesor-propuesta.service';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorPropuestaController } from './profesor-propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity, PropuestaEntity])],
  providers: [ProfesorPropuestaService],
  controllers: [ProfesorPropuestaController]
})
export class ProfesorPropuestaModule {}
