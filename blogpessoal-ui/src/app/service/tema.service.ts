import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

getAllTemas(){
  return this.http.get('http://192.168.0.102:9000/tema', this.token)
}
getByIdTema(id:number){
  return this.http.get(`http://192.168.0.102:9000/tema/${id}`, this.token)
}

postTema(Tema: Tema){
  return this.http.post('http://192.168.0.102:9000/tema', Tema, this.token)
}
putTema(Tema: Tema){
  return this.http.put('http://192.168.0.102:9000/tema', Tema, this.token)
}
deleteTema(id:number){
  return this.http.delete(`http://192.168.0.102:9000/tema/${id}`, this.token)
}
getByNomeTema(nome: string) {
  return this.http.get(`http://192.168.0.102:9000/tema/nome/${nome}`, this.token)
}


}