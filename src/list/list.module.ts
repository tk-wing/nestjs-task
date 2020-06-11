import { IListRepository } from '@/models/list/interface/repository.interface';
import { IListAppService } from '@/models/list/interface/service.interface';
import { ListService } from '@/models/list/list.model';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ListController } from './list.controller';
import { ListRepository } from './list.repository';
import { ListAppService } from './list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ListController],
  providers: [
    {
      provide: IListAppService,
      useClass: ListAppService,
    },
    {
      provide: ListService,
      useFactory: (listRepository: IListRepository) => new ListService(listRepository),
      inject: [ListRepository],
    }
  ],
  exports: [
    {
      provide: IListAppService,
      useClass: ListAppService,
    },
  ],
})
export class ListModule {}
