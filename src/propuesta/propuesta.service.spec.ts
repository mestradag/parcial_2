import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  describe('createPropuesta', () => {
    it('debería crear una propuesta con un título válido', async () => {
      const titulo = faker.lorem.words(3);
      const propuesta = new PropuestaEntity();
      propuesta.titulo = titulo;

      jest.spyOn(repository, 'create').mockReturnValue(propuesta);
      jest.spyOn(repository, 'save').mockResolvedValue(propuesta);

      const result = await service.createPropuesta(titulo);
      expect(result).toEqual(propuesta);
      expect(repository.create).toHaveBeenCalledWith({ titulo });
      expect(repository.save).toHaveBeenCalledWith(propuesta);
    });

    it('debería lanzar una BadRequestException si el título está vacío', async () => {
      const titulo = ''; // Título vacío

      await expect(service.createPropuesta(titulo)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findPropuestaById', () => {
    it('debería devolver una propuesta por ID', async () => {
      const id = faker.datatype.number();
      const titulo = faker.lorem.words(3);
      const propuesta = new PropuestaEntity();
      propuesta.id = id;
      propuesta.titulo = titulo;

      jest.spyOn(repository, 'findOne').mockResolvedValue(propuesta);

      const result = await service.findPropuestaById(id);
      expect(result).toEqual(propuesta);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('debería devolver null si no se encuentra la propuesta', async () => {
      const id = faker.datatype.number();

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findPropuestaById(id);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('findAllPropuestas', () => {
    it('debería devolver todas las propuestas', async () => {
      const propuestas = [
        { id: faker.datatype.number(), titulo: faker.lorem.words(3) },
        { id: faker.datatype.number(), titulo: faker.lorem.words(3) },
      ] as PropuestaEntity[];

      jest.spyOn(repository, 'find').mockResolvedValue(propuestas);

      const result = await service.findAllPropuestas();
      expect(result).toEqual(propuestas);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('deletePropuesta', () => {
    it('debería eliminar una propuesta sin proyecto asociado', async () => {
      const id = faker.datatype.number();
      const propuesta = new PropuestaEntity();
      propuesta.id = id;
      propuesta.proyecto = null;

      jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuesta);
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.deletePropuesta(id);
      expect(service.findPropuestaById).toHaveBeenCalledWith(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('debería lanzar una BadRequestException si la propuesta tiene un proyecto asociado', async () => {
      const id = faker.datatype.number();
      const propuesta = new PropuestaEntity();
      propuesta.id = id;
      propuesta.proyecto = { titulo: faker.lorem.words(3) } as any; // Propuesta con un proyecto asociado

      jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuesta);

      await expect(service.deletePropuesta(id)).rejects.toThrow(BadRequestException);
    });
  });
});
