// Getting all required elements 
const todosContainer = document.querySelector('.todos');
const addTodoButton = document.querySelector('#addBtn');
const todosCount = document.querySelector('.todos_count');
const clearSelectedButton = document.querySelector('#clearSelected');
const clearAllButton = document.querySelector('#clearAll');
const todoInputField = document.querySelector('#todoInput');
const unmarkButton = document.querySelector('#unmark');


renderTasks(); // Calling Render task from localStorage function 

// todo Input field event 
todoInputField.addEventListener('keyup', () => {
  if(todoInputField.value.trim() != 0) { // if todos input field is not empty
    addTodoButton.classList.add('active'); // enable add button
  } else { // else if todos input field is empty 
    addTodoButton.classList.remove('active'); // disable add button 
  }
})

// if User gain access to add button through tab
// get keypress event 
addTodoButton.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') { // if key pressed is enter ? 
    if(todoInputField.value.trim() == 0) { // check if todo input field is empty 
      e.preventDefault(); // if empty disable submit 
    }
  }
});

// Add todos button click function 
addTodoButton.addEventListener('click', () => {
  let userInput = todoInputField.value; // Get User input 
  let calLocalStorage = localStorage.getItem('Tasks'); // Get data from local storage 
  
  if(calLocalStorage == null) { // if local storage is null 
    listArray = []; // create an empty array 
  } else { // else if local storage is not null 
    listArray = JSON.parse(calLocalStorage); // parse data from local storage to the array 
  }

  listArray.push(userInput); // push data from user input to the array 
  localStorage.setItem('Tasks', JSON.stringify(listArray)); // update the local storage with the newly added data 
  renderTasks(); // rerender tasks 
})

// Render task function 
function renderTasks() {  
  let calLocalStorage = localStorage.getItem('Tasks'); // Get data from local storage 

  if(calLocalStorage == null) { // if local storage is null 
    listArray = []; // create an empty array 
  } else { // else if local storage is not null 
    listArray = JSON.parse(calLocalStorage); // parse data from local storage to array 
  }
 
  let template = ''; // create an empty templage 

  listArray.forEach((res, index) => { // cycle through each array
    template += `<p ondblclick="deleteTask(${index});" onclick="finishedTask(this);">${res} </p>`; // append data from array to template 
  });
  
  todosContainer.innerHTML = template; // adding template inside todosContainer 
  todoInputField.value = ''; // Empty todo input field 
  todosCount.innerHTML = (listArray.length + ' task todo'); // Read how many task in the array
  addTodoButton.classList.remove('active'); // disable add button 
  
  if(listArray.length == 0) { // if array is empty   
    todosContainer.innerHTML = 'No Task todo'; // respond 'No Task todo'   
    todosContainer.style.opacity = '0.7'; // reduce the opacity of todos todosContainer 
  } else { // else if array is not empty 
    todosContainer.style.opacity = '1'; // make todosContainer clear with opacity '1' 
  }
}

// Finished task button click function 
function finishedTask(value) {
  let done = document.createElement('span'); // create new span element 

  value.style.textDecoration = 'line-through 1px #3b1010'; // add line through css style
  value.style.textDecorationStyle = 'double'; // make line through double line 
  value.style.borderLeft = '3px solid #444'; // add border left with color of crimson
  value.style.opacity = '0.7'; // reduce opacity to '0.7'
  value.appendChild(done); // Append (include) done element

  unmarkButton.style.display = 'block'; // display unmark button
  clearAllButton.style.display = 'none'; // remove clear all button
  clearSelectedButton.style.display = 'block'; // display clear selected button
   
  let allP = document.querySelectorAll('p'); // getting all tasks
  let calLocalStorage = localStorage.getItem('Tasks'); // Get data from local storage 
  
  listArray = (JSON.parse(calLocalStorage)); // parse data from local storage to array 

  Array.prototype.forEach.call(allP, (allPT, index) => { // loop through todos; get index of each
    if(allPT.innerHTML.includes('</span>')) { // if task includes '</span>' which is the done element 
      listArray[index] = ''; // mark as done by removing it content from the array
    }
  })
}

// clear selected todos function 
function clearSelected() {
  listArray = listArray.filter(e => String(e).trim()); // remove all empty space in our array
  localStorage.setItem('Tasks', JSON.stringify(listArray)); // update the localStorage 

  renderTasks(); // render todos
}

// display footer hidden buttons function 
const displayHBtn = () => {
  unmarkButton.style.display = 'none'; // remove unmark button
  clearSelectedButton.style.display = 'none'; // remove clear selected button
  clearAllButton.style.display = 'block'; // display clear all button
}

// clear selected button click function 
clearSelectedButton.addEventListener('click', () => {
  clearSelected(); // call clear selected function 
  displayHBtn(); // call display hidden button function 
});

// Delete task on double click function 
function deleteTask(index) {
  let calLocalStorage = localStorage.getItem('Tasks'); // Get data from local storage

  listArray = (JSON.parse(calLocalStorage)); // parse data from local storage to array 
  listArray.splice(index, 1); // remove clicked todo from the array
  localStorage.setItem('Tasks', JSON.stringify(listArray)); // update the local storage

  displayHBtn(); // call display hidden button function 
  renderTasks(); // rerender tasks
}

// Delete all task button click function 
clearAllButton.addEventListener('click', () => {
  listArray = []; // empty the array;
  localStorage.setItem('Tasks', JSON.stringify(listArray)); // update the local storage with value of empty array

  renderTasks(); // rerender task
})

// Unmark selected button function 
unmarkButton.addEventListener('click', () => {
  renderTasks(); // rerender tasks
  displayHBtn(); // call display hidden button function 
})

if(window.innerWidth <= 450) {
  clearSelectedButton.innerHTML = '<i class="fas fa-trash"></i>';
  unmarkButton.innerHTML = '<i class="fa fa-retweet"></i>';
}
//        """        """"     """"  """"""""""""
//        """        "'""     "'""  """ """" """
//        """        "'""  "  "'""      """"
//        """        "'" """"" '""      """"
//        """""""""  "'"""" """'""      """"
//        """""""""  "'"""   ""'""      """"
//     """"""""""""""""""""""""""""""""""""""""""""""
//                   Lucky Web Tech
