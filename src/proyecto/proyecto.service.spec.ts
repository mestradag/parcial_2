import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  describe('createProyecto', () => {
    it('debería crear un proyecto con fechas válidas', async () => {
      const fechaInicio = faker.date.past();
      const fechaFin = faker.date.future();
      const proyecto = new ProyectoEntity();
      proyecto.fechaInicio = fechaInicio;
      proyecto.fechaFin = fechaFin;

      jest.spyOn(repository, 'create').mockReturnValue(proyecto);
      jest.spyOn(repository, 'save').mockResolvedValue(proyecto);

      const result = await service.createProyecto(fechaInicio, fechaFin);
      expect(result).toEqual(proyecto);
      expect(repository.create).toHaveBeenCalledWith({ fechaInicio, fechaFin });
      expect(repository.save).toHaveBeenCalledWith(proyecto);
    });

    it('debería lanzar una BadRequestException si la fecha de inicio es posterior a la fecha de fin', async () => {
      const fechaInicio = faker.date.future();
      const fechaFin = faker.date.past();

      await expect(service.createProyecto(fechaInicio, fechaFin)).rejects.toThrow(BadRequestException);
    });

    it('debería lanzar una BadRequestException si la fecha de inicio está ausente', async () => {
      const fechaFin = faker.date.future();

      await expect(service.createProyecto(null, fechaFin)).rejects.toThrow(BadRequestException);
    });

    it('debería lanzar una BadRequestException si la fecha de fin está ausente', async () => {
      const fechaInicio = faker.date.past();

      await expect(service.createProyecto(fechaInicio, null)).rejects.toThrow(BadRequestException);
    });
  });
});
