import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Listitem({ deleteTodo, todos, toggleComplete }) {
  return (
    <>
      {todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo}`;

        return (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                onClick={() => deleteTodo(todo.id)}
                edge="end"
                aria-label="comments"
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => toggleComplete(todo)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed !== true ? false : true}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                className={`break-words ${todo.completed !== true ? "":"line-through"}`}
                id={labelId}
                primary={todo.text}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
}

export default Listitem;
