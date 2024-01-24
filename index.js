document.getElementById("add-task").addEventListener("click", function () {
  var value = document.getElementById("new-task").value;
  if (value) {
    addTask(value);
    document.getElementById("new-task").value = "";
  }
});

function addTask(text) {
  var list = document.getElementById("task-list");

  var item = document.createElement("li");

  var taskText = document.createElement("input");
  taskText.type = "text";
  taskText.value = text;
  taskText.disabled = true;
  item.appendChild(taskText);

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", function () {
    if (taskText.disabled) {
      taskText.disabled = false;
      editButton.innerText = "Save";
    } else {
      taskText.disabled = true;
      editButton.innerText = "Edit";
    }
  });
  item.appendChild(editButton);

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    list.removeChild(item);
  });
  item.appendChild(deleteButton);

  list.appendChild(item);
}
