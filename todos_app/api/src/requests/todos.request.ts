export interface Task {
    id: string;
    task: string;
    assignee: string;
    description: string;
}

export interface CreateTaskRequest extends Task{}

export interface UpdateTaskRequest extends Task{}