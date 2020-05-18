import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddListIdColumnIntoTaskTable1589646704310
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'list_id',
        type: 'int',
        unsigned: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'tasks_list_id_foreign',
        columnNames: ['list_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lists',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'tasks',
      'tasks_list_id_foreign'
    );
    await queryRunner.dropColumn('tasks', 'list_id');
  }
}
