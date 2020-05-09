import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TaskStatus } from '../../entities/task.entity';

export class CreateTaskTable1589028219688 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
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
            name: 'title',
            type: 'varchar',
            length: '191',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'status',
            type: 'enum',
            enum: [
              TaskStatus.OPEN,
              TaskStatus.IN_PROGRESS,
              TaskStatus.DONE,
            ],
          },
          {
            name: 'expired_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp on update current_timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          }
        ],
      }),
      true,
    );

    // await queryRunner.createForeignKey(
    //   'tasks',
    //   new TableForeignKey({
    //     columnNames: ['user_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'users',
    //     onDelete: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('tasks');
  }
}
