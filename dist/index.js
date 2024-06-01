"use strict";
const form = document.getElementById("todoForm");
const inputItem = document.getElementById('taskInput');
const ulList = document.getElementById("todoList");
let tasks = [];
function renderHtml(taskItem, done = false) {
    const li = document.createElement('li');
    const inputCreate = document.createElement('input');
    inputCreate.setAttribute('type', 'checkbox');
    inputCreate.checked = done;
    const span = document.createElement('span');
    span.textContent = taskItem;
    if (done) {
        span.style.textDecoration = 'line-through';
    }
    //BOTÃO REMOVE
    const btnCreate = document.createElement('button');
    btnCreate.textContent = 'Remove Task';
    btnCreate.addEventListener('click', (event) => {
        var _a;
        const liItemRemove = li;
        const titleRemove = (_a = liItemRemove.querySelector('span')) === null || _a === void 0 ? void 0 : _a.textContent;
        tasks = tasks.filter(t => t.title !== titleRemove);
        ulList.removeChild(li);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    //INPUT CHECKED
    inputCreate.addEventListener('change', (event) => {
        const spanToggle = li.querySelector('span');
        const done = inputCreate.checked;
        if (done && spanToggle != null) {
            spanToggle.style.textDecoration = 'line-through';
        }
        else if (spanToggle !== null) {
            spanToggle.style.textDecoration = 'none';
        }
        tasks = tasks.map(t => {
            if (t.title === (spanToggle === null || spanToggle === void 0 ? void 0 : spanToggle.textContent)) {
                return {
                    title: t.title,
                    done: !t.done
                };
            }
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    //CRIAÇÃO TAREFA NO FRONT
    li.appendChild(inputCreate);
    li.appendChild(span);
    li.appendChild(btnCreate);
    ulList.appendChild(li);
}
window.onload = () => {
    const tasksReload = localStorage.getItem('tasks');
    if (!tasksReload)
        return;
    tasks = JSON.parse(tasksReload);
    tasks.forEach(t => {
        renderHtml(t.title, t.done);
    });
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskItem = inputItem.value;
    console.log(taskItem);
    if (taskItem.length < 3) {
        alert('A tarefa precisa ter, pelo menos, 3 letras!');
        return;
    }
    tasks.push({
        title: taskItem,
        done: false
    });
    renderHtml(taskItem);
    localStorage.setItem('tasks', JSON.stringify(tasks));
});
