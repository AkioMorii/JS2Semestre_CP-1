//Exercício 2.1
const salarios = [1200, 1350, 5305, 1139, 2955, 3000, 2060, 1780, 3801, 2460];

function aumentosal(salario) {
    if (salario > 2000) {
        return salario + (salario * 0.1);
    } else {
        return salario + (salario * 0.15);
    }
};

const resultado = salarios.map(aumentosal);
console.log(resultado);

//Exercício 2.2
const salariosup = resultado.filter(item => item > 2500);
console.log(salariosup);

//Exercício 2.3
const soma = salariosup.reduce((acumulado, atual) => acumulado + atual);
console.log(soma);


//Exercício 3
document.getElementById("button_adicionar_tarefa").addEventListener("click", adicionar_tarefaButton);
document.getElementById("button_excluir_tarefas").addEventListener("click", excluirConcluidas);
document.getElementById("button_tarefasImportantes").addEventListener("click", mostrarListaImportante)

const table = document.getElementById("table-main-1");

const arrayobjectTable_main = []
function adicionar_tarefaButton() {
    const descricao = prompt("Digite a descrição da tarefa que deseja adicionar:");
    const autor = prompt("Digite o nome do autor:");
    const departamento = prompt("Digite o departamento:");
    const importancia = prompt("Digite o grau de importância com numeros de 1 á 5, onde 1 é MUITO importante:");

    const objectTable_main = {
        descricao: descricao,
        autor: autor,
        departamento: departamento,
        importancia: importancia,
        valor: "",
        duracao: "",
        concluida: false,
    };
    arrayobjectTable_main.push(objectTable_main);
    atualizarTarefas()
}

function atualizarTarefas(){
    const tableBody = table.querySelector('tbody');

    tableBody.innerHTML = '';

    arrayobjectTable_main.forEach((tarefa, index) => {
        const newRow = tableBody.insertRow();
        
        const descricaoCell = newRow.insertCell();
        descricaoCell.textContent = tarefa.descricao;
        descricaoCell.classList.add('th_table_main_newCells');

        const autorCell = newRow.insertCell();
        autorCell.textContent = tarefa.autor;
        autorCell.classList.add('th_table_main_newCells');

        const departamentoCell = newRow.insertCell();
        departamentoCell.textContent = tarefa.departamento;
        departamentoCell.classList.add('th_table_main_newCells');

        const importanciaCell = newRow.insertCell();
        importanciaCell.textContent = tarefa.importancia;
        importanciaCell.classList.add('th_table_main_newCells');

        const valorCell = newRow.insertCell();
        const valorInput = document.createElement('input');
        valorInput.type = 'text';
        valorInput.value = tarefa.valor;
        valorInput.classList.add('th_table_main_newCells_input');
        valorInput.addEventListener('input', (event) => atualizarValor(index, event.target.value));
        valorCell.appendChild(valorInput);
        valorCell.classList.add('th_table_main_newCells_input_sign');

        const duracaoCell = newRow.insertCell();
        const duracaoInput = document.createElement('input');
        duracaoInput.type = 'text';
        duracaoInput.value = tarefa.duracao;
        duracaoInput.classList.add('th_table_main_newCells_input');
        duracaoInput.addEventListener('input', (event) => atualizarDuracao(index, event.target.value));
        duracaoCell.appendChild(duracaoInput);
        duracaoCell.classList.add('th_table_main_newCells_input_duracao');

        const concluidaCell = newRow.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener('click', () => marcarConcluida(index));
        concluidaCell.appendChild(checkbox);
    });
}

function marcarConcluida(index) {
    arrayobjectTable_main[index].concluida = !arrayobjectTable_main[index].concluida;
    atualizarTarefas();
}

function excluirConcluidas() {
    for (let i = arrayobjectTable_main.length - 1; i >= 0; i--) {
        if (arrayobjectTable_main[i].concluida) {
            arrayobjectTable_main.splice(i, 1);
        }
    }
    atualizarTarefas()
}

function mostrarListaImportante() {
    const listaImportante = arrayobjectTable_main
        .filter(tarefa => tarefa.importancia >= 1 && tarefa.importancia <= 5)
        .sort((a, b) => a.importancia - b.importancia)
        .map(tarefa => tarefa.descricao);

    alert("Lista de Tarefas Importantes:\n\n" + listaImportante.join("\n"));
}

function atualizarValor(index, novoValor) {
    arrayobjectTable_main[index].valor = novoValor;
}

function atualizarDuracao(index, novaDuracao) {
    arrayobjectTable_main[index].duracao = novaDuracao;
}