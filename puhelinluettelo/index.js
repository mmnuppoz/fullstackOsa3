const http = require('http')

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
  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)