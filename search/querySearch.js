const axios = require('axios')
const inquirer = require('inquirer')

// Search a book? Lord
// Table with all the books

const questions = [
    {
        type: "input",
        name: "searchParameter",
        message: "Search a book"        
    }
]

const ENDPOINT = "http://localhost:9200/books/_search"

inquirer.prompt(questions).then(async answers =>{
    try{
        const {data:results} = await axios.get(ENDPOINT+"?q="+answers.searchParameter)

        const books = []
        const {hits} = results.hits
        for(const hit of hits){
            const book = {
                ...hit._source,
                id:hit._id,
                score:hit._score
            }

            books.push(book)
        }

        console.table(books)
    }catch(e){
        console.error("There is an error", e)
    }
})