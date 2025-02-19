import styles from "./styles/TaskList.module.css";
import { TaskFilter } from "./TaskFilter";
import { Task } from "./Task";
import { useMediaQuery } from '@react-hook/media-query';
import { TaskType } from '../TaskType';
import { useContext, useState } from "react";
import { ModeContext } from "../ModeContext";

type Props = {
  taskList: TaskType[];
  completeTask: (index: number) => void;
  clearCompletedTasks: () => void;
  deleteTask: (index: number) => void;
}

export const TaskList = ({ taskList, completeTask, clearCompletedTasks, deleteTask }: Props) => {
    const [listState, setListState] = useState<'all' | 'active' | 'completed'>('all');
    const isMobile: boolean = useMediaQuery('(max-width: 426px)');
    const isDarkMode = useContext(ModeContext);

    const incompleteTasksQuantity = taskList.filter(task => task.completed === false).length;
    const tasks = taskList.map((task) => {
      switch (listState) {
        case 'all':
          return <Task key={task.id} task={task} completeTask={() => completeTask(task.id)} deleteTask={() => deleteTask(task.id)} />
        case 'active':
          return task.completed === false && <Task key={task.id} task={task} completeTask={() => completeTask(task.id)} deleteTask={() => deleteTask(task.id)} />
        case 'completed':
          return task.completed === true && <Task key={task.id} task={task} completeTask={() => completeTask(task.id)} deleteTask={() => deleteTask(task.id)}/>
        default:
          break;
      }
    });
    
    return(
      <>
        <div className={`${styles.taskList} ${isDarkMode && styles.taskList_darkMode}`}>
          <ul>
            {tasks}
          </ul>
          <div className={styles.taskList_footer}>	
            <span>{incompleteTasksQuantity} items left</span>
            {!isMobile && <TaskFilter isMobile={isMobile} listState={listState} setListState={setListState}/>}
            <button className={styles.taskList_clearBtn} onClick={clearCompletedTasks}>Clear completed</button>
          </div>
        </div>
        {/* Task Filter */}
        {isMobile && <TaskFilter isMobile={isMobile} listState={listState} setListState={setListState}/>}
      </>
    );
}