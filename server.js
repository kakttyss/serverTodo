const http = require('node:http')
const url = require('node:url')
const { Storage } = require('./Storage.js')
const { TaskTracker } = require('./TaskTracker.js')


const storage = new Storage('./tasks.json')
storage.readFile()

const tasksTracker = new TaskTracker(storage.tasks)

const parseQuery = (req) => {
    // url: 192.168.1.107:8000/tasks?param=new task
    // query: param=new task
    const { query } = url.parse(req.url)

    return query
        ?  query
            .split('&') // [ 'param=new task' ]
            .reduce((acc, str) => {
                const [ param, value ] = str.split('=')
                acc[param] = value

                return acc
            }, {})
        : {}
    // { param: 'new task' }
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if (!req.url.includes('/tasks')) {
        res.setHeader('Content-Type', 'text/html')
        res.writeHead(404)
        res.end('<h1>Not found!</h1>')
    }

    const parsedQuery = parseQuery(req)

    res.writeHead(200)

    if(req.method === 'POST') { 
        tasksTracker.imp('add', parsedQuery.param)
        storage.writeFile(tasksTracker.tasks)
    } else if(req.method === 'DELETE') {
        tasksTracker.imp('done', parsedQuery.param)
        storage.writeFile(tasksTracker.tasks)
    }

    res.end(JSON.stringify(tasksTracker.imp('list')))
})

console.log('Waiting for requests...')
server.listen(8000)