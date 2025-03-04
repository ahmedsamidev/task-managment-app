"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "../ui/Model";
import { addTask, setSelectedTask, updateTask } from "@/src/redux/slices/taskSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

// 🔹 Props Type
interface NewTaskModelProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

// 🟢 Abstract Reset Form Function
const resetForm = (
  setCategory: Dispatch<SetStateAction<string>>,
  setTaskTitle: Dispatch<SetStateAction<string>>,
  setTaskDescription: Dispatch<SetStateAction<string>>,
  setIsCompleted: Dispatch<SetStateAction<boolean | undefined>>,
  setDate: Dispatch<SetStateAction<Date | undefined>>,
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  setCategory("");
  setTaskTitle("");
  setTaskDescription("");
  setIsCompleted(false);
  setDate(undefined);
  dispatch(setSelectedTask(null));
};

const NewTaskModel = ({ isModalOpen, setIsModalOpen }: NewTaskModelProps) => {
  const [category, setCategory] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [completed, setIsCompleted] = useState<boolean | undefined>(
    undefined
  );
  const [date, setDate] = useState<Date | undefined>();

  const dispatch = useAppDispatch();
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);

  // 🟢 Handle Resetting State when Modal Opens/Closes
  useEffect(() => {
    if (isModalOpen) {
      if (selectedTask) {
        // Populate form if editing
        setCategory(selectedTask.category);
        setTaskTitle(selectedTask.title);
        setTaskDescription(selectedTask.description);
        setIsCompleted(selectedTask.completed);
        setDate(new Date(selectedTask.dueDate));
      } else {
        // Reset form if adding a new task
        resetForm(setCategory, setTaskTitle, setTaskDescription, setIsCompleted, setDate, dispatch);
      }
    }
  }, [isModalOpen, selectedTask, dispatch]);

  // 🟢 Handle Add or Update Task
  const handleAddNewTask = () => {
    if (selectedTask) {
      dispatch(updateTask({ id: selectedTask._id!, updatedTask: taskBody }));
    } else {
      dispatch(addTask(taskBody));
    }
    setIsModalOpen(false);
    resetForm(setCategory, setTaskTitle, setTaskDescription, setIsCompleted, setDate, dispatch);
  };

  const taskBody = {
    category,
    title: taskTitle,
    description: taskDescription,
    dueDate: date?.toISOString() || new Date().toISOString(),
    completed,
  };

  return (
    <Modal title={selectedTask ? "Edit Task" : "Add New Task"} isOpen={isModalOpen} onClose={handleAddNewTask}>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
        Title
          </label>
          <Input
        id="title"
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
        placeholder="Task Title"
        className="mb-2 rounded-md border border-gray-300 p-2 text-black"
          />
        </div>

        <div className="space-y-2">
        
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
        Description
          </label>
          <Textarea
        id="description"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
        placeholder="Add Task Description"
        className="rounded-md border border-gray-300 p-2 text-black focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
        Category
          </label>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white text-black">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-800">
          <SelectItem value="WORK">Work</SelectItem>
          <SelectItem value="PERSONAL">Personal</SelectItem>
          <SelectItem value="SHOPPING">Shopping</SelectItem>
          <SelectItem value="HEALTH">Health</SelectItem>
          <SelectItem value="OTHERS">Other</SelectItem>
        </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="completed" className="text-sm font-medium">
        Completed Status
          </label>
          <Select value={completed ? "Yes" : "No"} onValueChange={(value) => setIsCompleted(value === "Yes")}>
        <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white text-black">
          <SelectValue placeholder="Completed" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-800">
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectContent>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default NewTaskModel;
