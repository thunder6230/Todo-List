
const taskInput = document.querySelector('#task')
const formInput = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')

//dom load event
document.addEventListener('DOMContentLoaded', getTasks)
formInput.addEventListener('submit', createTask)
taskList.addEventListener('click', deleteTask)
clearBtn.addEventListener('click', clearTasks)
filter.addEventListener('keyup', filterTasks)

function getTasks(){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)
        taskList.appendChild(li)
    })
}
function createTask(){
    event.preventDefault()

    if(taskInput.value === ''){
        alert('Please add a task!')
    }else{


const li = document.createElement('li')
li.className = 'collection-item'
li.appendChild(document.createTextNode(taskInput.value))
const link = document.createElement('a')
link.className = 'delete-item secondary-content'
link.innerHTML = '<i class="fa fa-remove"></i>'
li.appendChild(link)
taskList.appendChild(li)

//store in lokal stroage
storeTaskInLocalStorage(taskInput.value)
taskInput.value = ''
}
}
function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function deleteTask(){
    
    if( event.target.parentElement.classList.contains('delete-item')){
        if( confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove()
            //remove from Local Storage
            removeTaskFromLocalStorage(event.target.parentElement.parentElement)
        }
    }
}
function clearTasks(){
    taskList.innerHTML = ''
}
function filterTasks(){
   
    const text = event.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }

    })

}

function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem)
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}