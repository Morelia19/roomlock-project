/*
Renaming columns from Spanish to English while preserving data
*/

-- Rename columns in Usuario table
ALTER TABLE "Usuario" RENAME COLUMN "nombre" TO "name";

ALTER TABLE "Usuario" RENAME COLUMN "correo" TO "email";

ALTER TABLE "Usuario" RENAME COLUMN "clave_cifrada" TO "password";

ALTER TABLE "Usuario" RENAME COLUMN "rol" TO "role";

ALTER TABLE "Usuario"
RENAME COLUMN "fecha_registro" TO "register_date";

-- Drop old unique constraint and create new one
DROP INDEX "Usuario_correo_key";

CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario" ("email");