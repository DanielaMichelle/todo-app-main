"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles/TaskFilter.module.css";
import { ModeContext } from "../ModeContext";
import { useContext } from "react";

type Props = {
    isMobile: boolean;
    listState: 'all' | 'active' | 'completed';
    setListState: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>;
}

export const TaskFilter = ({ isMobile, listState, setListState }: Props) => {
    const isDarkMode = useContext(ModeContext);

    return(
        <div className={!isMobile ? styles.taskFilterDesktop : styles.taskFilterMobile}>
            <button className={`${(listState === 'all') ? styles.active : undefined} ${isDarkMode ? styles.btn_darkMode : undefined}`} onClick={() => {setListState('all')}}>All</button>
            <button className={`${(listState === 'active') ? styles.active : undefined} ${isDarkMode ? styles.btn_darkMode : undefined}`} onClick={() => {setListState('active')}}>Active</button>
            <button className={`${(listState === 'completed') ? styles.active : undefined} ${isDarkMode ? styles.btn_darkMode : undefined}`} onClick={() => {setListState('completed')}}>Completed</button>
        </div>
    );
}