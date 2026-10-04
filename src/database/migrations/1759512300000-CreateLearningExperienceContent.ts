import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLearningExperienceContent1759512300000 implements MigrationInterface {
  name = 'CreateLearningExperienceContent1759512300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "learning_experience_content_status_enum" AS ENUM(
        'draft',
        'active',
        'inactive',
        'archived',
        'published'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "learning_experience_content" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "learning_experience_id" uuid NOT NULL,
        "html_content" text,
        "version" integer NOT NULL DEFAULT 1,
        "status" "learning_experience_content_status_enum" NOT NULL DEFAULT 'draft',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" uuid,
        "updated_by" uuid,
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_learning_experience_content" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_learning_experience_content_experience" UNIQUE ("learning_experience_id"),
        CONSTRAINT "FK_learning_experience_content_experience"
          FOREIGN KEY ("learning_experience_id")
          REFERENCES "learning_experiences"("id")
          ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_lec_experience"
      ON "learning_experience_content" ("learning_experience_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "learning_experience_content"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "learning_experience_content_status_enum"`);
  }
}
