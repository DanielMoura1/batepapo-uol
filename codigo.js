let i=0
let nomeTeste=''
let textoTeste=''
let timeTeste=''
let mensagem = document.querySelector("input").value;
let nome=''


function nome2(){
    nome = prompt('insira nome')
    entrar()
}
nome2()
let para= "Todos"
let type = "message"


servidor()
selecionarfrom()
function  mandarMensagem(){
    
    let TEXTO = document.querySelector("input").value;
    console.log('TEXTO'+TEXTO)
    
        
        //----------------------------------------------------------------

        const promessaMandar = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages',{

            from: nome,
            to: para,
            text: TEXTO,
            type: type // ou "private_message" para o bônus
        })
        promessaMandar.then(apagador)
        promessaMandar.catch(voltar)

        

    servidor()
}
function voltar(erro){
    window.location.reload()
}
function apagador(apaga){
    
    document.querySelector("input").value=''

}
function menu(){
    const imgg=document.querySelector('.caixamenu')
    imgg.classList.toggle('barra')
    
}
function menuSeta(eu,name1){
    const seta =document.querySelector('.opcoesCaixa .selecionado')
    
    if(seta !== null){
       
        seta.classList.remove('selecionado')
    }
   
    eu.classList.add('selecionado')
    para=name1
    
    
    
}
//function menuSeta2(eu,pegar){
  //  const seta =document.querySelector('.opcoesCaixa2 .selecionado')
    
    //if(seta !== null){
       
      //  seta.classList.remove('selecionado')
    //}
   
    //eu.classList.add('selecionado')
    //type = pegar
    
//}
function Reservado(){
    const seta =document.querySelector('.opcoes2')
   
    seta.classList.add('selecionado')
    
    const seta2 = document.querySelector('.opcoes3')
        
    seta2.classList.remove('selecionado')
    type ='private_message'
        
}
function Publico(){
    
    const seta =document.querySelector('.opcoes3')
    
    seta.classList.add('selecionado')
    
    const seta2 = document.querySelector('.opcoes2')
        
    seta2.classList.remove('selecionado')
    type ='message'
        
}
function entrar(){
    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',
    {
        name: nome
    })
    promessa.catch(tratarError);
    
}
function servidor(){
    // pegar coisas 
    const promessaPegar =axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessaPegar.then(pegador)
    
    //madar coisas
    
    
   

}


function pegador(pegar){
   console.log(pegar)
   
    
        let from = pegar.data[99].from
        let axt =pegar.data[99].text;
        let time =pegar.data[99].time
        let to =pegar.data[99].to
        let type =pegar.data[99].type
        
        console.log('pq?'+ axt)
    if((to=='Todos' || to == nome || from == nome) &&(textoTeste !== axt || nomeTeste !== from || timeTeste !== timeTeste)){ 
        
        
        console.log(textoTeste +' = '+axt+' e '+ nomeTeste+" = "+from )
        let ul = document.querySelector("ul");
        ul.scrollIntoView(false);
        if(axt =='entra na sala...'|| axt=='sai da sala...'){
        ul.innerHTML += `<div id='okk' class="caixaDeTexto cinza"><p>${time}  ${from} para ${to} : ${axt}</p></div>`
        }else if(type =='private_message'){
            ul.innerHTML += `<div id='okk' class="caixaDeTexto rosa"><p>${time}  ${from} para ${to} : ${axt}</p></div>`

        }else{
            ul.innerHTML += `<div id='okk' class="caixaDeTexto branco"><p>${time}  ${from} para ${to} : ${axt}</p></div>`

        }
        
        
        nomeTeste = from
        textoTeste = axt
        timeTeste = time
        
    }
    
   
}
function tratarError(erro){
    nome2()
}

function online(){
    const promessa2 = axios.post('https://mock-api.driven.com.br/api/v4/uol/status',
    {
        name: nome
    })
    promessa2.catch(DeuRuim)
}
function DeuRuim(erro){
    alert('conexão caiu')
    entrar()

}
function confirmadorOnline(){
    setInterval(online,1000);
}
function TIME(){
    setInterval(servidor,100);
}
function TIME2(){
    setInterval(selecionarfrom,10000);
}
function selecionarfrom(){
    const promessaPegar =axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessaPegar.then(selecionarPesoa)
    
}

function selecionarPesoa(pegar){
    
    
    let ull = document.querySelector(".teste");
    ull.innerHTML=''
    const lista =[]
    for(let a=0;a<100;a++){
        let j= 0
        let nomee= pegar.data[a].from
        ok = true
        while(j<lista.length){
            if(nomee==lista[j]){
                ok =false
                break
            }
            j++

        }
        if(ok){
            
            ull.innerHTML +=`<div class="opcoes" data-identifier="message"  onclick=" menuSeta(this, '${nomee}',Reservado())">
                <div class="amarrar">
                    <img src="Vector.png" class="imgPerfil">
                    <p>
                        ${nomee}
                    </p>
                    <ion-icon class="seta" name="checkmark-sharp"></ion-icon>
                </div>
                
            </div >` 
            lista.push(nomee)
        }

    }
}



confirmadorOnline()
TIME()
TIME2()
