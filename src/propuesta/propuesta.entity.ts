import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
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

    @ManyToOne(type => ProfesorEntity, profesor => profesor.propuesta)
    profesor: ProfesorEntity;

}
