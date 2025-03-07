import { X, AlertCircle, Clock, Check } from 'lucide-react';
import { TaskModalProps } from '../types';
import { formatDateTime } from '../utils';


export const TaskModal = ({ task, onClose, onMoveTask }: TaskModalProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Medium':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Check className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-gray-500/3 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {getPriorityIcon(task.priority)}
                <span className="ml-1">{task.priority}</span>
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Due Date: {formatDateTime(task.due_date || '')}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Created Date: {formatDateTime(task.created_at || '' )}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Participant:</p>
              <p className="text-sm text-gray-900">
                {Array.isArray(task.participants) ? task.participants.join(', ') : task.participants}
              </p>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Description:</p>
              <p className="text-sm text-gray-900 mt-2">{task.description}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Move task to:</p>
              <div className="grid grid-cols-2 gap-2">
                {task.status !== 'todo' && (
                  <button 
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
                    onClick={() => onMoveTask('todo')}
                  >
                    To Do
                  </button>
                )}
                
                {task.status !== 'inProgress' && (
                  <button 
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
                    onClick={() => onMoveTask('inProgress')}
                  >
                    In Progress
                  </button>
                )}
                
                {task.status !== 'closed' && (
                  <button 
                    className="px-3 py-2 bg-green-100 hover:bg-green-200 rounded-md text-sm font-medium text-green-700"
                    onClick={() => onMoveTask('closed')}
                  >
                    Close Task
                  </button>
                )}
                
                {task.status !== 'frozen' && (
                  <button 
                    className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm font-medium text-blue-700"
                    onClick={() => onMoveTask('frozen')}
                  >
                    Freeze Task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};