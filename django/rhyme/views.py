from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

# Create your views here.

# request -> response
def hello(request: HttpRequest):
  # return HttpResponse('Hello world')
  name = request.GET.get('q')
  return render(request, 'greet.html', {'name': name})

def todos(request: HttpRequest):
  return render(request, 'todos.html', {
    'todos': ['strech', 'run', 'lift']
  })
