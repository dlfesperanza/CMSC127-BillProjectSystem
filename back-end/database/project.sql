drop database bill_files;

create database if not exists `bill_files`;
	use `bill_files`;

create table if not exists `legislator`(
	`empid` int(6) not null auto_increment,
	`fname` varchar(20),
	`mname` varchar(20),
	`lname` varchar(20),
	`bday` date,
	`sex` varchar(1),
	`type` varchar(15),
	`sal` int(7),
	`noofterms` int(2),
	`termstart` date,
	`termend` date,
	constraint `legislator_empid_pk` primary key(empid)
);

create table if not exists `bill`(
	`billno` int(6) not null,
	`title` text not null,
	`body` text not null,
	`billtype` varchar(20) not null,
	`scope` varchar(20) not null,
	`status` varchar(30),
	`reading` varchar(3),
	`datefiled` date not null,
	constraint `bill_billno_pk` primary key(billno)
);
create table if not exists `bill_subject`(
	`billno` int(6),
	`subject` varchar(20),
	constraint `bill_subject_billno_fk` foreign key (billno) references bill(billno)
);
create table if not exists `bill_author`(
	`billno` int(6) not null,
	`empid` int(6) not null,
	constraint `bil_author_billno_fk` foreign key(billno) references bill(billno),
	constraint `bill_author_empid_fk` foreign key(empid) references legislator(empid)
);


delimiter //


create procedure addBill(billno int(6), title text, body text, billtype varchar(20), scope varchar(20), status varchar(30),reading varchar(6), datefiled date)
begin
insert into `bill` values(billno, title, body, billtype, scope, status, reading, datefiled);
end //
create procedure addBillAuthor(billno int(6), empid int(6))
begin
insert into `bill_author` values(billno, empid);
end //
create procedure addBillSubject(billno int(6), subject varchar(20))
begin
insert into `bill_subject` values(billno, subject);
end //

create procedure addLegislator(fname varchar(20), mname varchar(20),lname varchar(20),bday date,sex varchar(1), type varchar(15),sal int(7), noofterms int(2),termstart date)
begin
insert into `legislator`(fname, mname, lname, bday, sex, type, sal, noofterms, termstart, termend) values(fname, mname, lname, bday, sex, type, sal, noofterms, termstart, adddate(termstart, interval 6 year));
end //

create procedure deleteBill(bill_no int(6))
	begin
		delete from `bill_author` where billno=bill_no;
		delete from `bill_subject` where billno=bill_no;
		delete from `bill` where billno=bill_no;

	end //


create procedure deleteLegislator(emp_id int(6))
	begin
		delete from `legislator` where empid=emp_id;
	end //

delimiter ;
