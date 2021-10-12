import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () =>{
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const removePerson = (id) => {
    const personToRemove = baseURL + '/' + id
    const request = axios.delete(personToRemove)
    return request.then(response => response.data)
}

const updateNumber = (personInfo) => {
    const [id, person] = personInfo
    const updateNumber = baseURL + '/' + id
    const request = axios.put(updateNumber, person)
    return request.then(response => response.data)

}

const phoneService = {
   getAll,
   create,
   removePerson,
   updateNumber 
};

export default phoneService;