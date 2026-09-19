CREATE DATABASE IF NOT EXISTS venta_pixel_store;
USE venta_pixel_store;

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY not null,
    nombre_cliente VARCHAR(50) NOT NULL,
    email_cliente VARCHAR(50) NOT NULL,
    contraseña VARCHAR(50) NOT NULL
);


CREATE TABLE productos (
    id_producto INT PRIMARY KEY not null,
    nombre_producto VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio_compra DECIMAL(10, 3) NOT NULL CHECK (precio_compra >= 0)
);


CREATE TABLE Compras (
    id_compra INT PRIMARY KEY,
    id_cliente INT,
    fecha DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE Detalle_Compra (
    id_compra INT,  
    id_producto INT, 
    PRIMARY KEY (id_compra, id_producto),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

DELIMITER $
CREATE PROCEDURE sp_insertar_registro_usuario (
in p_id_cliente int,
IN p_nombre_cliente VARCHAR(50),
IN p_email_cliente VARCHAR(50),
in p_contraseña VARCHAR(50)
)
BEGIN
INSERT INTO clientes (id_cliente, nombre_cliente, email_cliente, contraseña)
VALUES (p_id_cliente, p_nombre_cliente, p_email_cliente, p_contraseña);
END $ 
DELIMITER ;

DELIMITER $
CREATE PROCEDURE sp_consultar_registro_producto_x_cliente_detalle_producto (
IN p_id_cliente INT,
in p_precio_compra DECIMAL)
BEGIN
SELECT * FROM compras, productos WHERE id_cliente = p_id_cliente and precio_compra = p_precio_compra;
END $
DELIMITER ;

SELECT u.nombre_cliente, p.nombre_producto
FROM clientes As u
INNER JOIN compras As co ON u.id_cliente = co.id_cliente
INNER JOIN detalle_compra As dc ON co.id_compra = dc.id_compra
INNER JOIN productos As p ON dc.id_producto = p.id_producto;

SELECT p.id_producto, p.nombre_producto, p.precio_compra
FROM productos As p
LEFT JOIN detalle_compra As dc ON p.id_producto = dc.id_producto
WHERE dc.id_producto IS NULL;




SELECT * from clientes;

CALL  sp_consultar_registro_producto_x_cliente_detalle_producto(3, 45.00);


CALL sp_insertar_registro_usuario(3, "Peter Parker", "nosoyspiderman@techcore.io", 'Sp1d3y#Web!2099');

INSERT INTO clientes (id_cliente, nombre_cliente, email_cliente, contraseña) VALUES
(1, 'Alex Rivera', 'alex.rivera@techcore.io', 'K7#mP9$xL2'),
(2, 'Camila Zhang', 'camila.zhang@techcore.io', 'Rt4&vB8!qW5');


INSERT INTO productos (id_producto, nombre_producto, descripcion, precio_compra) VALUES
(1, 'Teclado Mecanico', 'Teclado compacto con luces led', 100.000),
(2, 'Mouse Inalambrico', 'Mouse comodo para trabajar o jugar', 65.000),
(3, 'Audifonos', 'Sonido claro y conexion inalambrica', 130.000),
(4, 'Monitor HD', 'Pantalla de 24 pulgadas para tu escritorio', 250.000),
(5, 'Camara Web', 'Imagen nitida para tus videollamadas', 55.000),
(6, 'Parlante Portatil', 'Musica con buena potencia en culquier lugar', 135.000);




insert into Compras (id_compra, id_cliente, fecha) value
(1010, 1, "26/04/23"),
(1020, 2, "26/05/12"),
(1030, 3, "26/06/15");

INSERT INTO detalle_compra(id_compra, id_producto) VALUE
(1010, 2),
(1020, 3),
(1030, 1);
drop database venta_pixel_store