var request = require('request');
request({url: 'https://serene-peak-75070.herokuapp.com/webapp', qs: {name:"hello"}}, function (error, response, body) {
	console.log("hello")
	console.log(error)
	console.log(response)
	console.log(body)
	if (error) {

		console.log(error)
	}
  if (!error && response.statusCode == 200) {
    console.log(response) // Show the HTML for the Google homepage.
  }
})