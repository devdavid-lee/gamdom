import { MigrationInterface, QueryRunner } from 'typeorm';

export class SportEvent1746209203268 implements MigrationInterface {
  name = 'SportEvent1746209203268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sport_event" ("event_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_name" character varying NOT NULL, "odds" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f45b27f55d1000e34f04c2808e1" PRIMARY KEY ("event_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sport_event"`);
  }
}
