# En todo/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Todo
import json

def todo_list(request):
    todos = Todo.objects.all()
    return render(request, 'todo/list.html', {'todos': todos})

def todo_create(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description', '')
        priority = request.POST.get('priority', 'medium')
        
        Todo.objects.create(
            title=title,
            description=description,
            priority=priority
        )
        return redirect('todo:list')
    
    return render(request, 'todo/create.html')

def todo_edit(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id)
    
    if request.method == 'POST':
        todo.title = request.POST.get('title')
        todo.description = request.POST.get('description', '')
        todo.priority = request.POST.get('priority', 'medium')
        todo.save()
        return redirect('todo:list')
    
    return render(request, 'todo/edit.html', {'todo': todo})

@require_POST
def todo_toggle(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id)
    todo.completed = not todo.completed
    todo.save()
    
    return JsonResponse({'success': True, 'completed': todo.completed})

@require_POST
def todo_delete(request, todo_id):
    todo = get_object_or_404(Todo, id=todo_id)
    todo.delete()
    
    return JsonResponse({'success': True})
