import styles from "./styles/TaskFilter.module.css";

type Props = {
    isMobile: boolean;
}

export const TaskFilter = ({ isMobile }: Props) => {
    return(
        <div className={!isMobile ? styles.taskFilterDesktop : styles.taskFilterMobile}>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
}