import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  colecaoenderecos: any[] = [];
  key = 'enderecos';

  constructor() {}

  salvamentoEndereco(
    ruas: string,
    numeros: string,
    ceps: string,
    complementos: string,
    bairros: string,
    cidades: string,
    estados: string
  ) {
    const dados={
      rua : ruas,
      nmr : numeros,
      cep : ceps,
      comp : complementos,
      bairro : bairros,
      city : cidades,
      uf : estados
    }

    const values = localStorage.getItem(this.key)

    if(!values){
      this.colecaoenderecos.push(dados) //PUSH COLOCA OS DADOS NO ARRAY
      localStorage.setItem(this.key, JSON.stringify(this.colecaoenderecos))//JSON PARA TRANSFORMAR EM STRING OBJ 
    }else{
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao))
    }
  }

  listar(){
    const values = localStorage.getItem(this.key);

    if(!values)
     return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

  deletar(params: any){
    const values = this.listar();
    const result = values?.filter(endereco => endereco.cep !== params);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
