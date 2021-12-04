import { calculateCompleted } from "./calculator.js";


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

  todos.forEach((todo,index) => {
    containerTodos.innerHTML += `
    <div class="todo-box">
      <input type="checkbox" ${todo.isComplete ? 'checked' : ''}>
      <span class="${todo.isComplete ? 'complete' : ' incomplete'} list-item">${index + 1}. ${todo.name} - ${todo.difficulty}</span>
      <i class="fas fa-trash-alt delete-button"></i>
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

  todoDifficulty.addEventListener('input', (e) => {
    const value = e.target.value;

    if (value < 1 || value > 5) {
      todoDifficulty.value = value.slice(0, value.length - 1);
      error.textContent = 'Csak 1 és 5 közötti szám adható meg!';
      error.classList.add('error-style')
    } else {
      error.textContent = '';
      error.classList.remove('error-style')
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
    const emptyInput = document.querySelector('#emptyInput')
    if (name == "" || difficulty == "") {
      emptyInput.textContent = "Töltse ki az üres mezőket!"
      emptyInput.classList.add('error-style')
      return false;
    } else {
      emptyInput.textContent = ""
      emptyInput.classList.remove('error-style')
    }
    
    // hozzáadja az új elemet
    todos.push({
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
  deleteButtons.forEach((deleteButton,index) => {
      deleteButton.addEventListener('click', () => {
        todos.splice(index, 1);
  
      updateProgress()
      displayTodos()
    })
  })
}


// növekvő sorrend
const increaseList = () => {
  todos.sort((a,b) => {
    let difficultyA = a.difficulty
    let difficultyB = b.difficulty
  
    if(difficultyA < difficultyB) {
      return -1
    }
    if(difficultyA > difficultyB) {
      return 1
    }
  
    return 0
  })
}

// csökkenő sorrend
const decreaseList = () => {
  todos.sort((a,b) => {
    let difficultyA = a.difficulty
    let difficultyB = b.difficulty
  
    if(difficultyA > difficultyB) {
      return -1
    }
    if(difficultyA < difficultyB) {
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


