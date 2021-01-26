/*//this will automatically take you to the login page
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.js'));
});*/

// for action

exports.login = async function(request, response) {

    var email = request.body.email;
    var password = request.body.password;
	var Roles = request.body.Roles;
	console.log(email);
	console.log(password);

	
	
    if (email && password) {
// check if user exists
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
				
				response.send('Login Successful');
                /*request.session.loggedin = true;
                request.session.email = email;
				request.session.role = results[0].Roles;*/
				
				
				if(Roles == "customer")
				{
					//response.redirect('/Customer');
					response.send('Customer PAge');
					
				}else{
					//response.redirect('/Admin');
					response.send('Admin PAge');
				}
				 
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
		
        response.end();
    }
}