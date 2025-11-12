import React, { useState } from 'react'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import Textarea from '../components/Textarea'

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up new server environment', description: 'Configure Ubuntu 20.04 with Docker and necessary packages', completed: false, dueDate: '2023-12-15' },
    { id: 2, title: 'Update firewall rules', description: 'Review and update firewall rules for all production servers', completed: true, dueDate: '2023-12-10' },
    { id: 3, title: 'Backup database', description: 'Perform full backup of production database', completed: false, dueDate: '2023-12-20' },
    { id: 4, title: 'Review security logs', description: 'Analyze security logs for suspicious activities', completed: false, dueDate: '2023-12-12' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' })

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const confirmDeleteTask = (id) => {
    setTaskToDelete(id)
    setShowDeleteModal(true)
  }

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete))
    setShowDeleteModal(false)
    setTaskToDelete(null)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        completed: false
      }
      setTasks([...tasks, task])
      setNewTask({ title: '', description: '', dueDate: '' })
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-gray-400">Manage your infrastructure tasks</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
          <Form onSubmit={handleAddTask}>
            <Form.Field label="Title" required>
              <Input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Task title"
                required
              />
            </Form.Field>
            <Form.Field label="Description">
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Task description"
                rows="3"
              />
            </Form.Field>
            <Form.Field label="Due Date">
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </Form.Field>
            <Form.Actions>
              <Button
                variant="secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Add Task
              </Button>
            </Form.Actions>
          </Form>
        </div>
      )}

      {/* Task List */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tasks ({tasks.filter(t => !t.completed).length} pending)</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">All</button>
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Pending</button>
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Completed</button>
          </div>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center p-4 rounded-lg border ${
                task.completed 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-750 border-gray-600'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="h-5 w-5 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <div className="ml-4 flex-1">
                <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h4>
                <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-400'}`}>
                  {task.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Due: {task.dueDate}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => confirmDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Task"
      >
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900 bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="mt-2">
              <p className="text-sm text-gray-400">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button
            variant="danger"
            onClick={deleteTask}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Tasks