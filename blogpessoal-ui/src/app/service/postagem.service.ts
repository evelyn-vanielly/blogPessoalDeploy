import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))
  }

getAllPostagens(){
  return this.http.get('http://192.168.0.102:9000/postagens', this.token)
}

getByIdPostagem(id:number){
return this.http.get(`http://192.168.0.102:9000/postagens/${id}`, this.token)
}

putPostagem(postagem: Postagem){
  return this.http.put('http://192.168.0.102:9000/postagens', postagem, this.token)
}
deletePostagem(id: number) {
  return this.http.delete(`http://192.168.0.102:9000/postagens/${id}`, this.token)
}

getByTituloPostagem(titulo: string){
  return this.http.get(`http://192.168.0.102:9000/postagens/titulo/${titulo}`, this.token)
}

}
