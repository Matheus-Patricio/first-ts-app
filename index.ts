const form: Element = document.getElementById("todoForm") as HTMLFormElement
const inputItem = document.getElementById('taskInput') as HTMLInputElement
const ulList  = document.getElementById("todoList") as HTMLUListElement



let tasks: any[] = []



function renderHtml(taskItem: string, done:boolean=false) {
    const li = document.createElement('li')
    const inputCreate = document.createElement('input')
    inputCreate.setAttribute('type', 'checkbox')
    
    inputCreate.checked = done

    const span = document.createElement('span')
    span.textContent = taskItem
    if (done) {
        span.style.textDecoration = 'line-through'
    }


    //BOTÃO REMOVE
    const btnCreate = document.createElement('button')
    btnCreate.textContent = 'Remove Task'
    btnCreate.addEventListener('click', (event) => {

        const liItemRemove = li
        const titleRemove =  liItemRemove. querySelector('span')?.textContent
        tasks = tasks.filter(t => t.title !== titleRemove)


            ulList.removeChild(li)
            localStorage.setItem('tasks', JSON.stringify(tasks))

        })

    //INPUT CHECKED
    inputCreate.addEventListener('change', (event) => {
        const spanToggle: HTMLSpanElement | null = li.querySelector('span')
        const done = inputCreate.checked

        if (done && spanToggle != null) {
            spanToggle.style.textDecoration = 'line-through'
        } else if (spanToggle !== null) {
        spanToggle.style.textDecoration = 'none'
    }
    

    tasks = tasks.map(t => {
        if (t.title === spanToggle?.textContent) {
            return{
                title: t.title,
                done: !t.done
            }
        }
        return t
     })
     
     localStorage.setItem('tasks', JSON.stringify(tasks))

    })


    //CRIAÇÃO TAREFA NO FRONT
    li.appendChild(inputCreate)
    li.appendChild(span)
    li.appendChild(btnCreate)
  
    ulList.appendChild(li)
}

window.onload = () => {
    const tasksReload = localStorage.getItem('tasks')
    if (!tasksReload) return

    tasks = JSON.parse(tasksReload)

    tasks.forEach(t => {
        renderHtml(t.title, t.done)
    })
}

form.addEventListener('submit', (event) => { 
     event.preventDefault()

    const taskItem: string = inputItem.value
    console.log(taskItem)
    

    if (taskItem.length < 3) {
        alert('A tarefa precisa ter, pelo menos, 3 letras!')
        return
    } 

    tasks.push({
        title: taskItem,
        done: false
    })

    renderHtml(taskItem)

    localStorage.setItem('tasks', JSON.stringify(tasks))

})
