import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProyectoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    url: string;

    @OneToOne(type => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante: EstudianteEntity;

    @OneToOne(type => PropuestaEntity, propuesta => propuesta.proyecto)
    propuesta: PropuestaEntity;

}
