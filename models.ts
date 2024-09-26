interface Task {
    text: string
    isDone: boolean
    createdAt: Date
    doneAt: Date|undefined
    subtasks: Task[]
}