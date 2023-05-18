function setarAtributo(value1, value2, value3, value4){
  value1.setAttribute(value2, value3)
  value4.appendChild(value1)
}

fetch('../../infos/herois.json')
  .then((response) => response.json())
  .then(data => {
    const dataItems = data.length
    const divCard = document.querySelector('#card')
    data.forEach(item => {
      let idHro = item.image
      // TODO: box-card
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('box-card');
      cardDiv.id = item.id

      //  TODO: box-img
      const cardImg = document.createElement('div');
      cardImg.classList.add('box-img');
      
      //  TODO: img
      const imgHeros = document.createElement('img')
      let srcHero = idHro.replace('./', '../../infos/')
      imgHeros.src = srcHero

      //  TODO: box-title
      const cardTitle = document.createElement('div')
      cardTitle.classList.add('box-title');
      const hroNome = item.nome
      if(hroNome.length >= 16 ){
        cardTitle.innerHTML = '<marquee>' + item.nome + '</marquee>'
      } else{
        cardTitle.innerHTML = item.nome
      }
      //  TODO: Adiciona os elementos ao html
      cardDiv.appendChild(cardImg)
      cardImg.appendChild(imgHeros)
      cardDiv.appendChild(cardTitle)
      divCard.appendChild(cardDiv)

      cardDiv.addEventListener('click', ()=>{
        // TODO: Seleciona as divs
        const modal = document.querySelector('#modal')
        const imgPersonagem = document.getElementById('modal-img')
        const titlePerson = document.getElementById('modal-title')
        const modalDesc = document.getElementById('modal-desc')

        function fecharCard(){
          modal.style.display = "none"
          divCard.style.display = "flex"
          persImg.remove()
        }

        // Aqui faz ela ficar visivel
        modal.style.display = "flex";

        const fundoBkg = document.getElementById('fundo-bkg');
        fundoBkg.addEventListener('click', ()=>{
          fecharCard();
        })

        // Imagem do Personagem
        const persImg = document.createElement('img');
        persImg.src = srcHero;
        persImg.alt = hroNome;
        persImg.classList.add('img-personagem');
        imgPersonagem.appendChild(persImg)

        // Titulo
        if(hroNome.length >= 20 ){
          titlePerson.innerHTML = '<marquee>' + item.nome + '</marquee>'
        } else{
          titlePerson.innerHTML = item.nome
        }
        const btnClose = document.createElement('img');
        btnClose.src = '../../img/botao-fechar.png';
        btnClose.alt = 'Fechar';
        btnClose.classList.add('btn-close');
        titlePerson.appendChild(btnClose)
        btnClose.addEventListener('click', ()=> {
          fecharCard()
        })
        // Ficha do personagem
        const infos = '<p><span>Nome Original: </span>' + item.nome_original + '</p>\n' +
            '          <p><span>Identidade Secreta: </span>' + item.identified + '</p>\n' +
            '          <p><span>Origem: </span>' + item.origem + '</p>\n' +
            '          <p><span>Altura: </span>' + item.altura + '</p>\n' +
            '          <p><span>Peso: </span>' + item.peso + '</p>\n' +
            '          <p><span>Ocupação: </span>' + item.ocupacao + '</p>\n' +
            '          <p><span>Afiliações: </span>' + item.afiliacoes + '</p>\n' +
            '          <p id="hist"><span><u>História</u></span></p>';
        modalDesc.innerHTML = infos;

        // Aqui ele vai ler a descrição do Personagem e vai mostrar na tela
        const urlDesc = item.descricao
        urlDescricao = urlDesc.replace('./', '../../infos/')
        //console.log(urlDescricao)
        fetch(urlDescricao)
            .then(response => response.text())
            .then(data => {
              const modalHist = document.createElement('div')
              modalHist.setAttribute('id', 'modal-hist')
              modalHist.innerHTML = '<p>' + data + '</p>';

              modalDesc.appendChild(modalHist)
              console.log(modal);
            })
            .catch(error => {
              // Trate possíveis erros
              console.error('Ocorreu um erro:', error);
            });

      })

    });
  })
  .catch(error => console.error(error));
