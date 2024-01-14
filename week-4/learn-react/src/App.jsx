import { useState } from "react";

let globalId = 1;
function App() {
    const [todoList, updateTodoList] = useState([
        {
            title: "work",
            description: "completed all the work",
            id: globalId++,
        },
        {
            title: "gym",
            description: "go to gym",
            id: globalId++,
        },
        {
            title: "assignments",
            description: "completed all the assignments",
            id: globalId++,
        },
    ]);
    const addTodoItem = () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const updatedList = [
            ...todoList,
            {
                title,
                description,
                id: globalId++,
            },
        ];
        updateTodoList(updatedList);
    };
    const deleteTodoItem = (e) => {
        const id = e.target.parentElement.getAttribute("id");
        const updatedList = [...todoList];
        for (let i = 0; i < updatedList.length; i++) {
            if (updatedList[i].id == id) {
                updatedList.splice(i, 1);
                break;
            }
        }
        updateTodoList(updatedList);
    };
    return (
        <div>
            <div id="todiInput">
                <input id="title" type="text" placeholder="Title" />
                <br />
                <br />
                <input type="text" id="description" placeholder="Description" />
                <br />
                <br />
                <button onClick={addTodoItem}>Add Todo</button>
            </div>
            <div id="todoContainer">
                {todoList.map((todoItem) => {
                    return (
                        <div key={todoItem.id} id={todoItem.id}>
                            <h2>{todoItem.title}</h2>
                            <p>{todoItem.description}</p>
                            <button>Update</button>
                            <button onClick={deleteTodoItem}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
