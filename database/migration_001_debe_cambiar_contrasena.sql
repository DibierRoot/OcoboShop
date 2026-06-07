ALTER TABLE Cliente
ADD COLUMN debe_cambiar_contrasena TINYINT(1) DEFAULT 0 AFTER contrasena;
