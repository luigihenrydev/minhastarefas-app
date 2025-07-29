let tarefas = [];

const form = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const selectCategoria = document.getElementById("categoria");
const lista = document.getElementById("lista-tarefas");
const botoesFiltro = document.querySelectorAll("#filtros button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarTarefa(inputTitulo.value, selectCategoria.value);
  inputTitulo.value = "";
});

function adicionarTarefa(titulo, categoria) {
  const nova = {
    id: Date.now(),
    titulo,
    categoria,
    concluida: false
  };
  tarefas.push(nova);
  renderizarTarefas();
}

function renderizarTarefas(filtro = "Todos") {
  lista.innerHTML = "";

  let tarefasFiltradas = filtro === "Todos"
    ? tarefas
    : tarefas.filter(t => t.categoria === filtro);

  tarefasFiltradas.forEach(tarefa => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${tarefa.concluida ? "completed" : ""}">
        [${tarefa.categoria}] ${tarefa.titulo}
      </span>
      <div>
        <button onclick="concluir(${tarefa.id})"><i class="fas fa-check"></i></button>
        <button onclick="remover(${tarefa.id})"><i class="fas fa-trash"></i></button>
      </div>
    `;
    lista.appendChild(li);
  });
}

document.querySelectorAll('#filtros button').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('#filtros button').forEach(b => b.classList.remove('ativo'))
    e.target.classList.add('ativo');
    filtrarPorCategoria(e.target.dataset.cat);
  });
});

function concluir(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) tarefa.concluida = !tarefa.concluida;
  renderizarTarefas();
}

function remover(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  renderizarTarefas();
}

botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    renderizarTarefas(cat);
  });
});
