const apikey = "f322b9b92569cc1303fde9c344d90d40";
const search = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
const poster = `https://image.tmdb.org/t/p/w500`;
const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`;
const toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
const detail = `https://api.themoviedb.org/3/movie/640344?api_key=${apikey}&language=en-US`;

// search movie here.........
const form = document.querySelector("form");
const input = document.querySelector("input");
const displaySearch = document.getElementById("searchDiv");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = input.value;
	const searchMovie = async () => {
		const res = await fetch(search + `${inputValue}`);
		const data = await res.json();
		displaySearch.innerHTML = displayMovie(data.results);
	};
	searchMovie();
	input.value = "";
});

//trending values

const movieList = document.getElementById("list");
const trendingUrl = async () => {
	const res = await fetch(trending);
	const data = await res.json();
	const movie = data.results;
	movieList.innerHTML = displayMovie(movie);
};

//upcoming movies

const upcomingMovie = document.getElementById("upcoming-container");
const upcomingUrl = async () => {
	const res = await fetch(upcoming);
	const data = await res.json();
	const movie = data.results;
	upcomingMovie.innerHTML = displayMovie(movie);
};

// top trending movies
const toptrendingMovie = document.getElementById("top-trending");

const toptrendingUrl = async () => {
	const res = await fetch(upcoming);
	const data = await res.json();
	const movie = data.results;
	toptrendingMovie.innerHTML = displayMovie(movie);
};

//display movie
const displayMovie = (movie) => {
	return movie
		.map((result) => {
			if (result.poster_path) {
				return `<li onclick="selectMovie(${result.id})">
         <img src="${poster}${result.poster_path}" alt="Avatar">
         <div class="container"><h4><b>Rating:<i class="fas fa-star"></i>${result.vote_average}</b></h4>
           <p>Release Date:${result.release_date}</p> </div></li>`;
			}
		})
		.join("");
};

const selectMovie = async (id) => {
	const detail = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
	const res = await fetch(detail);
	const data = await res.json();
	displayPopup(data);
};

//display popup....................

const displayPopup = (data) => {
	const html = `<div class="popup">
    <div class="modal-content">
    <span class="close" onclick="closePopup()">&times;</span>
   <div class="modal-body">
    <img src="${poster}${data.backdrop_path}"/>
    <p>Some other text...${data.id}</p>
   </div>
  </div>
  </div>
  `;

	movieList.innerHTML = html + movieList.innerHTML;
};

//close popup.......................

const closePopup = () => {
	const popup = document.querySelector(".popup");
	popup.parentElement.removeChild(popup);
};

trendingUrl();
upcomingUrl();
toptrendingUrl();

const users = [
    {
        id: 1,
        name: 'Erik',
        email: 'erik@academlo.com',
        age: 29,
        gender: 'male'
    },
     {
         id: 2,
         name: 'Oscar',
         email: 'oscar2@academlo.com',
         age: 29,
         gender: 'male'
    },
    {
         id: 3,
         name: 'Georg',
         email: 'georg@academlo.com',
         age: 33,
         gender: 'male'
     },
     {
         id: 4,
         name: 'Luis',
         email: 'luis@gmail.com',
         age: 26,
         gender: 'male'
    },
    {
         id: 5,
         name: 'Georg',
         email: 'georg2@academlo.com',
         age: 38,
         gender: 'male'
     },
     {
         id: 6,
         name: 'Oscar',
         email: 'oscar@academlo.com',
         age: 29,
         gender: 'male'
    },
    {
         id: 7,
         name: 'Daniela',
         email: 'daniela@gmail.com',
         age: 25,
         gender: 'female'
    }
]

// Genera las filas de la tabla para mostrar los usuarios

function htmlRowsUsers() {
    let tempId = 0
    const html = users.map((user) => {
        return `<tr>
                    <td>${tempId += 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser(${tempId})">Eliminar</button>
                    </td>
                </tr>`
    })
    return html.join("")
}
// devuelve el body 
function getTablebody() {
    return document.getElementById('table-body')
}
// Imprime los usuarios en el documento
function printUsers() {
    const htmlDataUsers = htmlRowsUsers()
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}

// Obtiene los datos del nuevo usuario
function getNewUser () {
    const inputName = document.getElementById('input-name')
    const inputEmail = document.getElementById('input-email')
    const inputAge = document.getElementById('input-age')
    const inputGender = document.getElementById('select-age')
    const newUser = {
        id: users.length + 1, // longitud de los usuarios + 1 agrega los id
        name: inputName.value,
        email: inputEmail.value,
        age: inputAge.value,
        gender: inputGender.value
    }
    return newUser
}
// Imprime los datos de un usuario nuevo en el documento
function addUser() {
    const newUser = getNewUser()
    printUsers()
    users.unshift(newUser) // agrega el nuevo usuario al inicio de la tabla unshit agrega elementos al principio del array
}
//Elimina el usuario del documento por su id
function deleteUser(id){
    users.splice(id-1 , 1) //recorre los usuarios y elimina el indice con el parametro
    printUsers() // pinta los usuarios
    htmlRowsUsers() //vuelve a reordenar 
}

// Ejercicios:
// Asingar el id del nuevo usuario
// Agregar el nuevo usuario al inicio
// Hacer que funcione el botón eliminar


//genera las filas para mostrar un nuevo usuario por los filtros

function htmlRowsUsers2(ArrayI) {
    let temp = 0;
    // let temp2 = 0;
    const html = ArrayI.map((user) => {
        return `<tr>                    
                    <td>${temp += 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.gender == 'female' ? 'femenimo' : 'masculino'}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="deleteUser(${temp})">Eliminar</button>
                    </td>
                </tr>`
    })
    return html.join("")
}
//Imprime los datos del nuevo usuario filtrado recibiendo un parametro

function printUsers2(ArrayII) {
    const htmlDataUsers = ArrayII
    const tableBody = getTablebody()
    tableBody.innerHTML = htmlDataUsers
}

function filter() {

    function filter2(){
    // obtenemos el valor del filtro seleccionado
        let idfilter= document.getElementById('select-filter')
        let filtervalue= idfilter.value
    
    // si filtro de mujeres
    if (filtervalue=='female'){
        const resultMujeres = users.filter(filtro => filtro.gender == "female");
        return resultMujeres
    }
    else if(filtervalue=="academlo"){
    
        var resultCorreos = users.filter(filtro => filtro.email.endsWith('@academlo.com'));
        return resultCorreos
    }
    else if(filtervalue=="sort"){
    
        const resultOrdenar = users.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            // a must be equal to b         
            return 0 ;
          });
          return resultOrdenar
    }
    }
    //llama a la funcion y le manda los nuevos datos
    let filtros = htmlRowsUsers2(filter2());
  //pinta los dato de los usuarios filtrados
    printUsers2(filtros);
  
} 

// Llamadas al cargar la página
printUsers()
// Volvemos la función addUser y deleteUser parte del objeto window
window.addUser = addUser
window.deleteUser = deleteUser
window.filter = filter