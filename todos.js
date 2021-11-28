import { calculateCompleted, uuidv4 } from "./calculator.js";

// const todo1 = {
//   id: uuidv4(),
//   name: 'alma',
//   isComplete: false,
// }
// const todo2 = {
//   id: uuidv4(),
//   name: 'körte',
//   isComplete: false,
// }
// const todo3 = {
//   id: uuidv4(),
//   name: 'banán',
//   isComplete: false,
// }

const todos = [
  // todo1,
  // todo2,
  // todo3,
]


export const initTodos = () => {
  renderTodos();

  addListItem();

  updateProgress()
};


const updateProgress = () => {
  document.querySelector('#calculator-percent').textContent = `${Math.round(calculateCompleted(todos) *100)}%`
  if(todos.length === 0) {
    document.querySelector('#calculator-percent').textContent = `0%`
  }
}

const renderTodos = () => {
  const containerTodos = document.querySelector('.todos-container')
  containerTodos.innerHTML = "";

  todos.forEach(todo => {
    containerTodos.innerHTML += `
    <div class="todo-box">
    <span class="${todo.isComplete ? 'complete' : ' incomplete'}">${todo.name}</span>
      <input type="checkbox" ${todo.isComplete ? 'checked' : ''}>
      <i class="fas fa-trash-alt delete-button" data-todoid="${todo.id}"></i>
    </div>
    `
  })

  checkboxEvents()

  //listaelem törlése
  let deleteButtons = document.querySelectorAll('.delete-button')
  deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
      let id = e.target.dataset.todoid
      console.log(id);
      let foundIndex;
      for (let index = 0; index < todos.length; index++) {
        if(todos[index].id === id) {
          foundIndex = index
          break;
        }
      }
  
      todos.splice(foundIndex, 1)
  
      updateProgress()
      renderTodos()
    })
  })
}

// checkbox események
const checkboxEvents = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox,index) => {
    checkbox.addEventListener('click', () => {
      todos[index].isComplete = checkbox.checked
      updateProgress()
      renderTodos()
    })
  });
}

const addListItem = () => {
  document.querySelector('.add-button').addEventListener('click', () => {
    const todoWrite = document.querySelector('.todo-write')
    let name = todoWrite.value
    let isComplete = false
  
    todos.push({
      id: uuidv4(),
      name: name,
      isComplete: isComplete
    })
    
    updateProgress()
    renderTodos()
    todoWrite.value = ""
  })
}


