import html from "../core.js"
import { connect } from "../store.js"

function Todoitem({ todo, index, editIndex }) {

    return html `
                    <li 
                    class="${todo.completed && 'completed'} ${editIndex === index && 'editing'}" 
                    ondblclick = "dispatch('edit',${index})"
                    
                    >
                        <div class="view">
                            <input 
                            class="toggle" 
                            type="checkbox" 
                            ${todo.completed && 'checked'}
                            onchange="dispatch('toggle',${index})"
                            >
                            <label>${todo.title}</label>
                            <button 
                            class="destroy"
                            onclick="dispatch('destroy',${index})"
                            >
                            </button>
                        </div>
                        <input 
                        onkeyup = "(event.keyCode === 13 && dispatch('endEdit',this.value.trim()))
                        || (event.keyCode === 27 && dispatch('cancelEdit'))" 
                        class="edit" value="${todo.title}">  
                    </li>
                `
}
export default connect()(Todoitem)