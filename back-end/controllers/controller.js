'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.viewBills = (req, res, next) => {
	const queryline = 'select * from bill';
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
};

exports.addBills=(req,res,next)=>{
	const queryline="insert into bill values('" + req.body.billno +  "','"  + req.body.title +  "','"  + req.body.body +  "','"  + req.body.billtype +  "','"  + req.body.scope +   "','" + req.body.status + "','"  + req.body.reading +   "','"  + req.body.datefiled + "');" ;
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
	db.query('call addBillAuthor(' + req.body.billno + "," + req.body.empid +');');
}

exports.editBill=(req,res,next)=>{
	const queryline="update bill set " + req.body.category + "='" + req.body.value + "' where billno='" + req.body.billno + "';";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}

exports.deleteBills = (req, res, next) => {
	const queryline = "delete from bill where billno=" + req.body.billno + ";";
	console.log(queryline);
	db.query("delete from bill_author where billno="+req.body.billno+";", [], (err, res)=>{
	});
	db.query("delete from bill_subject where billno="+req.body.billno+";", [], (err, res)=>{
	});
	db.query(queryline, [], (err, result) => {
		res.send(result);
	});
};

exports.viewLegislators = (req, res, next) => {
	db.query('select * from legislator;', [], (err, result)=>{
		if (!err){
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBillsByLegislator = (req, res, next) => {
	const queryline="select * from bill a, bill_author b where a.billno=b.billno and b.empid="+ req.query.empid + ";";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}

exports.searchLegislator = (req, res, next) => {
	const queryline="select * from legislator where " + req.query.category + "='" + req.query.value + "';";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}

exports.searchLegislatorByName = (req, res, next) => {
	const queryline="select * from legislator where (fname like '%" + req.query.value + "%' or mname like '%" + req.query.value + "%' or lname like '%" + req.query.value +"%');";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}


exports.addLegislator = (req, res, next) => {
  const data = req.body
  console.log(data.fname+" "+data.mname+" "+data.lname);

  const queryline2 = 'call addLegislator("' + data.fname + '","'  + data.mname + '","' + data.lname + '","' + data.bday + '","' + data.sex + '","' + data.type + '",' + 1000 + ',' + data.noofterms + ',"' + data.termstart + '");'
  console.log(queryline2);
  db.query(queryline2, [], (err, result) => {
    if(!err){
      res.send(err);
    }else{
      res.send(err)
    }
  })
}

exports.deleteLegislator = (req, res, next) => {
	db.query("call deleteLegislator("+req.body.empid+");", [], (err, res)=>{
	});
};

exports.editLegislator=(req,res,next)=>{
	const queryline="update legislator set " + req.query.category + "='" + req.query.value + "' where empid='" + req.query.empid + "';";
	console.log(queryline);
	db.query(queryline,[],(err,result)=>{
		res.send(result);
	});
}

exports.viewLeg_by_empid = (req, res, next) => {
	const queryline = 'select * from legislator where empid=' + req.query.empid + ";";
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		if (!err) {
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBill_by_billno = (req, res, next) => {
	const queryline = 'select * from bill where billno=' + req.query.billno + ";";
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		if (!err) {
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBill_by_billtype = (req, res, next) => {
	const queryline = "select * from bill where billtype='" + req.query.billtype + "';";
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		if (!err) {
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBill_by_reading = (req, res, next) => {
	const queryline = "select * from bill where reading='" + req.query.reading + "' and billtype='" + req.query.type + "';";
	console.log(queryline);
	db.query(queryline, [], (err, result) => {
		if (!err) {
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBills_by_year = (req, res, next) => {
	const queryline = 'select * from bill where year(datefiled)=' + req.query.year + ";";
	db.query(queryline, [], (err, result) => {
		if (!err) {
			res.send(result);
		}else{
			res.send(err);
		}
	})
}
exports.viewSenateBill_by_Senator = (req, res, next) => {
	const fname = req.query.fname;
	const lname = req.query.lname;
	var op;
	if (fname == null){
		op = "or";
	}else if(lname == null) {
		op = "or";
	}else{
		op = "and";
	}
	console.log(fname + lname);
	var queryline = "select a.* from bill a, bill_author b, (select empid from legislator where fname=? ";
	queryline = queryline+op+" lname=?) c where a.billtype='SENATE BILL' and a.billno=b.billno and b.empid=c.empid;";

	db.query(queryline, [fname, lname], (err, result) => {
		if (!err){
			res.send(result);
		}else{
			res.send(err);
		}
	})
}
exports.viewHouseBill_by_HouseMember = (req, res, next)=>{
	const fname = req.query.fname;
	const lname = req.query.lname;
	var op;
	if (fname == null){
		op = "or";
	}else if(lname == null) {
		op = "or";
	}else{
		op = "and";
	}
	var queryline = "select a.* from bill a, bill_author b, (select empid from legislator where fname=? ";
	queryline = queryline+op+" lname=?) c where a.billtype='HOUSE BILL' and a.billno=b.billno and b.empid=c.empid;";

	db.query(queryline, [fname, lname], (err, result) => {
		if (!err){
			res.send(result);
		}else{
			res.send(err);
		}
	})
}

exports.viewBills_by_type_name = (req, res, next) => {
	const fname = req.query.fname;
	const lname = req.query.lname;
	const type = '%'+req.query.type+'%';
	var op;
	if (fname == null){
		op = "or";
	}else if(lname == null) {
		op = "or";
	}else{
		op = "and";
	}
	console.log(fname + lname);
	var queryline = "select a.* from bill a, bill_author b, (select empid from legislator where fname=? ";
	queryline = queryline+op+" lname=?) c where a.billtype like ? and a.billno=b.billno and b.empid=c.empid;";

	db.query(queryline, [fname, lname, type], (err, result) => {
		if (!err){
			res.send(result);
		}else{
			res.send(err);
		}
	})
}