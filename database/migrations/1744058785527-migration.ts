import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744058785527 implements MigrationInterface {
    name = 'Migration1744058785527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."episodes_name_enum" AS ENUM('The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'The Rise of Skywalker')`);
        await queryRunner.query(`CREATE TABLE "episodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."episodes_name_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7cd50789aea8ad59b26c9bb784f" UNIQUE ("name"), CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "planetId" uuid, CONSTRAINT "UQ_86a2bcc85e3473ecf3693dfe5a1" UNIQUE ("name"), CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_70a170f032a2ca04a6ec6eb2d98" UNIQUE ("name"), CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characters_episodes_episodes" ("charactersId" uuid NOT NULL, "episodesId" uuid NOT NULL, CONSTRAINT "PK_e8a69d31c05f5ec4621a0becfc6" PRIMARY KEY ("charactersId", "episodesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59460ddf268318b5635bc02b2d" ON "characters_episodes_episodes" ("charactersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_024978c488012760565a6f2634" ON "characters_episodes_episodes" ("episodesId") `);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_ef2271284da4fb84b63dc417e2b" FOREIGN KEY ("planetId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" ADD CONSTRAINT "FK_59460ddf268318b5635bc02b2db" FOREIGN KEY ("charactersId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" ADD CONSTRAINT "FK_024978c488012760565a6f26347" FOREIGN KEY ("episodesId") REFERENCES "episodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" DROP CONSTRAINT "FK_024978c488012760565a6f26347"`);
        await queryRunner.query(`ALTER TABLE "characters_episodes_episodes" DROP CONSTRAINT "FK_59460ddf268318b5635bc02b2db"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_ef2271284da4fb84b63dc417e2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_024978c488012760565a6f2634"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59460ddf268318b5635bc02b2d"`);
        await queryRunner.query(`DROP TABLE "characters_episodes_episodes"`);
        await queryRunner.query(`DROP TABLE "planets"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP TABLE "episodes"`);
        await queryRunner.query(`DROP TYPE "public"."episodes_name_enum"`);
    }

}
