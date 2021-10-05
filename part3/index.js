// const http = require('http')
const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "fri sep 24 2021 09:32:45 gmt-0400",
        important: true

    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "fri sep 24 2021 09:33:45 gmt-0400",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "fri sep 24 2021 09:34:39 gmt-0400",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.get('/api/notes', (request, response) => {
    response.json(notes)


})

const generated = () => {
    const maxID = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxID + 1
}

app.post('/api/notes', (request, response) =>{
    const body = request.body

    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generated(),
    }

    notes = notes.concat(note)

    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.send("test")
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)