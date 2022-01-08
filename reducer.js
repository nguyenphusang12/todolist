import storage from "./storage.js"
const init = {
    editIndex: null,
    todos: storage.get(),
    filter: "all",
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    }
}
const actions = {
    add({ todos }, title) {
        if (title) {
            todos.push({ title, completed: false })
            storage.set(todos)
        }
    },
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },
    toggleAll({ todos }, completed) {
        todos.forEach((todo) => {
            todo.completed = completed
        })
        storage.set(todos)
    },
    destroy({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    switchFilter(state, type) {
        state.filter = type;
    },
    removeCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos);
    },
    edit(state, index) {
        state.editIndex = index;
    },
    endEdit(state, value) {
        if (state.editIndex !== null) {
            if (value) {
                state.todos[state.editIndex].title = value
                storage.set(state.todos)
            } else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
    },
    cancelEdit(state) {
        state.editIndex = null
    }

}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}