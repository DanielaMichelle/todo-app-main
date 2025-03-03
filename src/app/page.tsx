"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { TaskList } from "./components/TaskList";
import { useMediaQuery } from '@react-hook/media-query';
import { useState } from "react";
import { TaskType } from "./TaskType";
import { ModeContext } from "./ModeContext";

let indexTask = 6;
const initialListTask = [
  {id: 1, task: 'Complete online JavaScript course', completed: true},
  {id: 2, task: 'Jog around the park 3x', completed: false},
  {id: 3, task: '10 minutes meditation', completed: false},
  {id: 4, task: 'Read for 1 hour', completed: false},
  {id: 5, task: 'Pick up groceries', completed: false},
  {id: 6, task: 'Complete Todo App on Frontend Mentor', completed: false},
];

export default function Home() {
  const isMobile: boolean = useMediaQuery('(max-width: 426px)');
  const isTablet: boolean = useMediaQuery('(max-width: 769px)');
  const [newTask, setNewTask] = useState<TaskType>({id: 0, task: '', completed: false});
  const [taskList, setTaskList] = useState<TaskType[]>(initialListTask);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const addTask = () => {
    if(newTask.task.trim() !== '') {      
      setTaskList(prevTaskList => [...prevTaskList, {id: indexTask + 1, task: newTask.task, completed: false}]);  
      setNewTask({id: 0, task: '', completed: false});
      indexTask = indexTask + 1;
    }
  }

  const deleteTask = (index: number) => {
    setTaskList(prevTaskList => {
      return prevTaskList.filter(task => task.id !== index);
    })
  }

  const completeTask = (index: number) => {
    setTaskList(prevTaskList => {
      return prevTaskList.map(task => {
          return task.id === index ? ({...task, completed: !task.completed}) : task;
      })
    });
  }

  const clearCompletedTasks = () => {
    setTaskList(prevTaskList => {
      return prevTaskList.filter(task => task.completed === false);
    })
  }

  return (
    <ModeContext.Provider value={isDarkMode}>
      <main className={`${styles.main} ${isDarkMode && styles.main_darkMode}`}>
      {
        !isMobile ?
        <Image 
          className={styles.main_background}
          src={`/images/bg-desktop-${isDarkMode ? 'dark' : 'light'}.jpg`}
          alt="background"
          width={1440}
          height={300}
        />
        :
        <Image 
          className={styles.main_background}
          src={`/images/bg-mobile-${isDarkMode ? 'dark' : 'light'}.jpg`}
          alt="background"
          width={500}
          height={100}
        />
      }
      <div className={styles.todoContainer}>
        {/* Header */}
        <header className={styles.header}>
          <h1>Todo</h1>
          <Image 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={styles.header_icon_mode}
            src={`/images/icon-${isDarkMode ? "sun" : "moon"}.svg`}
            alt="mode"
            width={24}
            height={24}
          />
        </header>

        {/* Input Todo List */}
        <div className={`${styles.input_container} ${isDarkMode && styles.input_container_darkMode}`}>
          <span className={styles.input_circle}></span>
          <input 
              className={`${styles.input} ${isDarkMode && styles.input_darkMode}`}
              type="text" 
              placeholder="Create a new todo..."
              name="task"
              value={newTask.task}
              onChange={(e) => (setNewTask(prevNewTask => ({...prevNewTask, task: e.target.value})))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                }
              }}
          >
          </input> 
          {isTablet && <button className={styles.addTaskBtn} onClick={addTask}>
            <Image 
              className={styles.addTaskBtn_icon}
              src="./images/icon-check.svg"
              alt="check"
              width={isMobile ? 12 : 14}
              height={isMobile ? 12 : 14}
            />
          </button>}
        </div>

        {/* Task List */}
        <TaskList taskList={taskList} completeTask={completeTask} clearCompletedTasks={clearCompletedTasks} deleteTask={deleteTask} />

        {/* Footer */}
        <footer className={styles.footer}>
          {/* <p>Drag and drop to order list</p> */}
          </footer>
      </div>
    </main>
    </ModeContext.Provider>
  );
}