/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}
export interface ITodosState {
  todos: ITodo[];
  loading: boolean;
  error: any;
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function () {
    try {
      const responce = await fetch('https://dummyjson.com/todos?limit=4', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responce.ok) {
        throw new Error('Hello, unlucky to change status');
      }
      const data = await responce.json();
      return data.todos;
    } catch (error: any) {
      return console.log(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async function (todo: string) {
    try {
      const responce = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: todo,
          completed: false,
          userId: 5,
        }),
      });

      if (!responce.ok) {
        throw new Error('Hello, unlucky to change status');
      }
      const data = await responce.json();
      return data;
    } catch (error: any) {
      return console.log(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodos',
  async function (id: number) {
    try {
      const responce = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!responce.ok) {
        throw new Error('Hello, unlucky to change status');
      }
      return id;
    } catch (error: any) {
      return console.log(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (todo: ITodo, { rejectWithValue }) {
    try {
      const responce = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!responce.ok) {
        throw new Error('Hello, unlucky to change status');
      }
      const data = await responce.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ITodosState = {
  todos: [] as ITodo[],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(toggleStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.loading = false;
        const finded = state.todos.find(
          (item) => item.id === action.payload.id
        );
        if (finded) {
          finded.completed = !finded.completed;
        }
      })
      .addCase(toggleStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

//export const { addTodo, removeTodo, changeTodo } = todoSlice.actions;

export default todoSlice.reducer;
