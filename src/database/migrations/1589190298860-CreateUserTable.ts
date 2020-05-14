import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1589190298860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
						type: 'varchar',
						length: '191',
          },
          {
            name: 'mail',
						type: 'varchar',
						length: '191',
            isUnique: true,
          },
          {
						name: 'password',
						type: 'varchar',
						length: '191',
          },
          {
            name: 'created_at',
            type: 'datetime',
						default: 'CURRENT_TIMESTAMP',
						isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'datetime',
						default: 'CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP',
						isNullable: true,
					},
					{
            name: 'deleted_at',
            type: 'datetime',
						isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
