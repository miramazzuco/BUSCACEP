import { Component } from '@angular/core';
import { CepService } from '../services/cep.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dados: any ={};
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
    public mensagem: ToastController,
    private cep: CepService
  ) { }

  ionViewDidEnter(){
    if(localStorage.getItem('cep')){
      this.editar();
    }else{
      this.limpadados();
    }
  }

  searchCEP(evento: any) {
    const cepDig = evento.detail.value;
    if(cepDig.length == 8){
        this.cep.localizacep(cepDig).subscribe(
          (resp)=>{
            this.dados= resp;
            if(!this.dados || this.dados.erro){
              this.exibeToast('CEP não encontrado','warning')
            }else{
              this.endereco.endereco = this.dados.logradouro;
              this.endereco.bairro = this.dados.bairro;
              this.endereco.cidade = this.dados.localidade;
              this.endereco.estado = this.dados.uf;
              console.log(this.endereco);
            } 
          },
          (erro)=>{
            this.exibeToast('CEP não encontrado','warning')
          }
        )
          
        
    }
  }


  cadastrar() {
    if(
    this.endereco.cidade == '' ||
    this.endereco.estado == '' ||
    this.endereco.endereco == '' ||
    this.endereco.cep == '' ||
    this.endereco.bairro == ''){
      this.exibeToast('Preenche os campos necessarios', 'danger')
    }else{
      //!CAESSAR UMA FUNÇAÕ QUE VAI SALVAR TUDO
      this.salvamento();
      this.nav.navigateForward('conclusao')
    }
  }

  salvamento(){
    localStorage.setItem("endereco", this.endereco.endereco)
    localStorage.setItem("cep", this.endereco.cep)
    localStorage.setItem("numero", this.endereco.numero)
    localStorage.setItem("complemeno", this.endereco.complemento)
    localStorage.setItem("bairro", this.endereco.bairro)
    localStorage.setItem("cidade", this.endereco.cidade)
    localStorage.setItem("estado", this.endereco.estado)
  }

  limpadados(){
    this.endereco.endereco='';
    this.endereco.cep='';
    this.endereco.numero='';
    this.endereco.complemento='';
    this.endereco.bairro='';
    this.endereco.cidade='';
    this.endereco.estado='';
  }

  editar(){

  }

  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor
    });

    toast.present();
  }
}