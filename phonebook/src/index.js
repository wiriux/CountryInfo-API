import ReactDOM from 'react-dom'
import App from './App'

const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2021-08-30T16:32:44.735Z',
        important: true
    },
    {
        id:2,
        content: 'Browser can execute only JavaScript',
        date: '2021-08-30T16:33:42.359Z',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2021-08-30T16:34:41.805Z',
        important: true
    }
]

const result = notes.map(note => note.id)
console.log(result);

ReactDOM.render(
    <App notes={notes} />, 
    document.getElementById('root')
)