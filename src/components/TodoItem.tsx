
import type { Todo } from '../types/Todo'

interface TodoItemProps {
    tarefas: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem = ({ tarefas, onToggle, onDelete }: TodoItemProps) => {
    const prioridadeCor = {
        baixa: "bg-blue-500 text-blue-400 border-blue-500",
        media: "bg-amber-500 text-amber-400 border-amber-500",
        alta: "bg-rose-500 text-rose-400 border-rose-500",
    };

    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={tarefas.completado}
                    onChange={() => onToggle(tarefas.id)}
                />

                <span
                    className={
                        tarefas.completado
                            ? "text-slate-500 line-through"
                            : "text-slate-200"
                    }
                >
                    {tarefas.text}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span
                    className={`rounded border px-2 py-1 text-xs ${prioridadeCor[tarefas.prioridade]}`}
                >
                    {tarefas.prioridade}
                </span>

                <button
                    onClick={() => onDelete(tarefas.id)}
                    className="rounded bg-rose-600 px-3 py-1 text-white hover:bg-rose-700"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
