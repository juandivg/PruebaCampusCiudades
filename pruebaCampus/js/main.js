import {postDepartamento, postCiudad, getDepartamento, getCiudad, Departamento, DeleteDepartamento, putDepartamento, putCiudad, DeleteCities} from "./peticiones.js";
import{formu, contenedor, ciudades, btnList, tabla, cont, contenedorUpdate, formUpdate, contenedorUpdateCiudades, formUpdateCiudades, contenedorUpdateAgregar, formUpdateAgregar, claro, oscuro, classBody} from "./selectores.js"
export let bandera;
let IdCiudades=[];
function cambiarTema(tema){
    
    if(tema=='bg-white'){
        classBody.classList.remove('bg-gray-700');
        classBody.classList.add('bg-white')
    }
    else if(tema=='bg-gray-700'){
        classBody.classList.remove('bg-white');
        classBody.classList.add('bg-gray-700')
    }
    localStorage.setItem('mitema',JSON.stringify(tema));
}
let theme=JSON.parse(localStorage.getItem('mitema')) || 'bg-gray-700';
if(theme){
    cambiarTema(theme)
}
oscuro.addEventListener('click', (e)=>{
    cambiarTema('bg-gray-700')
})
claro.addEventListener('click', (e)=>{
    cambiarTema('bg-white')
})
btnList.addEventListener("click", (e)=>{
    cont.classList.toggle("hidden")
    getDepartamento();
})
formu.addEventListener("submit",(e)=>{
    e.preventDefault();
    let formu2=document.createElement("form")
    formu2.setAttribute('id', 'formu2')
    contenedor.classList.replace("h-[28vh]", "h-[92vh]")
    contenedor.classList.remove("mx-[25%]")
    contenedor.classList.replace("w-[50%]", "w-full")
    btnList.classList.add("hidden")
    tabla.classList.add("hidden")
    contenedor.replaceChild(formu2, formu)
    formu2.innerHTML=`<div class="flex flex-col w-full mb-[20px] h-[75vh]" id="content">
                            <label for="Idruta"> Ingrese el Id del departamento</label>
                            <input class="flex w-full border border-black rounded-xl" type="number" id="Iddepartamento" required>
                            <label for="Idruta"> Ingrese el nombre del departamento</label>
                            <input class="flex w-full border border-black rounded-xl" type="text" id="Nameciudad" required>
                            </div>
                            `;

    let content=document.querySelector('#content')
    console.log(content)
    for(let i=0;i<ciudades.value;i++){
        let p=document.createElement("p")
        let p2=document.createElement("p")
        let inp=document.createElement("input")
        let inp2=document.createElement("input")
        inp.classList.add("border", "border-black", "rounded-xl")
        inp2.classList.add("border", "border-black", "rounded-xl")
        p.innerHTML=`Ingrese el Id de la ciudad ${i+1}`
        p2.innerHTML=`Ingrese el nombre de la ciudad ${i+1}`
        inp.setAttribute('type', "number")
        inp.setAttribute('id', `inp`)
        inp2.setAttribute('type', "text")
        inp2.setAttribute('id', `inp2`)
        content.append(p, inp, p2, inp2)
    }
    content.innerHTML+=`<button type="submit" class="bg-blue-600 w-[20%] m-auto text-white border rounded-xl">Enviar</button>`
    let IdDepartamento=document.querySelector('#Iddepartamento')
    let Namedepartamento=document.querySelector('#Nameciudad')
    let CitiesId=document.querySelectorAll('#inp')
    let CitiesName=document.querySelectorAll('#inp2')


    formu2.addEventListener("submit", (e)=>{
        e.preventDefault();

        contenedor.classList.replace("h-[92vh]", "h-[28vh]")
        contenedor.classList.add("mx-[25%]")
        contenedor.classList.replace("w-full", "w-[50%]")
        btnList.classList.remove("hidden")
        tabla.classList.remove("hidden")
        contenedor.replaceChild(formu, formu2)

        let newDepartamento= {
            id: parseInt(IdDepartamento.value),
            nomDepartamento: Namedepartamento.value
        }
        console.log(newDepartamento);
        postDepartamento(newDepartamento)
        for(let i=0; i<ciudades.value; i++){
            let newCiudad={
                id: parseInt(CitiesId[i].value),
                nomCiudad: CitiesName[i].value,
                departamentoId: parseInt(IdDepartamento.value),
                imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Metro_de_Medell%C3%ADn%2C_Colombia.jpg/1920px-Metro_de_Medell%C3%ADn%2C_Colombia.jpg",
                coordenadas: {
                    lat: 4,
                    lon: 72
                  }
            }
            console.log(newCiudad)

            postCiudad(newCiudad)
        }



    })

})
export function DepartamentosUpdate(par){
    contenedorUpdate.classList.remove("hidden")
    formUpdate.innerHTML=`
        <label for="NamerutaUpdate"> Ingrese el nuevo nombre del departamento</label>
        <input class="flex w-full border border-black rounded-xl" type="text" value="${par.nomDepartamento}" id="NamedepartamentoUpdate" required>
        <button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Actualizar ruta</button>`
        
}
export function CiudadesUpdate(Ciudades){
    console.log(Ciudades);
    contenedorUpdateCiudades.classList.remove("hidden")

    Ciudades.forEach((ciudad,index)=>{
        IdCiudades.push(ciudad.id)
        formUpdateCiudades.innerHTML+=`
        <label for="NamepuntoUpdate"> Ingrese el nombre de la ciudad ${index+1}</label>
        <input class="flex w-full border border-black rounded-xl" type="text" value="${ciudad.nomCiudad}" id="NameciudadUpdate" required>`
    })
    
    formUpdateCiudades.innerHTML+=`<button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Actualizar ciudades</button>`

    
}
formUpdateAgregar.innerHTML=`<label for="AddciudadId"> Ingrese el Id de la ciudad</label>
<input class="flex w-full border border-black rounded-xl" type="number" id="AddciudadId" required>
<label for="AddciudadName"> Ingrese el nombre de la ciudad</label>
<input class="flex w-full border border-black rounded-xl" type="text" id="AddciudadName" required>
<button class="bg-green-400 text-white m-auto p-[10px]" type="submit">Agregar Ciudad</button> `

