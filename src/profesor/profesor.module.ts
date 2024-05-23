import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProfesorService]
})
export class ProfesorModule {}
