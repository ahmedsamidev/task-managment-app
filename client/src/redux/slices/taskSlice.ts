import axiosInstance from '@/src/utils/axiosInstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 🔹 Task Type
type Task = {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: string;
};

// 🔹 Task State Type
type TaskState = {
  list: Task[];
  selectedTask: Task | null;  // ✅ New: Selected Task State
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

// 🔹 Reject Value Type for Errors
type RejectValue = string;

const initialState: TaskState = {
  list: [],
  selectedTask: null,  // ✅ New: Initial State for Selected Task
  status: 'idle',
  error: null,
};


export const fetchTasks = createAsyncThunk<Task[], { category?: string | null; sort?: string }, { rejectValue: RejectValue }>(
  "tasks/fetchTasks",
  async ({ category, sort } = {}, { rejectWithValue }) => {
    try {
      const sortField = sort?.includes("created") ? "createdAt" : "updatedAt";
      const sortOrder = sort?.includes("asc") ? "asc" : "desc";

      const response = await axiosInstance.get("/tasks", {
        params: {
          category: category || undefined,
          sort: sortOrder,
          sortField,
        },
      });

      return response.data as Task[];
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

// 🔄 Add Task
export const addTask = createAsyncThunk<Task, Omit<Task, 'id'>, { rejectValue: RejectValue }>(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/tasks', task);
      return response.data as Task;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to add task');
    }
  }
);

// 🔄 Update Task
export const updateTask = createAsyncThunk<Task, { id: string; updatedTask: Partial<Task> }, { rejectValue: RejectValue }>(
  'tasks/updateTask',
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/tasks/${id}`, updatedTask);
      return response.data as Task;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update task');
    }
  }
);

// 🔄 Delete Task
export const deleteTask = createAsyncThunk<string, string, { rejectValue: RejectValue }>(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/tasks/${id}`);
      return res.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // ✅ Toggle Task Completion
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.list.find((task) => task._id === action.payload);
      if (task) task.completed = !task.completed;
    },
    // ✅ New: Set Selected Task
    setSelectedTask: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        const task = state.list.find((task) => task._id === action.payload);
        state.selectedTask = task ?? null;
      } else {
        state.selectedTask = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch tasks';
      })

      // 📌 Add Task
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to add task';
      })

      // 📌 Update Task
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
          state.selectedTask = action.payload;  // ✅ Update Selected Task
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to update task';
      })

      // 📌 Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter((task) => task._id !== action.payload);
        if (state.selectedTask?._id === action.payload) {
          state.selectedTask = null;  // ✅ Clear Selected Task if Deleted
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to delete task';
      });
  },
});

// 🔄 Export actions and reducer
export const { toggleTaskCompletion, setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
