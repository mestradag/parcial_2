import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  describe('createEstudiante', () => {
    it('debería crear un estudiante con un código válido', async () => {
      const codigo = faker.random.alphaNumeric(10);
      const estudiante = new EstudianteEntity();
      estudiante.codigo = codigo;

      jest.spyOn(repository, 'create').mockReturnValue(estudiante);
      jest.spyOn(repository, 'save').mockResolvedValue(estudiante);

      const result = await service.createEstudiante(codigo);
      expect(result).toEqual(estudiante);
      expect(repository.create).toHaveBeenCalledWith({ codigo });
      expect(repository.save).toHaveBeenCalledWith(estudiante);
    });

    it('debería lanzar una BadRequestException si el código no tiene 10 caracteres', async () => {
      const codigo = faker.random.alphaNumeric(5); // Código inválido

      await expect(service.createEstudiante(codigo)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findEstudianteById', () => {
    it('debería devolver un estudiante por ID', async () => {
      const id = faker.datatype.number();
      const codigo = faker.random.alphaNumeric(10);
      const estudiante = new EstudianteEntity();
      estudiante.id = id;
      estudiante.codigo = codigo;

      jest.spyOn(repository, 'findOne').mockResolvedValue(estudiante);

      const result = await service.findEstudianteById(id);
      expect(result).toEqual(estudiante);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('debería devolver null si no se encuentra el estudiante', async () => {
      const id = faker.datatype.number();

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findEstudianteById(id);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
