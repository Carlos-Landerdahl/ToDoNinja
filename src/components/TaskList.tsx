import styles from './TaskList.module.css';
import { useState } from 'react'
import { IoIosAddCircleOutline, IoMdTrash  } from 'react-icons/io';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle)return;

    const newTask ={
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,

    } : task)

    setTasks(newTasks)
    console.log(newTasks)
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  let countTaskIsComplete = 0;
  const generateTaskIsComplete = () => tasks.map(task => task.isComplete === true ? countTaskIsComplete++ : task)
  generateTaskIsComplete()

  return (
    <section>
        <div className={styles.containerIput}>
          <input 
            type="text" 
            placeholder="Adicionar uma nova tarefa" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>Criar <span><IoIosAddCircleOutline size={20}/></span></button>
        </div>
        <header className={styles.countTaks}>
          <h2>Tarefas criadas <span>{tasks.length}</span></h2>
          <h2>Concluídas <span>{`${countTaskIsComplete} de ${tasks.length}`}</span></h2>
        </header>
      <main>
        <ul>
          {tasks.map(task => (
            <li className={styles.containerTask} key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label>
                  <input 
                    className={styles.inputTask}
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className={styles.checkbox}></span>
                  <span className={styles.titleTodo}>{task.title}</span>
                </label>
              </div>

              <button type="button" onClick={() => handleRemoveTask(task.id)}>
                <IoMdTrash size={24}/>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}

