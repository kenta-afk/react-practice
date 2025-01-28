import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);



function App(props) {

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState("All");


    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        setTasks([...tasks, newTask]);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            // このタスクが編集されたタスクと同じIDを持っている場合
            if (id === task.id) {
                // タスクをコピーし、名前を更新する
                return { ...task, name: newName };
            }
            // 編集されたタスクでない場合は、元のタスクを返します。
            return task;
        });
        setTasks(editedTaskList);
    }


    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) =>
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
        
    )

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));


    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // このタスクが編集されたタスクと同じ ID を持っている場合
            if (id === task.id) {
                // オブジェクトを開いて、 `completed` プロップが
                // 反転された新しいオブジェクトを作成します。
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }



    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
        
    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{headingText}</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    );
}

export default App;
