"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchTasks } from "@/src/redux/slices/taskSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const TaskFilters = () => {
  const dispatch = useAppDispatch();

  // ✅ State to manage filters
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("created_desc");

  // ✅ Fetch tasks when filters change
  useEffect(() => {
    dispatch(fetchTasks({ category, sort }));
  }, [category, sort, dispatch]);

  return (
    <div className="flex gap-4">
      {/* Filter Tasks Select */}
      <Select onValueChange={(value) => setCategory(value === "all" ? null : value)}>
        <SelectTrigger className="w-[180px] bg-white/10 text-white border border-white/20 rounded-md">
          <SelectValue placeholder="Filter tasks" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-800">
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="WORK">Work</SelectItem>
          <SelectItem value="PERSONAL">Personal</SelectItem>
          <SelectItem value="SHOPPING">Shopping</SelectItem>
          <SelectItem value="HEALTH">Health</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By Select */}
      <Select onValueChange={setSort}>
        <SelectTrigger className="w-[180px] bg-white/10 text-white border border-white/20 rounded-md">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-800">
          <SelectItem value="created_asc">Created Date (Ascending)</SelectItem>
          <SelectItem value="created_desc">Created Date (Descending)</SelectItem>
          <SelectItem value="updated_asc">Updated Date (Ascending)</SelectItem>
          <SelectItem value="updated_desc">Updated Date (Descending)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilters;
