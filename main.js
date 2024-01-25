// Main function to set up the application
function setupMusicToDoList() {
    // Wait for the DOM to be fully loaded before executing the code
    document.addEventListener("DOMContentLoaded", function () {
      // Load tasks from local storage when the page is loaded
      loadTasks();
  
  
      // Add event listener to the "Add Task" button
      document
        .getElementById("add-task")
        .addEventListener("click", handleAddTask);
    });
  }
  
  
  // Function to handle adding a new task
  function handleAddTask() {
    // Retrieve values from input fields
    var title = document.getElementById("new-title").value;
    var link = document.getElementById("new-link").value;
  
  
    // Check if title, link, and link validity meet the criteria
    if (title && link && isValidLink(link)) {
      // Add a new task, save to local storage, and clear input fields
      addTask(title, link);
      saveTasksToLocalStorage();
      clearInputFields();
    } else {
      // Display an alert if the input is not valid
      alert("Please provide a valid title and link!");
    }
  }
  
  
  // Add a new task to the task list
  function addTask(title, link) {
    var list = document.getElementById("task-list");
    var item = createListItem(title, link);
    list.appendChild(item);
  }
  
  
  // Create a new list item with title, link, play, edit, and delete buttons
  function createListItem(title, link) {
    var item = document.createElement("li");
  
  
    var titleText = createInputField(title);
    var linkText = createInputField(link);
  
  
    // Play button opens the link in a new tab
    var playButton = createButton("Play", function () {
      if (isValidLink(linkText.value)) {
        window.open(linkText.value, "_blank");
      } else {
        alert("Not a valid link!");
      }
    });
  
  
    // Edit button toggles between edit and save modes
    var editButton = createButton("Edit", function () {
      toggleEditSave(titleText, linkText, editButton);
    });
  
  
    // Delete button removes the task and saves the updated list to local storage
    var deleteButton = createButton(
      "Delete",
      function () {
        item.remove();
        saveTasksToLocalStorage();
      },
      "delete-button"
    );
  
  
    // Append elements to the list item
    item.append(titleText, linkText, playButton, editButton, deleteButton);
  
  
    return item;
  }
  
  
  // Create an input field with the given value
  function createInputField(value) {
    var input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.disabled = true;
    return input;
  }
  
  
  // Create a button with the given text and click event handler
  function createButton(text, onClick) {
    var button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", onClick);
    return button;
  }
  
  
  // Toggle between edit and save modes for a task
  function toggleEditSave(titleText, linkText, editButton) {
    var isDisabled = titleText.disabled;
    titleText.disabled = !isDisabled;
    linkText.disabled = !isDisabled;
    editButton.innerText = isDisabled ? "Save" : "Edit";
  
  
    // Save the tasks to local storage when in save mode
    if (!isDisabled) {
      saveTasksToLocalStorage();
    }
  }
  
  
  // Save tasks to local storage
  function saveTasksToLocalStorage() {
    // Convert task list items to a format suitable for local storage and store it
    var tasks = Array.from(document.querySelectorAll("#task-list li")).map(
      function (item) {
        var [title, link] = item.querySelectorAll("input[type='text']");
        return `${title.value}|${link.value}`;
      }
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  
  // Load tasks from local storage and add them to the task list
  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(function (task) {
      var [title, link] = task.split("|");
      addTask(title, link);
    });
  }
  
  
  // Clear input fields
  function clearInputFields() {
    document.getElementById("new-title").value = "";
    document.getElementById("new-link").value = "";
  }
  
  
  // Check if the given link is valid as a YouTube or Spotify link
  function isValidLink(link) {
    // Regular expression for a generic URL starting with http or https
    var urlPattern = /^(http|https):\/\/\w/;
  
  
    // Regular expressions for YouTube and Spotify links
    var youtubePattern = /^(http|https):\/\/(?:www\.)?youtube\.com\/watch\?v=/;
    var spotifyPattern = /^(http|https):\/\/open\.spotify\.com\/track\//;
  
  
    // Check if the link matches any of the patterns
    return (
      urlPattern.test(link) &&
      (youtubePattern.test(link) || spotifyPattern.test(link))
    );
  }
  
  
  // Call the main setup function
  setupMusicToDoList();
  