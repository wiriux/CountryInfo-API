const express = require('express')
const app = express()
app.use(express.json())


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) =>{ 
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) =>{ 
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)

    if(note){
        response.json(note)
    }else{
        response.status(400).send( `Person with id ${id} not on database`)


    }
})

app.get('/info', (request, response) => {
    const numOfPeople = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${numOfPeople} people</p> 
            <p>${date}</p>`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('body is:', body)
    if(!body.name){
        return response.status(400).send("Name field cannot be empty")
    }

    const note = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(note)
    response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const noteToDelete = persons.find(person => {
        return person.id === id? person.id : false
    })
    console.log('noteToDelete', noteToDelete)

    if(noteToDelete){
        persons = persons.filter(person => person.id !== id)
        response.send(`Person with id ${id} has been deleted from database`)
    }else{
        response.status(404).send("Not a valid id")
        // response.status(404).end()


    }

})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})