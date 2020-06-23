import { UserRepository } from '@/auth/user.repository';
import { TypeOrmConfig } from '@/config/typeorm-config';
import { UserModel } from '@/models/user/user.model';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UserRepository', async () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfig,
        }),
        TypeOrmModule.forFeature([UserRepository]),
      ]
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  it('ユーザー作成', async() => {
    const testData = {
      username: 'example',
      mail: 'example@example.com',
      password: 'password'
    };
    const userModel = new UserModel(testData);

    const user = await userRepository.createUser(userModel);

    const expectData = {
      id: 'id',
      username: 'example',
      mail: 'example@example.com',
      password: 'password'
    }

    expect(expectData).toMatchObject(user)
  })

});
