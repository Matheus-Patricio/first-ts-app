var form = document.getElementById("#todoForm");
var inputItem = document.getElementById('#taskInput');
var ulList = document.querySelector("#todoList");
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    event.preventDefault();
    var taskItem = inputItem.value;
    console.log(taskItem);
});
