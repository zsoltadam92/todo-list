import { calculateCompleted, uuidv4 } from "./calculator.js";


const todos = []

export const initTodos = () => {
  displayTodos();

  addListItem();

  updateProgress()

  sortList()
};

const displayTodos = () => {
  const containerTodos = document.querySelector('.todos-container')
  containerTodos.innerHTML = "";

  // legnehezebb elem
  const hardestTodo = document.querySelector('#hardestItem')
  hardestTodo.innerHTML = ''
  let difficultItems = todos.map(todo => todo.difficulty)

  todos.forEach(todo => {
    containerTodos.innerHTML += `
    <div class="todo-box">
      <input type="checkbox" ${todo.isComplete ? 'checked' : ''}>
      <span class="${todo.isComplete ? 'complete' : ' incomplete'} list-item">${todo.name} - ${todo.difficulty}</span>
      <i class="fas fa-trash-alt delete-button" data-todoid="${todo.id}"></i>
    </div>
    `

    // legnehezebb elem megjelenitése
    if(todo.difficulty === Math.max(...difficultItems)) {
      hardestTodo.innerHTML =`${todo.name} - ${Math.max(...difficultItems)}`
    }
  })

  checkboxEvents()

  deleteListItem()
}

// nehézségi szint validálása
const validateDifficult = () => {
  const todoDifficulty = document.querySelector('#difficulty')
  const error = document.querySelector('#difficultNumberError');
  const regex = /[^1-5]+/;

  todoDifficulty.addEventListener('input', (e) => {
    const value = e.target.value;

    if (regex.test(value)) {
      todoDifficulty.value = value.slice(0, value.length - 1);
      error.textContent = 'Csak 1 és 5 közötti szám adható meg!';
    } else {
      error.textContent = '';
    }
  });
}

//új elem hozzáadása
const addListItem = () => {
  
  validateDifficult()

  document.querySelector('.add-button').addEventListener('click', () => {
    const todoThing = document.querySelector('#todo-thing')
    const todoDifficulty = document.querySelector('#difficulty')
    
    let name = todoThing.value
    let difficulty = Number(todoDifficulty.value)
    let isComplete = false

    //üresen hagyott mező figyelmeztetés
    if (name == "" || difficulty == "") {
      document.querySelector('#emptyInput').textContent = "Töltse ki az üres mezőket!"
      return false;
    } else {
      document.querySelector('#emptyInput').textContent = ""
    }
    
    // hozzáadja az új elemet
    todos.push({
      id: uuidv4(),
      name: name,
      difficulty: difficulty,
      isComplete: isComplete,
    })
    
    updateProgress()
    displayTodos()
    todoThing.value = ""
    todoDifficulty.value = ""
  })
}

// checkbox események
const checkboxEvents = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox,index) => {
    checkbox.addEventListener('click', () => {
      todos[index].isComplete = checkbox.checked
      updateProgress()
      displayTodos()
    })
  });
}

//calculator
const updateProgress = () => {
  document.querySelector('#calculator-percent').textContent = `${Math.round(calculateCompleted(todos))}%`
  if(todos.length === 0) {
    document.querySelector('#calculator-percent').textContent = `0%`
  }
}

//listaelem törlése
const deleteListItem = () =>{
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
      displayTodos()
    })
  })
}


// növekvő sorrend
const increaseList = () => {
  todos.sort((a,b) => {
    let nameA = a.name.toUpperCase()
    let nameB = b.name.toUpperCase()
  
    if(nameA < nameB) {
      return -1
    }
    if(nameA > nameB) {
      return 1
    }
  
    return 0
  })
}

// csökkenő sorrend
const decreaseList = () => {
  todos.sort((a,b) => {
    let nameA = a.name.toUpperCase()
    let nameB = b.name.toUpperCase()
  
    if(nameA > nameB) {
      return -1
    }
    if(nameA < nameB) {
      return 1
    }
  
    return 0
  })
}

const sortList = () => {
  const increaseButton = document.getElementById('increase')
  const decreaseButton = document.getElementById('decrease')

  increaseButton.addEventListener('click', () => {
    increaseList()
    displayTodos()
  })
  decreaseButton.addEventListener('click',  ()=> {
    decreaseList()
    displayTodos()
  })
}


