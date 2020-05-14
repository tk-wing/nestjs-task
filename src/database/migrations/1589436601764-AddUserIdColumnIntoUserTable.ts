import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIdColumnIntoUserTable1589436601764
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
			'tasks',
      new TableColumn({
        name: 'user_id',
        type: 'int',
        unsigned: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'tasks_user_id_foreign',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'tasks',
      'tasks_user_id_foreign'
    );
    await queryRunner.dropColumn('tasks', 'user_id');
  }
}
