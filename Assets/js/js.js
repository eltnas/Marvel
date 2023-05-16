function setarAtributo(value1, value2, value3, value4){
  value1.setAttribute(value2, value3)
  value4.appendChild(value1)
}
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
        const modal = document.querySelector('#modal')
        divCard.style.display = "none"
        modal.style.display = "flex"
        

        const modalContent = document.createElement('div')
        setarAtributo(modalContent, 'id', 'content', modal)

        // TODO adicionar imagem
        const modalImg = document.createElement('div')
        setarAtributo(modalImg, 'id', 'modal-img', modalContent)
        
        const imageSrc = document.createElement('img')
        imageSrc.src = srcHero
        imageSrc.alt = item.nome
        modalImg.appendChild(imageSrc)

        // TODO adicionar titulo
        const modalBody = document.createElement('div')
        setarAtributo(modalBody, 'id', 'modal-body', modalContent)

        const modalTitleCard = document.createElement('div')
        setarAtributo(modalTitleCard, 'id', 'modal-title', modalBody)
        modalTitleCard.innerHTML = '<h2>' + item.nome + '</h2>'

        // // TODO Ficha do heroi
        const modalFichaHeroi = document.createElement('div')
        setarAtributo(modalFichaHeroi, 'id', 'modal-desc', modalBody)
        modalFichaHeroi.innerHTML = '<p ><span>Nome Original: </span>' + item.nome_original + '</p><p ><span>Identidade Secreta: </span>' + item.identified + '</p><p ><span>Origem: </span>' + item.origem + '</p><p ><span>Altura: </span>' + item.altura + '</p><p ><span>Peso: </span>' + item.peso +'</p><p ><span>Ocupação: </span>' + item.ocupacao + '</p><p ><span>Afiliações: </span>' + item.afiliacao + '</p><p><span>Hostória</span></p>'
        
        // TODO Historia do Heroi
        const histHeroi = document.createElement('div')
        setarAtributo(histHeroi, 'id', 'modal-hist', modalBody)
        histHeroi.innerHTML = '<p>A primeira criatura desconhecida encontrada em Estados Unidos, o homem Adrian Toomes (Adi Toome</p>'
        
        console.log(modal)
        
      })
    });
  })
  .catch(error => console.error(error));
 
