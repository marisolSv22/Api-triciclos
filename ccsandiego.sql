create database ccsandiego1;
use ccsandiego1;

create table login 
(
	id int auto_increment,
    correo varchar(50) not null,
    clave varchar(20) not null,
    primary key (id)
);

create table rol
(
	id int auto_increment,
    nombre varchar(30) not null,
    estado bit null,
    primary key (id)
);

create table usuario
(
	id int auto_increment,
	nombre varchar(50) not null,
    correo varchar(50) not null,
    clave varchar(30) not null,
    rol_id int null,
    primary key (id),
    foreign key (rol_id) references rol(id)
);

create table acudiente 
(
	id int auto_increment,
    fecha timestamp not null DEFAULT current_timestamp,
    encargado varchar(50) not null,
    ntriciclo int(2) not null,
    identificacion varchar(20) not null,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    telefono varchar(15) not null,
    direccion varchar(30) not null,
    correo varchar(50) not null,
    firma varchar(500) not null,
    chequear bool not null,
    horaentrega time not null,
    horadevolucion time not null,
    primary key (id)
);

create table infante
(
	id int auto_increment,
    identificacion varchar(20) not null,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    direccion varchar(30) not null,
    edad int(2) not null,
    primary key (id),
    foreign key(id) references acudiente(id)
);

create table estado 
(
	id int auto_increment,
    nombre varchar(20) not null,
    estado bit null,
    primary key (id)
);

create table evento 
(
	id int auto_increment,
    nombre varchar (50) not null,
    descripcion varchar(200) not null,
    estado_id int null,
    primary key(id),
    foreign key(id) references infante(id),
    foreign key(estado_id) references estado(id)
);

insert into rol values (1,'Administer',1);
insert into rol values (2,'User',1);

insert into estado values (1,'Activo',1);
insert into estado values (2,'Inactivo',1);

insert into usuario values (1,'maria','1234',2);

delete from rol where id=4;
select * from usuario;
select * from rol;
select * from acudiente;
