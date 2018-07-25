var urlLibros = 'http://localhost:8001/libros/';
new Vue({
     delimiters: ['${', '}$'],
     el: '#app',
     created: function() {
       this.getLibros();
     },
     data: {
         libros: [],
         newTitulo: '',
         newAutor: '',
         newFecha: '',
         newPrecio: '',
         newPaginas: '',
         errors: [],
         fill_libro: {'id':'','titulo':'','fecha_publicacion':'','autor':'','precio':'','paginas':''},
         paginate: ['libros'],
         search: ''
     },
     /*http: {
         root: 'http://localhost:8001/',
         headers: {
           Authorization: 'Basic YXBpOnBhc3N3b3Jk'
         }
     },*/
     methods: {
         getLibros: function(){
           axios.get(urlLibros).then(response => {
             this.libros = response.data
           });
         },
         createLibro: function(){
           axios.post(urlLibros, {
             titulo:this.newTitulo,
             fecha_publicacion:this.newFecha,
             autor:this.newAutor,
             precio:this.newPrecio,
             paginas:this.newPaginas
           }).then(response => {
             this.getLibros();
             this.newTitulo='';
             this.newFecha='';
             this.newAutor='';
             this.newPrecio='';
             this.newPaginas='';
             this.errors=[];
             $('#create').modal('hide');
             toastr.success('Nueva tarea creada con éxito');
           }).catch(error => {
             this.errors = error.response.data;
             toastr.warning('Ingreso incorrecto de datos');
             console.log(this.errors);

           })
         },
         editLibro: function(libro){
           this.fill_libro.id = libro.pk;
           this.fill_libro.titulo = libro.titulo;
           this.fill_libro.fecha_publicacion = libro.fecha_publicacion;
           this.fill_libro.autor = libro.autor;
           this.fill_libro.precio = libro.precio;
           this.fill_libro.paginas = libro.paginas;
           $('#edit').modal('show');
         },
         updateLibro: function(id){
           var url = 'http://localhost:8001/libro_detalle/'+ id+'/';
           axios.put(url, this.fill_libro).then(response => {
             this.getLibros();
             this.fill_libro = {'id':'','titulo':'','fecha_publicacion':'','autor':'','precio':'','paginas':''};
             this.errors = [];
             $('#edit').modal('hide');
             toastr.success('Tarea actualizada con exito');
           }).catch(error => {
             this.errors = error.response.data;
             toastr.warning('Ingreso incorrecto de datos');
             console.log(this.errors);
           });
         },
         deleteLibro: function (libro) {
           var url = 'http://localhost:8001/libro_detalle/'+ libro.pk+'/';
           axios.delete(url).then(response => {
             this.getLibros();
             toastr.success('Eliminado correctamente');
           }).catch(error => {
             this.errors = error.response.data;
             console.log(this.errors);
           });
         }
               /*
             getProducts: function () {
                 this.$http.get('libros/').then(function (data,status,request) {
                 if (status == 200) {
                     this.libros = data.body.results;
                  }
                 })
             },*/
     },
     computed: {
       filtrar: function(){
         return this.libros.filter((libro)=> {
           return libro.titulo.match(this.search)
         });
       }
     }/*
     mounted: function () {
         this.getLibros();
     }*/
 })
