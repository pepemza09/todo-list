// Funciones principales
document.addEventListener('DOMContentLoaded', function() {
    console.log('TodoList App cargada con diseño Airbnb + Gemini');
    
    // Inicializar tooltips si los hay
    initializeTooltips();
    
    // Inicializar animaciones
    initializeAnimations();
});

function initializeTooltips() {
    // Agregar tooltips a botones
    const buttons = document.querySelectorAll('[data-tooltip]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', showTooltip);
        button.addEventListener('mouseleave', hideTooltip);
    });
}

function initializeAnimations() {
    // Animación de entrada para las cards
    const cards = document.querySelectorAll('.todo-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function showTooltip(e) {
    // Implementar tooltip si es necesario
    console.log('Tooltip:', e.target.dataset.tooltip);
}

function hideTooltip(e) {
    // Ocultar tooltip
}

// Función para toggle de tareas
function toggleTodo(todoId) {
    fetch(`/todo/${todoId}/toggle/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCsrfToken(),
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert('Error al actualizar la tarea');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error de conexión');
    });
}

// Función para eliminar tareas
function deleteTodo(todoId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        fetch(`/todo/${todoId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
            },
        })
        .then(response => {
            if (response.ok) {
                // Animación de salida
                const card = document.querySelector(`[data-todo-id="${todoId}"]`);
                if (card) {
                    card.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        location.reload();
                    }, 300);
                } else {
                    location.reload();
                }
            } else {
                alert('Error al eliminar la tarea');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de conexión');
        });
    }
}

// Obtener CSRF token
function getCsrfToken() {
    const token = document.querySelector('[name=csrfmiddlewaretoken]');
    return token ? token.value : '';
}

// Filtros de tareas
function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active
            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            
            // Agregar clase active
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterTodos(filter);
        });
    });
}

function filterTodos(filter) {
    const cards = document.querySelectorAll('.todo-card');
    
    cards.forEach(card => {
        const shouldShow = filter === 'all' || card.dataset.status === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// CSS adicional para animaciones
const additionalCSS = `
@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
}

.todo-card[data-todo-id] {
    transition: all 0.3s ease;
}
`;

// Agregar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
