const {
    readFileSync,
    writeFileSync,
} = require('node:fs')
class Storage {
    constructor(path) {
        this.path = path
    }
    readFile() {
        this.content = JSON.parse(readFileSync(this.path, 'utf-8'))
    }
    writeFile(content) {
        writeFileSync(this.path, JSON.stringify(content))
    }
}

module.exports = {Storage}