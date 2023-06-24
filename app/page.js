"use client";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import Listitem from "./ListItem";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please Enter a Valid Todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });

    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div
          id="app"
          className="p-6 flex flex-col gap-4 items-center  drop-shadow-xl"
        >
          <h1 className="font-bold text-xl">TODO LIST</h1>
          <div>
            <form onSubmit={createTodo} className="flex gap-1" action="">
              <TextField
                id="standard-basic"
                variant="standard"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton edge="end" aria-label="comments" onClick={createTodo}>
                <AddIcon />
              </IconButton>
            </form>
          </div>
          <div>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <Listitem
                createTodo={createTodo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
                todos={todos}
              />
            </List>
          </div>
          <p>You have {todos.length} todos.</p>
        </div>
      </main>
    </ThemeProvider>
  );
}
