// TODO /////////////////////////////////////////////////////
// Agregar al input un btn en mobile para agregar items
// al ingresar items que sean del tipo capitalize
////////////////////////////////////////////////////////////

"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { TaskList } from "./components/TaskList";
import { useMediaQuery } from '@react-hook/media-query';
import { TaskFilter } from "./components/TaskFilter";
import { useState } from "react";
import { TaskType } from "./TaskType";

let indexTask = 0;

export default function Home() {
  const isMobile: boolean = useMediaQuery('(max-width: 426px)');
  const [newTask, setNewTask] = useState<TaskType>({id: 0, task: '', completed: false});
  const [taskList, setTaskList] = useState<TaskType[]>([]);


  const addTask = () => {
    if(newTask.task.trim() !== '') {      
      setTaskList(prevTaskList => [...prevTaskList, {id: indexTask + 1, task: newTask.task, completed: false}]);  
      setNewTask({id: 0, task: '', completed: false});
      indexTask = indexTask + 1;
    }
  }

  const completeTask = (index: number) => {
    setTaskList(prevTaskList => {
      return prevTaskList.map(task => {
          return task.id === index ? ({...task, completed: !task.completed}) : task;
      })
    });
  }

  return (
    <main className={styles.main}>
      {
        !isMobile ?
        <Image 
          className={styles.main_background}
          src="/images/bg-desktop-light.jpg"
          alt="background"
          width={1440}
          height={300}
        />
        :
        <Image 
          className={styles.main_background}
          src="/images/bg-mobile-light.jpg"
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
            src="/images/icon-moon.svg"
            alt="dark mode"
            width={24}
            height={24}
          />
          {/* <Image 
            src="/images/icon-sun.svg"
            alt="dark mode"
            width={24}
            height={24}
          /> */}
        </header>

        {/* Input Todo List */}
        <div className={styles.input_container}>
          <span className={styles.input_circle}></span>
          <input 
              className={styles.input}
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
          {/* AGREGAR UN CHECK PARA MOBILE O ALGO PARA ENVIAR */}
        </div>

        {/* Task List */}
        <TaskList taskList={taskList} completeTask={completeTask} />

        {/* Task Filter */}
        {isMobile && <TaskFilter isMobile={isMobile} />}

        {/* Footer */}
        <footer className={styles.footer}>
          <p>Drag and drop to order list</p>
        </footer>
      </div>
    </main>
  );
}