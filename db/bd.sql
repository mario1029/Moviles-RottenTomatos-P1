CREATE TABLE "pelicula_serie" (
  "id_pelicula_serie" varchar PRIMARY KEY,
  "titulo" varchar,
  "anio" varchar,
  "tipo" varchar,
  "genero" varchar,
  "duracion" varchar,
  "director" varchar,
  "actores" varchar,
  "sinopsis" text,
  "poster" text,
  "Rating" numeric
);

CREATE TABLE "usuario" (
  "alias" varchar PRIMARY KEY,
  "correo" varchar UNIQUE,
  "descripcion" text,
  "contrasenia" varchar
);

CREATE TABLE "comentario" (
  "id_pelicula_serie" varchar,
  "alias" varchar,
  "contenido" text,
  "puntuacion" numeric,
  "fecha" timestamp default CURRENT_TIMESTAMP,
  PRIMARY KEY ("id_pelicula_serie", "alias")
);

ALTER TABLE "comentario" ADD FOREIGN KEY ("id_pelicula_serie") REFERENCES "pelicula_serie" ("id_pelicula_serie");

ALTER TABLE "comentario" ADD FOREIGN KEY ("alias") REFERENCES "usuario" ("alias");

CREATE OR REPLACE FUNCTION ratings() RETURNS TRIGGER AS $ratings$
   BEGIN
      UPDATE pelicula_serie SET Rating=(SELECT AVG(puntuacion) FROM comentario WHERE id_pelicula_serie=new.id_pelicula_serie) WHERE id_pelicula_serie=new.id_pelicula_serie;
      RETURN NEW;
   END;
$ratings$ LANGUAGE plpgsql;

CREATE TRIGGER calculo_rating AFTER INSERT ON comentario FOR EACH ROW EXECUTE PROCEDURE ratings();