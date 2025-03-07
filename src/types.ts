export interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    participants: string[];
    due_date?: string;
    status: keyof Tasks;
    brief?: string;
    created_at?: string;
}

export interface Tasks {
    todo: Task[];
    inProgress: Task[];
    closed: Task[];
    frozen: Task[];
}

export interface User {
    id?: string;
    name: string;
    email: string;
}

export interface AxiosErrorResponse {
    response?: {
        data?: {
            detail?: string;
        };
    };
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ status: boolean; detail?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ status: boolean; detail?: string }>;
    logout: () => void;
    token: string | null;
    loading: boolean;
}

export interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onMoveTask: (toColumn: keyof Tasks) => void;
}

export interface TaskColumnProps {
    title: string;
    tasks: Tasks[keyof Tasks];
    onAddTask: () => void;
    onTaskClick: (task: Task) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: number) => void;
}

export interface TaskCardProps {
    task: Task;
    onClick: () => void;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
}

export interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
    onSearch: (query: string) => void;
}

export interface AddTaskModalProps {
    newTask: Omit<Task, 'id'>;
    setNewTask: React.Dispatch<React.SetStateAction<Omit<Task, 'id'>>>;
    onClose: () => void;
    onAddTask: () => void;
    edit: boolean;  
}
