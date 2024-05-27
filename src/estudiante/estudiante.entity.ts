/* eslint-disable prettier/prettier */
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @Column()
    codigo: string;

    @Column()
    numCreditosA: number;
    
    @OneToOne(type => ProyectoEntity, proyecto => proyecto.estudiante)
    proyecto: ProyectoEntity;
}
