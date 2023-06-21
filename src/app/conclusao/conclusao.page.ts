import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
})
export class ConclusaoPage implements OnInit {
  endereco = {
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  };

  public enderecos: any[] = [];

  constructor(
    public nav: NavController,
    public alerta: AlertController,
    public servicos: EnderecosService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.carregadados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇAO!',
      message: 'Deseja adicionar um novo endereço?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.navigateRoot('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  editar() {
    this.nav.navigateRoot('/');
  }

  carregadados() {
    if(this.servicos.listar()){
      this.enderecos = this.servicos.listar()!;
    }
  }
}
