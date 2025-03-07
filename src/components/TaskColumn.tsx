import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskColumnProps } from "../types";


export const TaskColumn = ({
  title,
  tasks,
  onAddTask,
  onTaskClick,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <button
          className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          onClick={onAddTask}
        >
          {title === "To do" ? <Plus className="h-5 w-5" /> : null}
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-500">No tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
