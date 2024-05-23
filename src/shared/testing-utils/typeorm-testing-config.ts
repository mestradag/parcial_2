/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ProfesorEntity, EstudianteEntity, PropuestaEntity, ProyectoEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ProfesorEntity, EstudianteEntity, PropuestaEntity, ProyectoEntity]),
];
	/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
