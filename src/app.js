const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>
{
	res.render('index', {
		title: 'El clima',
		name: 'Jazmin Medina'
	})
})
app.get('/about', (req, res) =>
{
	res.render('about', {
		title: 'Conocenos',
		name: 'Jazmin Medina'
	})
})
app.get('/help', (req, res) =>
{
	res.render('help', {
		helpText: '¿Cómo funciona el sitio?',
		title: 'Ayuda',
		name: 'Jazmin Medina'
	})
})

app.get('/weather', (req, res) =>
{
	if(!req.query.address)
	{
		return res.send({
			error: 'No se encontró la dirección'
		})
	}
	forecast(req.query.address, (error, forecastData) =>
	{
		if(error)
		{
				/*return */res.send({error})
		}

		res.send({
			forecast: forecastData,
			address: req.query.address
		})
	})
	/* Provide an object to send as JSON
	res.send({
		forecast: 'It is snowing',
		location: 'Philadelphia',
		address: req.query.address
	})*/
})
app.get('/help/*', (req, res) =>
{
	res.render('404', {
		title: '404',
		name: 'Jazmin Medina',
		errorMessage: 'Página de ayuda no encontrada'
	})
})

app.get('*', (req, res) =>
{
	res.render('404', {
		title: '404',
		name: 'Jazmin Medina',
		errorMessage: 'Página no encontrada'
	})
})
app.listen(port, () =>
{
	console.log('Server is up on port' + port)
}) 