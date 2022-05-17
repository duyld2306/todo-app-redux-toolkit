import React, { useState } from "react";
import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo/Todo";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { todoRemainingSelector } from "../../redux/selectors";
import todoListSlice from "./todoListSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todoRemainingSelector);

  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddBtnClick = () => {
    dispatch(
      todoListSlice.actions.addTodo({
        id: uuidv4(),
        name: todoName,
        completed: false,
        priority: priority,
      })
    );
    setTodoName("");
    setPriority("Medium");
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            name={todo.name}
            prioriry={todo.priority}
            completed={todo.completed}
            todoId={todo.id}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddBtnClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
};

export default TodoList;
