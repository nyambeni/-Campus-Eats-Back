//rest api to get a single ORDER data
exports.viewOrder = async function(request, response) {
   connection.query('select * from ordertable where orderNo=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
}


//REST API TO DELETE ORDER
exports.deleteOrder = async function(request, response) {
   //console.log(req.body);
   connection.query('DELETE FROM ordertable where orderNo=?', [req.params.orderNo], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
}


//rest api to create a new order into mysql database
exports.order = async function(request, response) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO ordertable SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
}
