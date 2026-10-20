import { useState } from "react";
import type { FormEvent } from "react";
import type { Todo, Prioridade } from "./types/Todo";
import TodoItem from "./components/TodoItem";

// Aplicação principal para gerenciamento de tarefas com prioridade.
const App = () => {
  // Lista inicial de tarefas demonstrativas para visualizar o layout.
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Estudar CP", completado: false, prioridade: "alta" },
    { id: 2, text: "Entregar Next", completado: true, prioridade: "media" },
    { id: 3, text: "Organizar estudos do fim de semana", completado: false, prioridade: "baixa" },
  ]);

  const [text, setText] = useState("");
  const [prioridade, setPrioridade] = useState<Prioridade>("media");

  // Adiciona uma nova tarefa validando o texto informado.
  const adicionarTarefa = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const novaTarefa: Todo = {
      id: Date.now(),
      text: text.trim(),
      completado: false,
      prioridade,
    };

    setTodos((tarefasAtuais) => [novaTarefa, ...tarefasAtuais]);
    setText("");
  };

  // Alterna o status concluído da tarefa.
  const toggleTarefas = (id: number) => {
    setTodos((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completado: !tarefa.completado } : tarefa
      )
    );
  };

  // Remove uma tarefa da lista.
  const deleteTarefa = (id: number) => {
    setTodos((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa.id !== id));
  };

  const tarefasConcluidas = todos.filter((tarefa) => tarefa.completado).length;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
          <header className="border-b border-white/10 bg-gradient-to-r from-violet-600/20 via-sky-600/20 to-cyan-500/10 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
                  Productivity board
                </p>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">Minhas Tarefas</h1>
              </div>

              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200">
                {tarefasConcluidas}/{todos.length} concluídas
              </div>
            </div>
          </header>

          <main className="space-y-6 px-6 py-8 sm:px-8">
            <form onSubmit={adicionarTarefa} className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 shadow-lg shadow-slate-950/20">
              <div className="flex flex-col gap-4 lg:flex-row">
                <label className="flex-1">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Nova tarefa</span>
                  <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Digite sua tarefa"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  />
                </label>

                <div className="flex flex-col gap-2 lg:w-52">
                  <label className="block text-sm font-medium text-slate-300">
                    Prioridade
                  </label>
                  <select
                    value={prioridade}
                    onChange={(event) => setPrioridade(event.target.value as Prioridade)}
                    className="rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:brightness-110 lg:w-auto"
                  >
                    Adicionar tarefa
                  </button>
                </div>
              </div>
            </form>

            <section className="space-y-3">
              {todos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 px-6 py-12 text-center text-slate-300">
                  Nenhuma tarefa cadastrada. Adicione sua primeira atividade.
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    tarefas={todo}
                    onToggle={toggleTarefas}
                    onDelete={deleteTarefa}
                  />
                ))
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
