# En todo/urls.py
from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
    path('', views.todo_list, name='list'),
    path('create/', views.todo_create, name='create'),
    path('<int:todo_id>/edit/', views.todo_edit, name='edit'),
    path('<int:todo_id>/toggle/', views.todo_toggle, name='toggle'),
    path('<int:todo_id>/delete/', views.todo_delete, name='delete'),
]
