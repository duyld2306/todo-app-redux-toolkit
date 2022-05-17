import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList;
export const searchTextSelector = (state) => state.filters.search;
export const statusFilterSelector = (state) => state.filters.status;
export const priorityFilterSelector = (state) => state.filters.priorities;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  statusFilterSelector,
  priorityFilterSelector,
  (todoList, searchText, status, priorities) =>
    todoList.filter((todo) => {
      const checkSearchFilter = todo.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const checkPriorityFilter = priorities.includes(todo.priority);

      if (status === "All") {
        return (
          checkSearchFilter &&
          (priorities.length > 0 ? checkPriorityFilter : true)
        );
      }

      return (
        checkSearchFilter &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priorities.length > 0 ? checkPriorityFilter : true)
      );
    })
);
