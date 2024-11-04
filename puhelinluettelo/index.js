const express = require('express')
const app = express()

let persons = [
    {
      id: "1",
      content: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: "2",
      content: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: "3",
      content: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: "4",
      content: "Mary Poppedieck",
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