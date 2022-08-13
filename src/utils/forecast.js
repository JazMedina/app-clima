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
			callback(undefined, 'Región: ' + response.body.location.region + '. País: ' + response.body.location.country + '. Hora Local: ' + response.body.location.localtime + '. Clima: ' + response.body.current.weather_descriptions[0] + '. Temperatura real: ' + response.body.current.temperature + ' celsius. Humedad: ' + response.body.current.humidity + ' grados')
		}
	})
}

module.exports = forecast