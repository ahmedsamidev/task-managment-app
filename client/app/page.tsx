"use client";

import NewTaskModel from "@/components/custom/NewTaskModel";
import TaskFilters from "@/components/custom/TaskFilters";
import TaskList from "@/components/custom/TaskList";

import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/src/redux/hooks";
import { setSelectedTask } from "@/src/redux/slices/taskSlice";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="gradient-dark flex w-full flex-col items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {/* Modal for Adding New Task */}
      <NewTaskModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* Textarea to Add Task */}
      <div className="w-full max-w-2xl">
        <Textarea
          onFocus={() => {
            setIsModalOpen(true)
          dispatch(setSelectedTask(null));
          }}
          placeholder="Add a new task..."
          className="w-full rounded-md border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/50 focus:border-white/20 focus:outline-none"
        />
      </div>
      <TaskFilters />

      {/* Task Filters and List */}
      <main className="flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">Tasks</h1>
        <div className="w-full max-w-6xl text-white">
          <TaskList isModalOpen={isModalOpen}  setIsModalOpen={setIsModalOpen}/>
        </div> 
      </main>
    </div>
  );
}
