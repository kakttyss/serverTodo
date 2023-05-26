class TaskTracker {
    constructor(tasks) {
        this.tasks = tasks
    }

    add(taskDescription) {
        this.tasks.push(taskDescription)
        console.table(this.tasks)
    }

    done(taskIndex) {
        this.tasks = this.tasks.filter(el => this.tasks.indexOf(el)!=taskIndex) 
        console.table(this.tasks)
    }

    imp (taskDescription, param) {
        switch(taskDescription) {
            case "add":
                this.add(param)
                break;
            case "done":
                this.done(param)
                break;
            case "list":
                console.table(this.tasks)
                break;
        }
    }
}
module.exports = {TaskTracker}