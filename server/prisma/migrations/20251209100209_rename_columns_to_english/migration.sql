/*
  Warnings:

  - You are about to drop the column `estudiante_id` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Valoracion` table. All the data in the column will be lost.
  - You are about to drop the `Anuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificacionUsuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `student_id` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Valoracion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anuncio" DROP CONSTRAINT "Anuncio_propietario_id_fkey";

-- DropForeignKey
ALTER TABLE "ImagenAnuncio" DROP CONSTRAINT "ImagenAnuncio_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Mensaje" DROP CONSTRAINT "Mensaje_remitente_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_estudiante_id_fkey";

-- DropForeignKey
ALTER TABLE "ServicioAnuncio" DROP CONSTRAINT "ServicioAnuncio_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Valoracion" DROP CONSTRAINT "Valoracion_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "VerificacionUsuario" DROP CONSTRAINT "VerificacionUsuario_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "estudiante_id",
ADD COLUMN     "student_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Valoracion" DROP COLUMN "usuario_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Anuncio";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "VerificacionUsuario";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "password" TEXT NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificacionUser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url_dni" TEXT,
    "url_carne" TEXT,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "fecha_revision" TIMESTAMP(3),

    CONSTRAINT "VerificacionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "distrito" VARCHAR(120) NOT NULL,
    "reglas" TEXT,
    "latitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificacionUser_user_id_key" ON "VerificacionUser"("user_id");

-- AddForeignKey
ALTER TABLE "VerificacionUser" ADD CONSTRAINT "VerificacionUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenAnuncio" ADD CONSTRAINT "ImagenAnuncio_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioAnuncio" ADD CONSTRAINT "ServicioAnuncio_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