cont.addEventListener("click", (e)=>{
    e.preventDefault();
    let tr = e.target.closest("tr");
    let id=tr.id;
    let accion = e.target.dataset.accion;
    if(accion==="Ver"){
        bandera=1;
        getCiudad(id);
    }
    else if(accion==="Actualizar"){
        Departamento(id);
        formUpdate.addEventListener("submit", (e)=>{
            e.preventDefault
            let NamedepartamentoUpdate=document.querySelector('#NamedepartamentoUpdate')
            let data={
                id: id,
                nomDepartamento: NamedepartamentoUpdate.value
            }
            console.log(data)
            putDepartamento(data, id)

        })    
    }
    else if(accion==="Puntos"){
        bandera=2;
        getCiudad(id)
        formUpdateCiudades.addEventListener("submit",(e)=>{
            let NameciudadUpdate=document.querySelectorAll('#NameciudadUpdate')
            for(let i=0; i<IdCiudades.length; i++){
                let modifiedCiudad={
                    id: parseInt(IdCiudades[i]),
                    nomCiudad: NameciudadUpdate[i].value,
                    departamentoId: parseInt(id),
                    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Metro_de_Medell%C3%ADn%2C_Colombia.jpg/1920px-Metro_de_Medell%C3%ADn%2C_Colombia.jpg",
                    coordenadas: {
                        lat: 4,
                        lon: 72
                      }

                }
                putCiudad(modifiedCiudad,IdCiudades[i])
            }

        })
    }
    else if(accion==="Agregar"){
        contenedorUpdateAgregar.classList.remove("hidden");
        formUpdateAgregar.addEventListener("submit", (e)=>{
            let AddciudadId=document.querySelector('#AddciudadId')
            let AddciudadName=document.querySelector('#AddciudadName')
            let Addciudad={
                id: parseInt(AddciudadId.value),
                nomCiudad: AddciudadName.value,
                departamentoId: parseInt(id),
                imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Metro_de_Medell%C3%ADn%2C_Colombia.jpg/1920px-Metro_de_Medell%C3%ADn%2C_Colombia.jpg",
                coordenadas: {
                    lat: 4,
                    lon: 72
                  }
            }
            postCiudad(Addciudad)
        })
    }
    else if(accion==="Eliminar"){
        DeleteCities(id)
        DeleteDepartamento(tr,id)
        tr.remove();
    }
})