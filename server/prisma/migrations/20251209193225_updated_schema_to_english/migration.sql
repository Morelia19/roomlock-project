/*
  Warnings:

  - You are about to drop the column `distrito` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creacion` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `latitud` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `longitud` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `reglas` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `anuncio_id` on the `ServicioAnuncio` table. All the data in the column will be lost.
  - You are about to drop the column `servicio` on the `ServicioAnuncio` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `VerificacionUser` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_revision` on the `VerificacionUser` table. All the data in the column will be lost.
  - You are about to drop the `ImagenAnuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mensaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Valoracion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `district` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `announcement_id` to the `ServicioAnuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `ServicioAnuncio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImagenAnuncio" DROP CONSTRAINT "ImagenAnuncio_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Mensaje" DROP CONSTRAINT "Mensaje_remitente_id_fkey";

-- DropForeignKey
ALTER TABLE "Mensaje" DROP CONSTRAINT "Mensaje_reserva_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_student_id_fkey";

-- DropForeignKey
ALTER TABLE "ServicioAnuncio" DROP CONSTRAINT "ServicioAnuncio_anuncio_id_fkey";

-- DropForeignKey
ALTER TABLE "Valoracion" DROP CONSTRAINT "Valoracion_reserva_id_fkey";

-- DropForeignKey
ALTER TABLE "Valoracion" DROP CONSTRAINT "Valoracion_user_id_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "distrito",
DROP COLUMN "fecha_creacion",
DROP COLUMN "latitud",
DROP COLUMN "longitud",
DROP COLUMN "precio",
DROP COLUMN "reglas",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "district" VARCHAR(120) NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "rules" TEXT;

-- AlterTable
ALTER TABLE "ServicioAnuncio" DROP COLUMN "anuncio_id",
DROP COLUMN "servicio",
ADD COLUMN     "announcement_id" INTEGER NOT NULL,
ADD COLUMN     "service" VARCHAR(120) NOT NULL;

-- AlterTable
ALTER TABLE "VerificacionUser" DROP COLUMN "estado",
DROP COLUMN "fecha_revision",
ADD COLUMN     "revision_date" TIMESTAMP(3),
ADD COLUMN     "state" VARCHAR(20) NOT NULL DEFAULT 'pendiente';

-- DropTable
DROP TABLE "ImagenAnuncio";

-- DropTable
DROP TABLE "Mensaje";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "Valoracion";

-- CreateTable
CREATE TABLE "ImageAnnouncement" (
    "id" SERIAL NOT NULL,
    "announcement_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImageAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "announcement_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "state" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "content" TEXT,
    "sent_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_reservation_id_key" ON "Review"("reservation_id");

-- AddForeignKey
ALTER TABLE "ImageAnnouncement" ADD CONSTRAINT "ImageAnnouncement_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioAnuncio" ADD CONSTRAINT "ServicioAnuncio_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
