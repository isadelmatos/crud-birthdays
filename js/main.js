const form = document.getElementById('form');
const table = document.getElementById('table');
const tabelaCriada = document.querySelectorAll('.tabela-criada');
const spanListaVazia = document.getElementById('span-nenhum-cadastro');

const listaPessoasCadastradas = JSON.parse(localStorage.getItem('listaPessoasCadastradas')) || [];


if (listaPessoasCadastradas.length) {
    spanListaVazia.style.visibility = "hidden";

    tabelaCriada.forEach(item => {
        item.style.display = "contents";
    });

    listaPessoasCadastradas.forEach(pessoa => {
        adicionaItem(pessoa);
    })
}


form.addEventListener('submit', evento => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const data = evento.target.elements['data'];

    const pessoa = {
        nome: nome.value,
        data: data.value
    }

    if (!listaPessoasCadastradas.length) {
        spanListaVazia.style.visibility = "hidden";
        tabelaCriada.forEach(item => {
            item.style.display = "contents";
        });
        adicionaItem(pessoa);

    } else {
        adicionaItem(pessoa);
    }

    listaPessoasCadastradas.push(pessoa);
    localStorage.setItem('listaPessoasCadastradas', JSON.stringify(listaPessoasCadastradas));

});


function adicionaItem(pessoa) {

    const tbody = table.lastElementChild;

    const nome = pessoa.nome;
    const dataAniversario = pessoa.data;

    const tr = document.createElement('tr');
    const celulaNome = document.createElement('td');
    const celulaData = document.createElement('td');
    const celulaEditar = document.createElement('td');
    const celulaRemover = document.createElement('td');

    celulaNome.innerHTML = nome;
    celulaData.innerHTML = dataAniversario;
    celulaEditar.innerHTML = '<i class="bi bi-pencil-square"></i>'
    celulaRemover.innerHTML = '<i class="bi bi-trash3"></i>'

    const celulas = [celulaNome, celulaData, celulaEditar, celulaRemover];

    celulas.forEach(celula => {
        tr.appendChild(celula);
    })

    tbody.appendChild(tr);
}