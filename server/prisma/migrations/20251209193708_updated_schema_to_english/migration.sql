/*
  Warnings:

  - You are about to drop the `ServicioAnuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificacionUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicioAnuncio" DROP CONSTRAINT "ServicioAnuncio_announcement_id_fkey";

-- DropForeignKey
ALTER TABLE "VerificacionUser" DROP CONSTRAINT "VerificacionUser_user_id_fkey";

-- DropTable
DROP TABLE "ServicioAnuncio";

-- DropTable
DROP TABLE "VerificacionUser";

-- CreateTable
CREATE TABLE "UserVerification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url_dni" TEXT,
    "url_carne" TEXT,
    "state" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "revision_date" TIMESTAMP(3),

    CONSTRAINT "UserVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnouncementService" (
    "id" SERIAL NOT NULL,
    "announcement_id" INTEGER NOT NULL,
    "service" VARCHAR(120) NOT NULL,

    CONSTRAINT "AnnouncementService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerification_user_id_key" ON "UserVerification"("user_id");

-- AddForeignKey
ALTER TABLE "UserVerification" ADD CONSTRAINT "UserVerification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementService" ADD CONSTRAINT "AnnouncementService_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
