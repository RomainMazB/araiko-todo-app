# Components presentation

## Task
Task component is a fully customized input meant to manage a task.  
It handles three v-model: text, isDone and subtasks (through the TaskList component).

## TaskList
TaskList component is a fully customized input meant to manage a `taskslist` field  
It handles the order of the tasks inside.

## EditTaskForm
EditTaskForm is a customized input used to display or edit the task text.

## TaskDropdown
TaskDropdown serves as a utility UX component to group all the task possible actions.

## CreateTask
CreateTask is a basic input form and button to create a task,
it's used through the whole application to create a task before or after another or add a root level task.

An optional abort button can be hidden when needed through props.

## Exporter
Exporter is basic export button to export all the task into a generated `tasks.json` file.

## Importer
Importer is a file dropzone meant to be used to import previously exported JSON files.

It verifies the file data structure.

## Header
Contains the responsive header.

## Footer
Just a footer...