from django.shortcuts import render,get_object_or_404
from .models import Libro
from django.http import JsonResponse
from django.template.loader import render_to_string

def listar(request):
    return render(request, 'crud/index.html')

def crear(request):
    '''
    if request.method == 'POST':
        titulo = request.POST.get('titulo', None)
        autor = request.POST.get('autor', None)
        fecha_publicacion = request.POST.get('fecha', None)
        precio = request.POST.get('precio', None)
        paginas = request.POST.get('paginas', None)

        libro = Libro(titulo = this.titulo, fecha_publicacion= this.fecha_publicacion,
                autor = this.autor, precio = this.precio, paginas = this.paginas)
        libro.save()
    '''
    return redirect('list')


# Create your views here.
