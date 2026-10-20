
import type { Todo } from "../types/Todo";

interface TodoItemProps {
    tarefas: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

// Item individual da lista com status, prioridade e ação de exclusão.
const TodoItem = ({ tarefas, onToggle, onDelete }: TodoItemProps) => {
    // Define a aparência visual da prioridade para facilitar a leitura.
    const prioridadeCor = {
        baixa: "border-blue-500/40 bg-blue-500/10 text-blue-200",
        media: "border-amber-500/40 bg-amber-500/10 text-amber-200",
        alta: "border-rose-500/40 bg-rose-500/10 text-rose-200",
    };

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 shadow-md shadow-slate-950/20 transition hover:border-violet-500/50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={tarefas.completado}
                    onChange={() => onToggle(tarefas.id)}
                    className="h-5 w-5 rounded border-slate-600 bg-slate-950 text-violet-500 focus:ring-violet-500"
                />

                <span
                    className={
                        tarefas.completado
                            ? "text-base text-slate-500 line-through"
                            : "text-base text-slate-100"
                    }
                >
                    {tarefas.text}
                </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
                <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${prioridadeCor[tarefas.prioridade]}`}
                >
                    {tarefas.prioridade}
                </span>

                <button
                    onClick={() => onDelete(tarefas.id)}
                    className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
