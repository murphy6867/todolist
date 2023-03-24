import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

function App() {
  return (
    <div className='relative 
    flex min-h-screen 
    flex-col 
    justify-center
    items-center 
    overflow-hidden 
    bg-gray-100 
    py-6'>
      <Wrapper />
    </div>
  );
}

const Wrapper = () => {
  const [todos, setTodo] = useState([]);

  const addTodoList = (todo) => {
    setTodo([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };

  const onDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodo(filteredTodos);
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodo(updatedTodos);
  };

  return (
    <div
      className="relative bg-white px-6 
    pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 
    sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
    >
      <h1 className="text-2xl mb-5 antialiased">Add your todo list...</h1>
      <Form addTodoList={addTodoList} />
      <br />
      {todos.map((todo, index) => (
        <TodoLists
          task={todo}
          key={index}
          onDelete={() => onDelete(todo.id)}
          onComplete={() => onComplete(todo.id)}
        />
      ))}
    </div>
  );
};

const Form = ({ addTodoList }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodoList(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="
      bg-white border border-slate-300 rounded-md text-slate-500
      placeholder-slate-400  focus:outline-none focus:border-sky-500
      focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50
      disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      py-1 px-4
      "
        type="text"
        placeholder="Add Task..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        className="
      bg-sky-300 hover:bg-sky-500 text-white
       py-1 px-4 rounded ml-5
      "
        type="submit"
      >
        Add
      </button>
    </form>
  );
};


const TodoLists = ({ task, onDelete, onComplete }) => {
  const [complete, setComplete] = useState(task.completed);
  const [editable, setEditable] = useState(false);
  const [taskText, setTaskText] = useState(task.task);

  const handleComplete = () => {
    setComplete(!complete);
    onComplete(task.id);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleTextChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleSubmit = () => {
    setEditable(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className='flex text-lg  mb-2 bg-green-200 p-2 rounded-md'>
      <div className='grow' onClick={handleComplete}>
        <p
          className={`text-teal-800 cursor-pointer ${
            editable ? 'hidden' : ''
          } ${complete ? 'line-through' : ''}`}
        >
          {taskText}
        </p>
        <div className={`flex items-center ${editable ? '' : 'hidden'}`}>
          <input
            type='text'
            value={taskText}
            className='text-teal-800 mr-2 bg-green-300'
            onChange={handleTextChange}
          />
          <button
            className='bg-green-800 text-sm text-white px-1.5 py-0.2 rounded-md mx-2'
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
      <div className='grow-0'>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className='pr-2 cursor-pointer'
          onClick={handleEdit}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className='cursor-pointer pr-2'
          onClick={handleDelete}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className='cursor-pointer pr-2'
          onClick={handleComplete}
        />
      </div>
    </div>
  );
};


export default App;
