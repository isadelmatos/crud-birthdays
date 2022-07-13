const form = document.getElementById('form');
const tbody = document.getElementById('table').lastElementChild;
const tabelaCriada = document.querySelectorAll('.tabela-criada');
const spanListaVazia = document.getElementById('span-nenhum-cadastro');
const modal = document.getElementById('modal');
const iconeFechar = document.querySelector('.icon-fechar-modal');
const formModal = document.getElementById('form-modal');


let acessaLocalStorage = () => JSON.parse(localStorage.getItem('listaPessoasCadastradas')) ?? [];
let atualizaLocalStorage = (nomeBanco) => localStorage.setItem('listaPessoasCadastradas', JSON.stringify(nomeBanco));


form.addEventListener('submit', evento => {
    evento.preventDefault();

    const localStorage = acessaLocalStorage();
    console.log(localStorage);

    const nome = evento.target.elements['nome'];
    const data = evento.target.elements['data'];

    const pessoa = {
        nome: nome.value,
        data: data.value
    }

    localStorage.push(pessoa);

    atualizaLocalStorage(localStorage);
    carregaTabela();

    nome.value = '';
    data.value = '';
});



function carregaTabela() {

    const localStorage = acessaLocalStorage();

    if (localStorage.length) {
        spanListaVazia.style.visibility = "hidden";

        tabelaCriada.forEach(tag => {
            tag.style.display = "contents";
        });

        tbody.innerHTML = '';

        localStorage.forEach((pessoa, index) => {
            adicionaItem(pessoa, index);
        });
    } else {
        spanListaVazia.style.visibility = "visible";
        tabelaCriada.forEach(tag => {
            tag.style.display = "none";
        });
    }
}



function adicionaItem(pessoa, index) {
    const nome = pessoa.nome;
    const dataAniversario = pessoa.data;

    const tr = document.createElement('tr');

    tr.innerHTML = `
    <td>${nome}</td>
    <td>${dataAniversario}</td>
    <td onclick="editaItem(${index})"><i class="bi bi-pencil-square"></i></td>
    <td onclick="deletaItem(${index})"><i class="bi bi-trash3"></i></td>
    `

    tbody.appendChild(tr);
}



function editaItem(index) {
    modal.style.visibility = "visible";

    const localStorage = acessaLocalStorage();
    const inputNome = formModal.elements['nome-cadastrado'];
    const inputData = formModal.elements['data-cadastrada'];

    const elementoSelecionado = localStorage.find(elemento => elemento === localStorage[index]);

    inputNome.value = elementoSelecionado.nome;
    inputData.value = elementoSelecionado.data;


    formModal.addEventListener('submit', evento => {
        evento.preventDefault();

        const elementoAlterado = {
            nome: inputNome.value,
            data: inputData.value
        }

        localStorage.splice(index, 1, elementoAlterado);

        atualizaLocalStorage(localStorage);
        carregaTabela();

        modal.style.visibility = "hidden";
    });

    iconeFechar.addEventListener('click', () => {
        modal.style.visibility = "hidden";
    })

}


function deletaItem(index) {
    const localStorage = acessaLocalStorage();

    localStorage.splice(index, 1);
    atualizaLocalStorage(localStorage);
    carregaTabela();
}

carregaTabela();