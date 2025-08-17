const content = document.getElementById('detail');
let id = Number(window.location.hash.replace("#", ""))

async function getDetails() {
  try{
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!response.ok){
      throw new Error("Personagem não encontrado");
    }

    const data = await response.json()

    content.innerHTML = `
      <H2>${data.name}</H2>
      <img src="${data.image}" alt="${data.name}"/>
      <p>Espécie: ${data.species}</p>
      <p>Gênero: ${data.gender}</p>
      <p>Dimensão: ${data.origin.name}</p>
      <p>Status: ${data.status}</p>
      <button id="ante">Anterior</button>
      <button id="prox">Próximo</button>
    `;
    document.getElementById('ante').addEventListener('click', () => {
      if (id > 1) {
        id -= 1;
        window.location.hash = "#" + id;
        getDetails();
      }
    })
    
    document.getElementById('prox').addEventListener('click', () => {
      id += 1;
      window.location.hash = "#" + id;
      getDetails();
    })

  }catch (error) {
      content.innerHTML = `<p>Detalhes não esncontrados</p>`;
      console.error("Erro na requisição", error);
    }
}

getDetails();


/**
 * Buscar o personagem especifico e trazer os seguintes dados:
 * nome
 * imagem
 * especie
 * gênero
 * mundo/dimensão
 * status
 * 1 ponto extra pra quem colocar o link para detail la na index
 * **/