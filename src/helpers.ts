export function newTask(text: string): Task {
    return {
        text,
        isDone: false,
        subtasks: []
    }
}