import styles from "./styles/TaskList.module.css";
import { TaskFilter } from "./TaskFilter";
import { Task } from "./Task";
import { useMediaQuery } from '@react-hook/media-query';
import { TaskType } from '../TaskType';

type Props = {
  taskList: TaskType[];
  completeTask: (index: number) => void;
}

export const TaskList = ({ taskList, completeTask }: Props) => {
    const isMobile: boolean = useMediaQuery('(max-width: 426px)');
    const tasks = taskList.map((task) => <Task key={task.id} task={task} completeTask={() => completeTask(task.id)}/>);
    return(
        <div className={styles.taskList}>
          <ul>
            {tasks}
          </ul>
          <div className={styles.taskList_footer}>	
            <span>{taskList.length} items left</span>
            {!isMobile && <TaskFilter isMobile={isMobile}/>}
            <button className={styles.taskList_clearBtn}>Clear completed</button>
          </div>
        </div>
    );
}