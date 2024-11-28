const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] — :response-time ms :body')
)
app.use(cors())

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppedieck",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Moi!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const { name } = request.body;
    const randomPhoneNumber = `0${Math.floor(Math.random() * 9000000) + 1000000}`;

    if (!name) {
        return response.status(400).json({ error: 'Nimi vaaditaan' });
    }

    const nameExists = persons.some(person => person.name === name);
    if (nameExists) {
        return response.status(400).json({ error: 'Name must be unique' });
    }

    const newPerson = {
        id: String(persons.length + 1),
        name: name,
        number: randomPhoneNumber
    };

    persons.push(newPerson);
    response.status(201).json(newPerson);
});

app.get('/info', (request, response) => {
    const time = new Date()
    const count = persons.length
    response.send(`
        <div>
            <p>Phonebook has info for ${count} people</p>
            <p>${time}</p>
        </div>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})