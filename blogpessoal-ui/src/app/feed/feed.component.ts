import { Component, OnInit } from '@angular/core';
import { Postagem } from './../model/Postagem';
import { Tema } from './../model/Tema';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';
import { AlertasService } from './../service/alertas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  titulo: string
  
  Tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string
  
  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private temaService: TemaService,
    private alert: AlertasService
   
  ) { }

  ngOnInit() {

    let token = localStorage.getItem('token')

    window.scroll(0, 0)
    this.findAllPostagens()
    this.findAllTemas()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicar() {
    this.Tema.id = this.idTema
    this.postagem.tema = this.Tema

    if (this.postagem.titulo == null || this.postagem.tema == null || this.postagem.texto == null) {
      this.alert.showAlertDanger('Preencha todos os campos corretamente')
    } else {
      this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        this.alert.showAlertSuccess('Postado com sucesso')
        this.findAllPostagens()
      })
    }
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => this.Tema = resp)
  }

  findByTituloPostagem() {
    if (this.titulo === '') {
      this.findAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }}

findByNomeTema() {
      if (this.nomeTema === '') {
        this.findAllTemas()
      } else {
        this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
          this.listaTemas = resp
        })
      }
    }

  }





