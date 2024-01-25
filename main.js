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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your playlist has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (title && link && !isValidLink(link)) {
    Swal.fire({
      title: "Invalid Link",
      text: "Please enter correct link!",
      icon: "error",
    });
  } else if (!title && link && !isValidLink(link)) {
    Swal.fire({
      title: "Invalid Link & Title",
      text: "Please enter title and correct link!",
      icon: "error",
    });
  } else if (!title && link && isValidLink(link)) {
    Swal.fire({
      title: "Invalid Title",
      text: "Please enter title!",
      icon: "error",
    });
  } else if (!link && title) {
    Swal.fire({
      title: "Invalid link",
      text: "Please enter link!",
      icon: "error",
    });
  } else {
    // Display an alert if the input is not valid
    //   alert("Please provide a valid title and link!");
    // Display a SweetAlert if the input is not valid
    Swal.fire({
      title: "Invalid Input",
      text: "Please enter title and link!",
      icon: "error",
    });
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
      Swal.fire({
        title: "Are you sure want to delete?",
        text: "You will not be able to see it again unless you add the same playlist!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Remove the item from the DOM
          item.remove();

          // Save the tasks back to local storage
          saveTasksToLocalStorage();

          Swal.fire({
            title: "Deleted!",
            text: "Your playlist has been deleted.",
            icon: "success",
          });
        }
      });
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

function toggleEditSave(titleText, linkText, editButton) {
  var isDisabled = titleText.disabled;

  if (isDisabled) {
    // Entering edit mode
    titleText.disabled = !isDisabled;
    linkText.disabled = !isDisabled;
    editButton.innerText = "Save";
  } else {
    // Exiting save mode, show confirmation
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Validate title and link before saving
        if (titleText.value.trim() && isValidLink(linkText.value)) {
          // Save the tasks to local storage when in save mode
          titleText.disabled = !isDisabled;
          linkText.disabled = !isDisabled;
          editButton.innerText = "Edit";
          saveTasksToLocalStorage();
          Swal.fire("Saved!", "", "success");
        } else if (titleText.value.trim() && !isValidLink(linkText.value)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Link",
            text: "Please enter a correct link.",
          });
        } else if (!titleText.value.trim() && isValidLink(linkText.value)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Title",
            text: "Please enter a title.",
          });
        } else {
          // If title is empty or link is not valid, show an error message
          Swal.fire({
            icon: "error",
            title: "Invalid Title & Link",
            text: "Please enter a title and correct link.",
          });
        }
      } else if (result.isDenied) {
        // If not saving, revert the changes
        Swal.fire("Changes are not saved", "", "info");
        titleText.disabled = isDisabled;
        linkText.disabled = isDisabled;
        editButton.innerText = "Save";
      }
    });
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
