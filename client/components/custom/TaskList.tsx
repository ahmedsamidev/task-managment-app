"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RootState } from "@/src/redux/store";
import {
  deleteTask,
  fetchTasks,
  setSelectedTask,
  updateTask,
} from "@/src/redux/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import toast from "react-hot-toast";

const TaskList = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const { list: tasks } = useAppSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  async function handleDeleteTask(id: string | undefined) {
    if (id) {
      try {
        const res: DeleteTaskResponse = await dispatch(deleteTask(id)).unwrap();
        toast.success(res.message);
      } catch (errorMessage: any) {
        toast.error(errorMessage);
      }
    }
    dispatch(fetchTasks());
  }

  const handelEditTask = (taskId: string | null | undefined) => {
    if (taskId){
      dispatch(setSelectedTask(taskId));
      setIsModalOpen(true);
    }
  };


  return (
    <div className="grid w-full grid-cols-1 gap-6 p-12 sm:grid-cols-2 lg:grid-cols-3">
      {tasks?.length === 0 ? (
      <div className="col-span-full flex w-full items-center justify-center">
        <p className="text-center text-2xl font-bold">No tasks available</p>
      </div>
      ) : (
      tasks?.map((task, index) => (
        <Card
        key={index}
        className="h-full w-full bg-gradient-to-r from-gray-700 to-black transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
        <CardHeader>
          <div className="flex items-center justify-between">
          <CardTitle className="text-base text-white sm:text-lg">
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <button
            onClick={() => handleDeleteTask(task._id)}
            className="text-red-400 hover:text-red-300"
            >
            <FiTrash2 size={16} />
            </button>
            <button
            onClick={() => handelEditTask(task._id)}
            className="text-blue-400 hover:text-blue-300"
            >
            <FiEdit size={16} />
            </button>
          </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Category:</span>
            <span className="rounded-md bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-400">
              {task.category || 'Uncategorized'}
            </span>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-gray-300">
          {task.description}
          </p>
          <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Due:</span>
            <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${
            new Date(task.dueDate) < new Date()
              ? 'bg-red-500/20 text-red-400'
              : 'bg-blue-500/20 text-blue-400'
            }`}
            >
            {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            })}
            </span>
            </div>
            <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Status:</span>
            <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${
            task.completed
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
            }`}
            >
            {task.completed ? 'Completed' : 'Pending'}
            </span>
            </div>
          </div>
          </div>
        </CardContent>
        </Card>
      ))
      )}
    </div>
  );
};

export default TaskList;
