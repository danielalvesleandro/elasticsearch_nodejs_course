// 1. With DSL Queries
// 1.2 With compound query clause search book by author X with Rating > Y

const axios = require('axios')
const inquirer = require('inquirer')

const questions = [
    {
        type: "input",
        name: "searchParameter",
        message: "Search by author"        
    },
    {
        type: "number",
        name: "rating",
        message: "Rating >"        
    }
]

const ENDPOINT = "http://localhost:9200/books/_search"

inquirer.prompt(questions).then(async answers =>{
    try{
        const query = {
            "size": 10,
            "from": 0,
            "query":{
                "bool":{
                    "must": [
                        {
                            "match":{
                                "author": answers.searchParameter
                            }
                        }
                    ],
                    "should": [],
                    "must_not": [],
                    "filter": [
                        {
                            "range":{
                                "rating":{
                                    "gte": answers.rating
                                }
                            }
                        }
                    ]
                    }
                }
        }

        const {data:results} = await axios.post(ENDPOINT, query)

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