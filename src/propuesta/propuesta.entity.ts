/* eslint-disable prettier/prettier */
import { ProfesorEntity } from '../profesor/profesor.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraClave: string;

    @OneToOne(type => ProyectoEntity, proyecto => proyecto.propuesta)
    proyecto: ProyectoEntity;

    @ManyToOne(type => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;

}
