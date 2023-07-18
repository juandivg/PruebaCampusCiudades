import {cont, modalchild, closemodal, modal, contenedor, tabla} from "./selectores.js"
//import { getPunto} from "./peticiones.js";
//export let oldIdspuntos=[];
export function mostrarDepartamentos(data){
    cont.innerHTML=""

   data.forEach(departamento => {
        let tr=document.createElement('tr')
        tr.setAttribute("id",`${departamento.id}`);
        tr.setAttribute("class","tr");
        tr.innerHTML=` <td class="text-center">${departamento.nomDepartamento}</td>        
                        <td class="text-center">${departamento.id}</td>
                        <td class="text-center" ><button class="text-center text-white bg-yellow-400 border rounded-md px-[20px]" data-accion="Ver">Ver</button></td>
                        <td class="text-center"><button class="text-center text-white bg-blue-400 border rounded-md px-[20px]" data-accion="Actualizar">Actualizar</button></td>
                        <td class="text-center"><button class="text-center text-white bg-green-400 border rounded-md px-[20px]" data-accion="Puntos">Actualizar Ciudades</button></td>
                        <td class="text-center"><button class="text-center text-white bg-violet-400 border rounded-md px-[20px]" data-accion="Agregar">Agregar</button></td>
                        <td class="text-center"><button class="text-center text-white bg-red-600 border rounded-md px-[20px]" data-accion="Eliminar">Eliminar</button></td>`

        cont.appendChild(tr)
   });


}

 export function watch(ciudades){
    modal.classList.remove("hidden")
    contenedor.classList.add("hidden")
    tabla.classList.add("hidden")
    modalchild.innerHTML="";
    ciudades.forEach(ciudad=>{
        console.log(ciudad.imagen)
            modalchild.innerHTML+=`<div class="flex flex-col justify-center items-center"><p class="bg-yellow-400">${ciudad.nomCiudad}</p>
                                                                <img src=${ciudad.imagen} class="w-[100px] h-[100px] my-[20px]">
                                                                </div>`
    })
    closemodal.addEventListener("click", (e)=>{
        modal.classList.add("hidden")
        contenedor.classList.remove("hidden")
        tabla.classList.remove("hidden")
    })
}