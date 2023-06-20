import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  endereco = {
    endereco:'',
    numero:'',
    complemento:'',
    bairro:'',
    cep:'',
    cidade:'',
    estado:'',
   
  }
  constructor(
    public nav: NavController,
    public alerta: AlertController) { }

  ngOnInit(){}
  

  ionViewDidEnter() {
    this.carregadados();
  }

  async voltar(){
    const voltando = await this.alerta.create({
      header: 'ATENÇAO!',
      message:'Deseja retornar? Perdera todos os dados',
      buttons:[{
        text: 'Não',
        role: 'cancel'
      },{
        text: 'Retornar',
        handler: ()=>{
          localStorage.clear();
          this.nav.navigateRoot('/');
        },
      },
    ],
    });

    await voltando.present();
  }

  carregadados(){
      this.endereco.endereco = localStorage.getItem('endereco')!;
      this.endereco.cep = localStorage.getItem('cep')!;
      this.endereco.complemento = localStorage.getItem('complemento')!;
      this.endereco.bairro = localStorage.getItem('bairro')!;
      this.endereco.numero = localStorage.getItem('numero')!;
      this.endereco.cidade = localStorage.getItem('cidade')!;
      this.endereco.estado = localStorage.getItem('estado')!;
  }

}
