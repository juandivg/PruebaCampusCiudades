import {mostrarDepartamentos, watch} from "./mostrardepartamentos.js";
import { bandera, DepartamentosUpdate, CiudadesUpdate} from "./main.js";
const headers = new Headers ({'Content-Type': 'application/json'});
const URL="http://localhost:3000"

export async function getDepartamento(){
    let data = await (await fetch(`${URL}/Departamentos`)).json();
        mostrarDepartamentos(data);
    
}
export async function Departamento(id){
    let data = await (await fetch(`${URL}/Departamentos/${id}`)).json();
    DepartamentosUpdate(data)
}
export async function getCiudad(data){
    let ciudades= await (await fetch(`${URL}/Ciudades?departamentoId=${data}`)).json();
        if(bandera==1){
            watch(ciudades);
        }
        else if(bandera==2){
            CiudadesUpdate(ciudades);
        }
}
export async function postDepartamento(data){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    let departamentos = await (await fetch(`${URL}/Departamentos`,config)).json();
    console.log(rutas)
}
export async function postCiudad(data){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    let ciudades = await (await fetch(`${URL}/Ciudades`,config)).json();
}
export async function putDepartamento(data, id){
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let departamentos= await(await fetch(`${URL}/Departamentos/${id}`, config)).json();
}
export async function putCiudad(data, id){
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let ciudades= await(await fetch(`${URL}/Ciudades/${id}`, config)).json();
}
export async function DeleteDepartamento(tr,id){
    let data = Object.fromEntries(new FormData(tr.target));
    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    }
    let del=await(await fetch(`${URL}/Departamentos/${id}`, config)).json();

}
export async function DeleteCities(id){
    let ciudades= await (await fetch(`${URL}/Ciudades?departamentoId=${id}`)).json();
    if(ciudades!=null || ciudades!=[]){
        ciudades.map((city)=>DeleteCity(city.id))
    }
    }
    
export async function DeleteCity(id){
    let config={
        method: 'DELETE'
    }
    let del= await( await fetch(`${URL}/Ciudades/${id}`, config)).json();
}