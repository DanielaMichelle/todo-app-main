"use client";
import Image from "next/image";
import styles from "./styles/Task.module.css";
import { useRef, useContext } from "react";
import { useMediaQuery } from '@react-hook/media-query'
import { TaskType } from '../TaskType';
import { ModeContext } from "../ModeContext";

type Props = {
    task: TaskType;
    completeTask: () => void;
    deleteTask: () => void;
}

export const Task = ({ task, completeTask, deleteTask }: Props) => {
    const crossImgRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 426px)');
    const isDarkMode = useContext(ModeContext);
    
    return(
        <li className={styles.task}>
            <div 
                onClick={completeTask}
                className={`${styles.task_check_container} ${task.completed && styles.task_check_container_complete}`}
            >
                <div className={`${!isDarkMode ? styles.task_check : styles.task_check_darkMode} ${task.completed && styles.task_check_completed}`}>
                    {task.completed && <Image 
                        src="./images/icon-check.svg"
                        alt="check"
                        width={10}
                        height={10}
                    />}
                </div>
            </div>
            <div 
                className={styles.task_text_container}
                onMouseOver={() => {if(crossImgRef.current) crossImgRef.current.style.display = "block"}} 
                onMouseLeave={() => {if(crossImgRef.current) crossImgRef.current.style.display = "none"}}
            >
                <p 
                    className={`${task.completed && `${!isDarkMode ? styles.task_p_completed : styles.task_p_completed_darkMode}`}`}>
                    {task.task}
                </p>
                <div onClick={deleteTask} className={styles.eliminateBtn} ref={crossImgRef}>
                    <Image 
            
                        src="/images/icon-cross.svg"
                        alt="elminate task"
                        width={!isMobile ? 14 : 12}
                        height={!isMobile ? 14 : 12}
                    />
                </div>
            </div>
        </li>
    );
}