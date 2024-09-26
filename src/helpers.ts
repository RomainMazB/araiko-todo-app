export function newTask(text: string): Task {
    return {
        text,
        isDone: false,
        createdAt: new Date,
        doneAt: undefined,
        subtasks: []
    }
}