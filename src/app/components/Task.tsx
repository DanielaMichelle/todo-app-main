"use client";
import Image from "next/image";
import styles from "./styles/Task.module.css";
import { useRef } from "react";
import { useMediaQuery } from '@react-hook/media-query'
import { TaskType } from '../TaskType';

type Props = {
    task: TaskType;
    completeTask: () => void;
}

export const Task = ({ task, completeTask }: Props) => {
    const crossImgRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 426px)');
    
    return(
        <li className={styles.task}>
            <div 
                onClick={() => {
                    // e.stopPropagation();
                    completeTask();

                }}
                className={`${styles.task_check_container} ${task.completed && styles.task_check_container_complete}`}
            >
                <div className={`${styles.task_check} ${task.completed && styles.task_check_completed}`}>
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
                onMouseOver={() => {if(crossImgRef.current && !task.completed) crossImgRef.current.style.display = "block"}} 
                onMouseLeave={() => {if(crossImgRef.current && !task.completed) crossImgRef.current.style.display = "none"}}
            >
                <p 
                    className={`${task.completed && styles.task_p_completed}`}>
                    {task.task}
                </p>
                <div className={styles.eliminateBtn} ref={crossImgRef}>
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