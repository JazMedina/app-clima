const request = require('request')

const forecast = (ciudad, callback) =>
{
	const url = 'http://api.weatherstack.com/current?access_key=0f7c1384d76d3bdce5a6afce23737e83&query=' + ciudad

	request({url, json: true}, (error, response) =>
	{
		if(error)
		{
			callback('No se puede conectar con el servicio meteorológico!', undefined)
		} else if(response.body.error)
		{
			callback('No se puede encontrar la ubicación', undefined)
		} else
		{
			callback(undefined, response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country + '. Local time is ' + response.body.location.localtime + '. Weather ' + response.body.current.weather_descriptions[0] + '. Actual Temp: ' + response.body.current.temperature + ' celsius. Humidity: ' + response.body.current.humidity + ' grados')
		}
	})
}

module.exports = forecast