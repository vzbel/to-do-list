// The input where the user will enter the task name
const taskNameInput = document.getElementById("task-input");
// The form containing the add task button, add task input, and label
const taskForm = document.querySelector("form");
// User's task list
const taskList = document.querySelector(".task-list");


initializeEventListeners();

function initializeEventListeners(){
	// After submitting the form, a function should handle the addition of that task to the task list
	taskForm.addEventListener("submit", function(){
		addTask(taskNameInput.value);
	});

	// Handle task completion button presses
	taskList.addEventListener("click", function(event){
		// Check if the target is the button or the contained icon
		if(event.target.matches(".complete-task-button") || event.target.matches(".complete-task-button span")){
			markTaskAsCompleted(event.target.querySelector("span") || event.target);
		}
	})

	// Handle task deletion button presses
	taskList.addEventListener("click", function(event){
		// Check if the target is the button or the contained icon
		if(event.target.matches(".delete-task-button")){
			// Get the parent, which is the task container
			deleteTask(event.target.parentElement);
		}else if(event.target.matches(".delete-task-button span")){
			// Get the parent's parent 
			// (The span's parrent is the button.
			// The button's parent is the task container).
			deleteTask(event.target.parentElement.parentElement);
		}
	});
}

function addTask(taskName){
	if(taskName){
		// --
		// Create task completion button
		const completeTaskButton = document.createElement("button");
		completeTaskButton.classList.add("complete-task-button");

		// Create task completion icon
		const completeTaskIcon = document.createElement("span");
		completeTaskIcon.classList.add("material-symbols-outlined");
		completeTaskIcon.textContent = "check_box_outline_blank";

		// Append task completion icon to the button
		completeTaskButton.appendChild(completeTaskIcon);

		// --
		// Create delete task button
		const deleteTaskButton = document.createElement("button");
		deleteTaskButton.classList.add("delete-task-button");

		// Create delete task icon
		const deleteTaskIcon = document.createElement("span");
		deleteTaskIcon.classList.add("material-symbols-outlined");
		deleteTaskIcon.textContent = "indeterminate_check_box";

		// Append delete task icon to the button
		deleteTaskButton.appendChild(deleteTaskIcon);

		// --
		// Create paragraph element for task name
		const taskNameParagraph = document.createElement("p");
		taskNameParagraph.textContent = taskName;

		// --
		// Create list element to contain task
		const task = document.createElement("li");
		task.classList.add("task-container");
		// Append buttons and name to the task element (li)
		task.appendChild(completeTaskButton);
		task.appendChild(deleteTaskButton);
		task.appendChild(taskNameParagraph);

		// --
		// Append the task to the task list
		taskList.appendChild(task);
	}
}

// The argument should be a button icon (a span).
function markTaskAsCompleted(event){
	if(event.textContent === "check_box_outline_blank"){
		event.textContent = "check_box";
	}else{
		event.textContent = "check_box_outline_blank";
	}
}

function deleteTask(taskContainer){
	// Remove the container from the DOM.
	taskContainer.remove();
}

