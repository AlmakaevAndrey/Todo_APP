import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8800/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    toggleTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        body: { completed: !todo.completed },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
