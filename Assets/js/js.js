fetch('../../infos/herois.json')
  .then((response) => response.json())
  .then(data => {
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
      cardImg.appendChild(imgHeros)

      //  TODO: box-title
      const cardTitle = document.createElement('div')
      cardTitle.classList.add('box-title');
      const hroNome = item.nome
      if(hroNome.length >= 25 ){
        cardTitle.innerHTML = '<marquee>' + hroNome + '</marquee>'
      } else{
        cardTitle.innerHTML = hroNome
      }

      // 

      //  TODO: Adiciona os elementos ao html
      cardDiv.appendChild(cardImg)
      cardDiv.appendChild(cardTitle)
      divCard.appendChild(cardDiv)

      cardDiv.addEventListener('click', ()=>{
        divCard.style.display = "none"
        // TODO Criar Modal
        // const modal = document.createElement('div')
        // modal.classList.add('modal')

        // // TODO adicionar imagem
        // const modalImg = document.createElement('img')
        // modalImg.classList.add('modal-img')
        // modalImg.src = srcHero
        // modalImg.alt = item.nome
        // modal.appendChild(modalImg)

        // // TODO adicionar titulo
        // const modalTitle = document.createElement('h2')
        // modalTitle.classList.add('modal-title')
        // modalTitle.innerHTML = item.nome
        // modal.appendChild(modalTitle)

        // // TODO Ficha do heroi
        // const modalFicha = document.createElement('div')
        // modalFicha.classList.add('modal-ficha')
        // modalFicha.innerHTML = '<p><span>Nome Original:</span> ' + item.nome_original + '</p><br /><p><span>Identidade Secreta:</span> ' + item.identified + '</p><br /><p><span>Origem:</span> ' + item.origem + '</p><br /><p><span>Altura:</span> ' + item.altura + '</p><br /><p><span>Peso:</span> ' + item.peso + '</p><br /><p><span>Ocupação:</span> ' + item.ocupacao + '</p><br /><p><span>Afiliações:</span> ' + item.afiliacoes + '</p>'
        
        // console.log(modal)
        
      })
    });
  })
  .catch(error => console.error(error));
  