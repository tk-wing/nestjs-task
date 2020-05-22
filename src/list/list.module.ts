import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListAppService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { AuthModule } from '../auth/auth.module';
import { ListService } from '@/models/list/list.model';
import { IListRepository } from '@/models/list/interface/repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListRepository]),
    AuthModule,
  ],
  controllers: [ListController],
  providers: [
    {
      provide: 'IListAppService',
      useClass: ListAppService,
    },
    {
      provide: 'ListService',
      useFactory: (listRepository: IListRepository) => new ListService(listRepository),
      inject: [ListRepository],
    }
  ],
})
export class ListModule {}
