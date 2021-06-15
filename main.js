//Array que contiene los datos DEl crud
let usersList = [];

// >>>>>>> ARRAY a CONSIDERAR [] <
    // {
    //     name: "Mazda 2",
    //     model: "2019",
    //     doors: 5,
    //     color: "Red",
    //     brand: "Mazda",
    //     email:"academlo@academlo",
    // },
    // {
    //     name: "Mazda 2",
    //     model: "2019",
    //     doors: 5,
    //     color: "Red",
    //     brand: "Mazda",
    //     email:"academlo@academlo",
    // },
  
  // ];
  
  //Para saber si se crea o se edita
  let updateFlag = false;
  let updateIndex = null;
  
  //Varible que va a guardar el elemento HTML en el que vamos a hacer render de nuestro array
  let userListUI = document.getElementById("userList");
  //Variable que va a guardar el formulario
  const userForm = document.getElementById("addUser");
  
  


  // <<<<<<<<<<<<<< Variable asignacion de valor JSON>>>>>>>>>>>>
  let localUsersList = JSON.parse(localStorage.getItem("userStorageArray"));

  // >>>>>>>>>>>>>>> Funcion para guardar en LocalStorage (NEW!!!) <<<<<<<<<<<<<<<<<<<
  const userStorage = () => {

    if (typeof Storage !== "undefined") {
      localStorage.setItem ("userStorageArray", JSON.stringify(usersList));
      renderList();
      } else {
        alert("Tu navegador no es compatible con este almacenamiento");
      }
  };

 //FUNCIONES DEL CRUD

  
  //PRIMER FUNCIÓN PARA LEER Y MOSTRAR EN EL DIV, LOS VALORES DEL ARRAY PRINCIPAL
  const renderList = () => {
    //LIMPIAR EL DIV PRINCIPAL ANTES DE INICIAR EL CICLO FOR
    userListUI.innerHTML = "";
    //ASIGNAMOS EL ARRAY A OTRA VARIABLE
    // userListArray = usersList;
    let userListArray = JSON.parse(localStorage.getItem("userStorageArray"));
    if (userListArray === null) {
        userListArray = [];    
      } else { 
       //RECORRER EL ARRAY PARA MOSTRAR CADA ELEMENTO DEL MISMO
    userListArray.forEach((user, index) => {
      //Creamos el contenedor principal que va a ser la fila de cada usuario
      const userItemDiv = document.createElement("div");
      userItemDiv.setAttribute("class", "userItem");
      userListUI.appendChild(userItemDiv);
  
      //Crear un div que va a contener la información de cada user
      const userInfoDiv = document.createElement("div");
      userInfoDiv.setAttribute("class", "userInfo");
      userItemDiv.appendChild(userInfoDiv);
  
      //Creamos dos h4 para tener el nombre, el apellido y email, y poder incrustarlos en el div anterior
      const nameUserDiv = document.createElement("h4");
      const modelUserDiv = document.createElement("h4");
      const doorUserDiv = document.createElement("h4");
      const colorUserDiv = document.createElement("h4");
      const brandUserDiv = document.createElement("h4");
      const emailUserDiv = document.createElement("h4");
      
      nameUserDiv.innerText = `${user.name}`;
      modelUserDiv.innerText = `${user.model}`;
      doorUserDiv.innerText = `${user.doors}`;
      colorUserDiv.innerText = `${user.color}`;
      brandUserDiv.innerText = `${user.brand}`;
      emailUserDiv.innerText = `${user.email}`;
  
      userInfoDiv.appendChild(nameUserDiv);
      userInfoDiv.appendChild(modelUserDiv);
      userInfoDiv.appendChild(doorUserDiv);
      userInfoDiv.appendChild(colorUserDiv);
      userInfoDiv.appendChild(brandUserDiv);
      userInfoDiv.appendChild(emailUserDiv);
      
      //Agregamos los botones de acción, estos botones podrán editar o eliminar
      const actionButtons = document.createElement("div");
      actionButtons.setAttribute("class", "actions");
      userItemDiv.append(actionButtons);
  
      //Creamos el botón de editar
      const updateBtn = document.createElement("button");
  
      //Agregamos una clase, un id y un addEventListener
      updateBtn.setAttribute("class", "update");
      updateBtn.addEventListener("click", () => updateUser(index, user));
      updateBtn.setAttribute("id", "update");
      updateBtn.innerText = "Editar";
  
      //Creamos el botón de borrar
      const deleteBtn = document.createElement("button");
  
      //Agregamos una clase, un id, y un addEventListener
      deleteBtn.setAttribute("class", "delete");
      deleteBtn.addEventListener("click", () => deleteUser(index));
      deleteBtn.innerHTML = "Eliminar";
      deleteBtn.innerHTML = "Eliminar";
      deleteBtn.setAttribute("id", "delete");
  
      //Agregamos el botón al div de botones creado anteriormente
      actionButtons.appendChild(updateBtn);
      actionButtons.appendChild(deleteBtn);
      
    });
  };
  
  //Función que crea y actualiza según la variable updateFlag, cuando la función edite, editará el registro ...
  //en la posición updateIndex
  const createUpdateUser = event => {
    //prevenir el comportamiento por default (en este caso, recargar la página)
    event.preventDefault();
  
    //SI UPDATEFLAG ES TRUE, EJECUTAMOS LA LÓGICA PARA EDITAR
    if (updateFlag) {
      // CREAR UN OBJETO NUEVO CON LOS NUEVOS VALORES DEL FORMULARIO
      let updatedUser = {
        name: document.getElementById("name").value,
        model: document.getElementById("model").value,
        doors: document.getElementById("door").value,
        color: document.getElementById("color").value,
        brand: document.getElementById("brand").value,
        email: document.getElementById("email").value,      
      };
  
      // LE DECIMOS AL ARRAY QUE CAMBIE EL OBJETO EN EL LUGAR QUE OCUPA "updateIndex" POR EL OBJETO NUEVO "updatedUser"
      usersList[updateIndex] = updatedUser;
  
      //REINICIAMOS LAS VARIABLES GLOBALES Y PINTAMOS EL ARRAY NUEVO
      updateFlag = false;
      updateIndex = null;
      renderList();
    } else {
      // SI UPDATEFLAG ES FALSE, EJECUTAMOS LÓGICA PARA CREAR
      //crear el objeto que vamos a agregar al array
      let user = {
        //Con value, accedemos al valor de cada input
        name: document.getElementById("name").value,
        model: document.getElementById("model").value,
        doors: document.getElementById("door").value,
        color: document.getElementById("color").value,
        brand: document.getElementById("brand").value,
        email: document.getElementById("email").value,    
      };
// Nuevos CAMBIOS LocolStorage 
      if(localUsersList === null) {
          localUsersList = [];
      }

      usersList.push(...localUsersList, user);
      userStorage();
      renderList();

      // >>>>>>>> Lo antes Considerado!!! <<<<<<<
      // //Agregamos este nuevo objeto al array
      // usersList.push(user);
      // //Pintar el array nuevo
      // renderList();
    }
  
    //Dejar los valores de los inputs vacíos
    userForm.reset();
  };
  
  //FUNCIÓN PARA RECIBIR LOS VALORES DEL USUARIO QUE RECIBIÓ EL CLICK
  const updateUser = (index, user) => {
    console.log(index);
    console.log(userM);
    //PONEMOS LOS VALORES QUE TIENE EL USER EN EL FORMULARIO QUE ANTERIORMENTE ESTABA VACÍO
    document.getElementById("name").value = user.name;
    document.getElementById("model").value = user.model;
    document.getElementById("door").value = user.doors;
    document.getElementById("color").value = user.color;
    document.getElementById("brand").value = user.brand;
    document.getElementById("email").value = user.email;
    
    //PARA QUE LA FUNCION "createUpdateUser" SEPA QUE TIENE QUE ACTUALIZAR, CAMBIAMOS LA VARIABLE A TRUE
    updateFlag = true;
    //PASAMOS EL INDEX PARA RECUPERARLO EN "createUpdateUser" Y SABER QUE ELEMENTO TENEMOS QUE ACTUALIZAR
    updateIndex = index;
  };
  
  //FUNCION QUE RECIBE EL INDEX (POSICIÓN DEL ELEMENTO DADA POR FOREACH) PARA BORRAR EL ELEMENTO EN ESA POSICIOÓN
  const deleteUser = index => {
    usersList = JSON.parse(localStorage.getItem("userStorageArray"));
    //METODO PARA QUITAR UN ELEMENTO DE UN ARRAY
    usersList.splice(index, 1);
    userStorage();
    //VOLVEMOS A PINTAR LA TABLA CON EL ARRAY NUEVO
    renderList();
  };
  
  //PARA CREAR ELEMENTOS PRIMERO ESCUCHAMOS CUANDO EL FORMULARIO SE ENVÍO Y EJECUTAMOS UNA FUNCIÓN PARA AGREGAR ELEMENTOS AL ARRAY
  userForm.addEventListener("submit", createUpdateUser);
  //UNA VEZ QUE CARGUE LA PÁGINA, PINTE EL ARRAY
  document.addEventListener("DOMContentLoaded", renderList);