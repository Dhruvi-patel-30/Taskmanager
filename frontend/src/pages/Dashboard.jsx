import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  RefreshCw,
  LogOut,
  Loader2,
} from "lucide-react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title || !description) return alert("Fill all fields");

    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      alert("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async (id) => {
    const newTitle = prompt("New title");
    const newDesc = prompt("New description");

    if (!newTitle || !newDesc) return;

    await API.put(`/tasks/${id}`, {
      title: newTitle,
      description: newDesc,
    });

    fetchTasks();
  };

  const toggleStatus = async (id) => {
    await API.patch(`/tasks/${id}/status`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white gap-3">
        <Loader2 className="animate-spin text-indigo-400" size={40} />
        <p className="text-slate-400 tracking-wide text-sm">
          Loading Dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white p-4 md:p-8 font-sans">
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl shadow-xl mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Task Dashboard 
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Manage your productive hours
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold border border-rose-500/20 transition-all duration-200"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3 items-start">
        
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl sticky top-8">
          <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Plus size={18} className="text-indigo-400" /> Add New Task
          </h2>

          <div className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <textarea
                rows="3"
                className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                placeholder="Task Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              onClick={addTask}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Plus size={16} /> Create Task
            </button>
          </div>
        </div>

       
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            Your Tasks{" "}
            <span className="bg-slate-800 text-indigo-400 px-2 py-0.5 rounded-md text-xs">
              {tasks.length}
            </span>
          </h2>

          {tasks.length === 0 ? (
            <div className="text-center p-12 bg-white/5 border border-white/5 rounded-2xl">
              <p className="text-slate-500 text-sm">
                No tasks found. Relax or add a new one! ☕
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    task.status === "completed"
                      ? "bg-emerald-950/10 border-emerald-500/20 shadow-emerald-950/5"
                      : "bg-white/5 border-white/10 hover:border-slate-700 shadow-xl"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3
                        className={`font-bold text-base tracking-wide ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-100"}`}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-1 rounded-md ${
                          task.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${task.status === "completed" ? "line-through text-slate-600" : "text-slate-400"}`}
                    >
                      {task.description}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-white/5">
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateTask(task._id)}
                        className="p-2 hover:bg-white/5 text-slate-400 hover:text-indigo-400 rounded-lg transition"
                        title="Edit Task"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 hover:bg-white/5 text-slate-400 hover:text-rose-400 rounded-lg transition"
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => toggleStatus(task._id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        task.status === "completed"
                          ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10"
                      }`}
                    >
                      {task.status === "completed" ? (
                        <>
                          <RefreshCw size={12} /> Reopen
                        </>
                      ) : (
                        <>
                          <CheckCircle size={12} /> Complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
