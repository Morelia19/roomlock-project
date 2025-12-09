-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "correo" VARCHAR(180) NOT NULL,
    "clave_cifrada" TEXT NOT NULL,
    "rol" VARCHAR(20) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificacionUsuario" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "url_dni" TEXT,
    "url_carne" TEXT,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "fecha_revision" TIMESTAMP(3),

    CONSTRAINT "VerificacionUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" SERIAL NOT NULL,
    "propietario_id" INTEGER NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "distrito" VARCHAR(120) NOT NULL,
    "reglas" TEXT,
    "latitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenAnuncio" (
    "id" SERIAL NOT NULL,
    "anuncio_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImagenAnuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicioAnuncio" (
    "id" SERIAL NOT NULL,
    "anuncio_id" INTEGER NOT NULL,
    "servicio" VARCHAR(120) NOT NULL,

    CONSTRAINT "ServicioAnuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "anuncio_id" INTEGER NOT NULL,
    "estudiante_id" INTEGER NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "id" SERIAL NOT NULL,
    "reserva_id" INTEGER NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "contenido" TEXT,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Valoracion" (
    "id" SERIAL NOT NULL,
    "reserva_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "comentario" TEXT,

    CONSTRAINT "Valoracion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "VerificacionUsuario_usuario_id_key" ON "VerificacionUsuario"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Valoracion_reserva_id_key" ON "Valoracion"("reserva_id");

-- AddForeignKey
ALTER TABLE "VerificacionUsuario" ADD CONSTRAINT "VerificacionUsuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenAnuncio" ADD CONSTRAINT "ImagenAnuncio_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicioAnuncio" ADD CONSTRAINT "ServicioAnuncio_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_anuncio_id_fkey" FOREIGN KEY ("anuncio_id") REFERENCES "Anuncio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valoracion" ADD CONSTRAINT "Valoracion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
