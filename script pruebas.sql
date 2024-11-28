select * from medics;
select * from specialties;
select * from personal_data;
select * from address_data;
select * from patients;
select * from consultation_services;

delete from specialties where name = 'Neurología';
delete from address_data;
delete from personal_data;
delete from medics;
delete from patients;
delete from consultation_services;