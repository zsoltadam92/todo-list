export const calculateCompleted =  todos =>  todos.filter(todo => todo.isComplete).length / todos.length *100
