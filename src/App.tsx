import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TaskColumn } from './components/TaskColumn';
import { TaskModal } from './components/TaskModal';
import { AddTaskModal } from './components/AddTaskModal';
import ProjectInfo from './components/ProjectInfo';
import axios from 'axios';
import { Task, Tasks } from './types';

function App() {
  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    inProgress: [],
    closed: [],
    frozen: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    priority: 'Low' as const,
    participants: [],
    due_date: '',
    status: 'todo',
    brief: ''
  });
  console.log(selectedTask?.due_date,'selectedTask')
  const [addToColumn, setAddToColumn] = useState<keyof Tasks>('todo');
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/tasks');

        setTasks(data);
      }
      catch{
        console.log('error')
      }
    }
    fetchTasks();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const { data } = await axios.get(`http://localhost:8000/tasks/search?title=${query}`);
        setSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const filterTasksBySearch = (columnTasks: Task[]) => {
    if (!searchQuery.trim()) return columnTasks;
    return columnTasks.filter(task => 
      searchResults.some(result => result.id === task.id)
    );
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
  
    const taskPayload = {
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: newTask.status as keyof Tasks,
      participants: newTask.participants,
      brief: newTask.brief,
      due_date: newTask.due_date
    };
  
    try {
      if (selectedTask) {
        // Update existing task
        const { data: updatedTask } = await axios.put(`http://localhost:8000/tasks/${selectedTask.id}`, taskPayload);
        // Update the task in the correct column
        setTasks(prev => ({
          ...prev,
          [selectedTask.status]: prev[selectedTask.status].map(task => 
            task.id === selectedTask.id ? {
              ...updatedTask,
              id: selectedTask.id,
              status: selectedTask.status
            } : task
          )
        }));
      } else {
        // Create new task
        const { data: createdTask } = await axios.post('http://localhost:8000/tasks', taskPayload);
        
        setTasks(prev => ({
          ...prev,
          [addToColumn]: [...prev[addToColumn], {
            ...createdTask,
            id: createdTask.id,
            status: addToColumn
          }]
        }));
      }
  
      // Reset form and close modal
      setNewTask({
        title: '',
        description: '',
        priority: 'Low',
        participants: [],
        status: 'todo',
        brief: ''
      });
  
      setShowAddTaskModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    }
  };
  
  const moveTask = async (taskId: number, fromColumn: keyof Tasks, toColumn: keyof Tasks) => {
    const taskIndex = tasks[fromColumn].findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
  
    const { status, ...taskWithoutStatus } = tasks[fromColumn][taskIndex];
  
    try {
      // Call API to update task status
      await axios.put(`http://localhost:8000/tasks/${taskId}`, {
        status: toColumn,
        ...taskWithoutStatus
      });
  
      // Update the state after successful API call
      setTasks(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(task => task.id !== taskId),
        [toColumn]: [...prev[toColumn], { ...taskWithoutStatus, column: toColumn }]
      }));
  
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => ({
      todo: prev.todo.filter(task => task.id !== taskId),
      inProgress: prev.inProgress.filter(task => task.id !== taskId),
      closed: prev.closed.filter(task => task.id !== taskId),
      frozen: prev.frozen.filter(task => task.id !== taskId)
    }));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);

    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      participants: task.participants,
      due_date: task.due_date,
      status: task.status,
      brief: task.brief
    });
    setShowAddTaskModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} onSearch={handleSearch} />

        {/* Project Info */}
        <ProjectInfo />
        
        {/* Task Board */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <TaskColumn 
              title="To do" 
              tasks={filterTasksBySearch(tasks.todo)} 
              onAddTask={() => {
                setAddToColumn('todo');
                setSelectedTask(null);
                setNewTask({
                  title: '',
                  description: '',
                  priority: 'Low',
                  participants: [],
                  status: 'todo',
                  brief: ''
                });
                setShowAddTaskModal(true);
              }} 
              onTaskClick={(task) => {
                setSelectedTask({...task, status: 'todo'});
                setShowTaskModal(true);
              }}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            
            <TaskColumn 
              title="In progress" 
              tasks={filterTasksBySearch(tasks.inProgress)} 
              onAddTask={() => {
                setAddToColumn('inProgress');
                setSelectedTask(null);
                setShowAddTaskModal(true);
              }} 
              onTaskClick={(task) => {
                setSelectedTask({...task, status: 'inProgress'});
                setShowTaskModal(true);
              }}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            
            <TaskColumn 
              title="Closed" 
              tasks={filterTasksBySearch(tasks.closed)} 
              onAddTask={() => {
                setAddToColumn('closed');
                setSelectedTask(null);
                setShowAddTaskModal(true);
              }} 
              onTaskClick={(task) => {
                setSelectedTask({...task, status: 'closed'});
                setShowTaskModal(true);
              }}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            
            <TaskColumn 
              title="Frozen" 
              tasks={filterTasksBySearch(tasks.frozen)} 
              onAddTask={() => {
                setAddToColumn('frozen');
                setSelectedTask(null);
                setShowAddTaskModal(true);
              }} 
              onTaskClick={(task) => {
                setSelectedTask({...task, status: 'frozen'});
                setShowTaskModal(true);
              }}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setShowTaskModal(false)} 
          onMoveTask={(toColumn) => moveTask(selectedTask.id, selectedTask.status, toColumn)} 
        />
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <AddTaskModal 
          edit={!!selectedTask?.title}
          newTask={newTask} 
          setNewTask={setNewTask} 
          onClose={() => setShowAddTaskModal(false)} 
          onAddTask={handleAddTask} 
        />
      )}
    </div>
  );
}

export default App;