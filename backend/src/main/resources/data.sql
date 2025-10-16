-- Insertar roles si no existen
INSERT INTO rol (nombre) SELECT 'ADMIN' WHERE NOT EXISTS (SELECT 1 FROM rol WHERE nombre = 'ADMIN');
INSERT INTO rol (nombre) SELECT 'MEDICO' WHERE NOT EXISTS (SELECT 1 FROM rol WHERE nombre = 'MEDICO');
INSERT INTO rol (nombre) SELECT 'RECEPCIONISTA' WHERE NOT EXISTS (SELECT 1 FROM rol WHERE nombre = 'RECEPCIONISTA');
INSERT INTO rol (nombre) SELECT 'ENFERMERA' WHERE NOT EXISTS (SELECT 1 FROM rol WHERE nombre = 'ENFERMERA');

-- Eliminar usuario 'admin' si existe
DELETE FROM usuario WHERE nombre_usuario = 'admin';

-- Insertar usuario admin con contraseña encriptada (password123)
INSERT INTO usuario (nombre_usuario, contrasena, rol)
VALUES ('admin', '$2a$10$w2/a.s.4.s.5.q.6.e.7.t.8.u.9.i.0.o.1.p.2.q.3.r.4.s.5.t', 'ADMIN');

-- Insertar un usuario de prueba con contraseña encriptada (password)
INSERT INTO usuario (nombre_usuario, contrasena, rol)
VALUES ('testuser', '$2a$10$g.A.4.d.3.c.2.b.1.a.9.z.8.y.7.x.6.w.5.v.4.u.3.t.2.s', 'MEDICO');