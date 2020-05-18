import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateListTable1589646532523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lists',
        columns: [{
					name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
				},
				{
					name: 'user_id',
					type: 'int',
					unsigned: true,
				},
				{
					name: 'name',
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

		await queryRunner.createForeignKey(
      'lists',
      new TableForeignKey({
        name: 'lists',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
      'lists',
      'lists_user_id_foreign'
    );
		await queryRunner.dropTable('lists');
	}
}
