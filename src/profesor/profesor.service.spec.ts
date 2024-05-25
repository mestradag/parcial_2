import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });

  describe('crearProfesor', () => {
    it('debería crear un profesor con un grupo de investigación válido', async () => {
      const grupoInvestigacion = 'TICSW';
      const profesor = new ProfesorEntity();
      profesor.grupoInvestigacion = grupoInvestigacion;

      jest.spyOn(repository, 'create').mockReturnValue(profesor);
      jest.spyOn(repository, 'save').mockResolvedValue(profesor);

      const result = await service.crearProfesor(grupoInvestigacion);
      expect(result).toEqual(profesor);
      expect(repository.create).toHaveBeenCalledWith({ grupoInvestigacion });
      expect(repository.save).toHaveBeenCalledWith(profesor);
    });

    it('debería lanzar una BadRequestException si el grupo de investigación es inválido', async () => {
      const grupoInvestigacion = faker.lorem.word(); // Grupo de investigación inválido

      await expect(service.crearProfesor(grupoInvestigacion)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findProfesorById', () => {
    it('debería devolver un profesor por ID', async () => {
      const id = faker.datatype.number();
      const grupoInvestigacion = 'TICSW';
      const profesor = new ProfesorEntity();
      profesor.id = id;
      profesor.grupoInvestigacion = grupoInvestigacion;

      jest.spyOn(repository, 'findOne').mockResolvedValue(profesor);

      const result = await service.findProfesorById(id);
      expect(result).toEqual(profesor);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('debería devolver null si no se encuentra el profesor', async () => {
      const id = faker.datatype.number();

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findProfesorById(id);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('deleteProfesor', () => {
    it('debería eliminar un profesor sin propuestas asociadas', async () => {
      const id = faker.datatype.number();
      const profesor = new ProfesorEntity();
      profesor.id = id;
      profesor.propuesta = null;

      jest.spyOn(service, 'findProfesorById').mockResolvedValue(profesor);
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.deleteProfesor(id);
      expect(service.findProfesorById).toHaveBeenCalledWith(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('debería lanzar una BadRequestException si el profesor tiene una propuesta con un proyecto asociado', async () => {
      const id = faker.datatype.number();
      const profesor = new ProfesorEntity();
      profesor.id = id;
      profesor.propuesta = { proyecto: {} } as any; // Propuesta con un proyecto asociado

      jest.spyOn(service, 'findProfesorById').mockResolvedValue(profesor);

      await expect(service.deleteProfesor(id)).rejects.toThrow(BadRequestException);
    });
  });

  describe('eliminarProfesor', () => {
    it('debería eliminar un profesor por cédula sin propuestas asociadas', async () => {
      const cedula = faker.datatype.number();
      const profesor = new ProfesorEntity();
      profesor.cedula = cedula;
      profesor.propuesta = null;

      jest.spyOn(repository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.eliminarProfesor(cedula);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { cedula } });
      expect(repository.delete).toHaveBeenCalledWith(profesor);
    });

    it('debería lanzar una BadRequestException si el profesor tiene una propuesta con un proyecto asociado', async () => {
      const cedula = faker.datatype.number();
      const profesor = new ProfesorEntity();
      profesor.cedula = cedula;
      profesor.propuesta = { proyecto: {} } as any; // Propuesta con un proyecto asociado

      jest.spyOn(repository, 'findOne').mockResolvedValue(profesor);

      await expect(service.eliminarProfesor(cedula)).rejects.toThrow(BadRequestException);
    });
  });
});
