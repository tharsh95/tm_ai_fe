import { X } from 'lucide-react';
import { AddTaskModalProps } from '../types';
import axios from 'axios';

export const AddTaskModal = ({ newTask, setNewTask, onClose, onAddTask,edit }: AddTaskModalProps) => {
  const handleGenerateDescription = async () => {
    if (!newTask.brief?.trim()) {
      alert('Please enter a brief description first');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/tasks/generate-description?brief=${newTask.brief || ''}`);
      setNewTask(prev => ({
        ...prev,
        description: response.data.description,
        priority: response.data.priority
      }));
    } catch (error) {
      console.log('Error generating description:', error);
      // alert('Failed to generate description');
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-gray-500/3 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{edit ? 'Edit Task' : 'Add New Task'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brief Description
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask.brief || ''}
                onChange={(e) => setNewTask({ ...newTask, brief: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter a brief description"
              />
              <button
                onClick={handleGenerateDescription}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participants
            </label>
            <input
              type="text"
              value={newTask.participants.join(', ')}
              onChange={(e) => setNewTask({ ...newTask, participants: e.target.value.split(',').map(p => p.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter participants (comma-separated)"
            />
          </div>

         {edit && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              value={newTask.due_date}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onAddTask}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {edit ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};