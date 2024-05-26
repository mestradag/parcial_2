import { PropuestaEntity } from "src/propuesta/propuesta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number; 

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numeroExtension: number;

    @OneToMany(type => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas: PropuestaEntity[];

}
