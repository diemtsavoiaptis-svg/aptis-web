import React, { useMemo, useState, useEffect } from "react";
import { supabase } from "./supabase";
const defaultLessons = [  {
    id: 1,
    title: "Aptis Listening Part 1 - Test mẫu 1",
    part: "Part 1",
    level: "A1-A2",
    audioName: "sample-audio-1.mp3",
    textName: "sample-text-1.txt",
    transcript: "A woman is asking about the time of a movie.",
    questions: [
      {
        id: 1,
        question: "What time does the movie start?",
        options: ["6:40", "7:00", "9:20"],
        answer: 0,
      },
    ],
    createdAt: "2026-05-09",
  },
];

function getSavedLessons() {
  try {
    const saved = localStorage.getItem("aptis_lessons");
    return saved ? JSON.parse(saved) : defaultLessons;
  } catch {
    return defaultLessons;
  }
}

function saveLessons(lessons) {
  localStorage.setItem("aptis_lessons", JSON.stringify(lessons));
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-2xl">🎧</div>
      <div>
        <div className="text-xl font-bold text-emerald-950">ListenPro</div>
        <div className="text-xs text-slate-500">Aptis Listening System</div>
      </div>
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

 async function submit(e) {
  e.preventDefault();

  if (!form.email || !form.password) {
    return alert("Vui lòng nhập email và mật khẩu");
  }

  const { error } = await supabase
  .from("user")
  .insert([
    {
      full_name: form.name || "Học viên",
      email: form.email,
      password: form.password,
      role: "student",
      status: "pending",
    },
  ]);

  if (error) {
    console.log(error);
    return alert("Lỗi đăng ký");
  }

  

alert("Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.");}

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-5 text-white">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-emerald-100">Web luyện nghe theo file audio + text</div>
          <h1 className="text-5xl font-black leading-tight">Tạo kho bài Listening của riêng bạn</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Admin upload file ghi âm và file text. Số lượng bài test sẽ tự tăng theo số lượng file. Học viên đăng nhập để luyện nghe, chọn đáp án và xem kết quả.
          </p>
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5"><div className="text-3xl">🔐</div><b>Đăng nhập</b><p className="mt-2 text-sm text-slate-300">Admin / học viên</p></div>
            <div className="rounded-3xl bg-white/10 p-5"><div className="text-3xl">📤</div><b>Upload file</b><p className="mt-2 text-sm text-slate-300">Audio + text</p></div>
            <div className="rounded-3xl bg-white/10 p-5"><div className="text-3xl">🎧</div><b>Làm bài</b><p className="mt-2 text-sm text-slate-300">Part 1 listening</p></div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-7 text-slate-900 shadow-2xl">
          <Logo />
          <div className="mt-8 flex rounded-2xl bg-slate-100 p-1">
            <button onClick={() => setMode("login")} className={`flex-1 rounded-xl py-3 font-semibold ${mode === "login" ? "bg-emerald-800 text-white" : "text-slate-500"}`}>Đăng nhập</button>
            <button onClick={() => setMode("register")} className={`flex-1 rounded-xl py-3 font-semibold ${mode === "register" ? "bg-emerald-800 text-white" : "text-slate-500"}`}>Đăng ký</button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <input className="w-full rounded-2xl border p-4 outline-none focus:border-emerald-700" placeholder="Họ tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
            <input className="w-full rounded-2xl border p-4 outline-none focus:border-emerald-700" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="w-full rounded-2xl border p-4 outline-none focus:border-emerald-700" placeholder="Mật khẩu" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <select className="w-full rounded-2xl border p-4 outline-none focus:border-emerald-700" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="student">Tôi là học viên</option>
              <option value="admin">Tôi là admin</option>
            </select>
            <button className="w-full rounded-2xl bg-emerald-800 p-4 font-bold text-white hover:bg-emerald-900">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>
          </form>

          <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
            Demo: nhập email/mật khẩu bất kỳ. Chọn vai trò admin hoặc học viên để xem giao diện khác nhau.
          </div>
        </section>
      </div>
    </div>
  );
}

function Layout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-slate-900">
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r bg-white p-5 lg:block">
        <Logo />
        <div className="mt-8 rounded-3xl bg-emerald-50 p-4">
          <div className="text-sm text-slate-500">Tài khoản</div>
          <div className="mt-1 font-bold">{user.name}</div>
          <div className="text-sm text-emerald-800">{user.role === "admin" ? "Admin" : "Học viên"}</div>
        </div>
        <nav className="mt-6 space-y-2">
          <div className="rounded-2xl bg-emerald-800 px-4 py-3 font-semibold text-white">{user.role === "admin" ? "📤 Quản lý bài nghe" : "🎧 Kho bài học"}</div>
          <div className="rounded-2xl px-4 py-3 text-slate-600">📊 Kết quả</div>
          <div className="rounded-2xl px-4 py-3 text-slate-600">⚙️ Cài đặt</div>
        </nav>
        <button onClick={onLogout} className="absolute bottom-5 left-5 right-5 rounded-2xl border px-4 py-3 font-semibold hover:bg-slate-50">Đăng xuất</button>
      </aside>
      <main className="lg:ml-72">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-5 py-4 backdrop-blur">
          <div>
            <div className="text-sm text-slate-500">ListenPro</div>
            <h1 className="text-xl font-bold">{user.role === "admin" ? "Trang Admin" : "Trang Học viên"}</h1>
          </div>
          <button onClick={onLogout} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold lg:hidden">Đăng xuất</button>
        </header>
        {children}
      </main>
    </div>
  );
}

function AdminDashboard({ lessons, setLessons }) {
  const [form, setForm] = useState({ title: "", part: "Part 1", level: "A1-A2", transcript: "", audioFile: null, textFile: null });

  function addLesson(e) {
    e.preventDefault();
    if (!form.title || !form.audioFile || !form.textFile) return alert("Admin cần nhập tên bài, file ghi âm và file text");
    const newLesson = {
      id: Date.now(),
      title: form.title,
      part: form.part,
      level: form.level,
      audioName: form.audioFile.name,
      textName: form.textFile.name,
      transcript: form.transcript || "Transcript sẽ được lấy từ file text sau khi làm backend.",
      questions: [
        { id: 1, question: "Câu hỏi mẫu từ file text", options: ["A", "B", "C"], answer: 0 },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const updated = [newLesson, ...lessons];
    setLessons(updated);
    saveLessons(updated);
    setForm({ title: "", part: "Part 1", level: "A1-A2", transcript: "", audioFile: null, textFile: null });
  }

  function removeLesson(id) {
    const updated = lessons.filter((lesson) => lesson.id !== id);
    setLessons(updated);
    saveLessons(updated);
  }

  return (
    <div className="grid gap-6 p-5 xl:grid-cols-[420px_1fr]">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Upload bài Listening</h2>
        <p className="mt-2 text-slate-500">Mỗi bộ gồm 1 file ghi âm và 1 file text sẽ tạo thành 1 bài test mới.</p>
        <form onSubmit={addLesson} className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border p-4" placeholder="Tên bài test, ví dụ: Test 16 - Part 1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <select className="rounded-2xl border p-4" value={form.part} onChange={(e) => setForm({ ...form, part: e.target.value })}>
              <option>Part 1</option><option>Part 2</option><option>Part 3</option><option>Part 4</option>
            </select>
            <select className="rounded-2xl border p-4" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              <option>A1-A2</option><option>B1</option><option>B2</option><option>C1</option>
            </select>
          </div>
          <label className="block rounded-2xl border border-dashed p-4">
            <div className="font-semibold">🎧 File ghi âm MP3/WAV</div>
            <input className="mt-3" type="file" accept="audio/*" onChange={(e) => setForm({ ...form, audioFile: e.target.files[0] })} />
          </label>
          <label className="block rounded-2xl border border-dashed p-4">
            <div className="font-semibold">📄 File text TXT/DOC</div>
            <input className="mt-3" type="file" accept=".txt,.doc,.docx,.pdf" onChange={(e) => setForm({ ...form, textFile: e.target.files[0] })} />
          </label>
          <textarea className="w-full rounded-2xl border p-4" rows="5" placeholder="Transcript hoặc ghi chú câu hỏi" value={form.transcript} onChange={(e) => setForm({ ...form, transcript: e.target.value })} />
          <button className="w-full rounded-2xl bg-emerald-800 p-4 font-bold text-white hover:bg-emerald-900">Thêm vào kho bài</button>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Kho bài đã upload</h2>
            <p className="mt-1 text-slate-500">Tổng số bài test: {lessons.length}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-5 py-3 text-center"><b className="text-2xl text-emerald-800">{lessons.length}</b><div className="text-xs text-slate-500">bài</div></div>
        </div>
        <div className="mt-6 space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="rounded-2xl border p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{lesson.part} · {lesson.level} · {lesson.createdAt}</p>
                  <p className="mt-2 text-sm">🎧 {lesson.audioName} · 📄 {lesson.textName}</p>
                </div>
                <button onClick={() => removeLesson(lesson.id)} className="rounded-xl border px-4 py-2 text-red-600 hover:bg-red-50">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StudentDashboard({ lessons }) {
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (selected) {
    const score = selected.questions.reduce((sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0);
    return (
      <div className="p-5">
        <button onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false); }} className="mb-5 rounded-xl border bg-white px-4 py-2">← Quay lại kho bài</button>
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase text-emerald-700">{selected.part} · {selected.level}</p>
            <h2 className="mt-2 text-3xl font-bold">{selected.title}</h2>
            <div className="mt-5 rounded-2xl bg-slate-100 p-4">🎧 Audio: {selected.audioName}</div>
            <div className="mt-5 rounded-2xl border p-5">
              <h3 className="font-bold">Transcript / nội dung text</h3>
              <p className="mt-3 leading-8 text-slate-700">{selected.transcript}</p>
            </div>
            <div className="mt-5 space-y-4">
              {selected.questions.map((q) => (
                <div key={q.id} className="rounded-2xl border p-5">
                  <h3 className="font-bold">Câu {q.id}. {q.question}</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {q.options.map((option, idx) => (
                      <button key={option} onClick={() => setAnswers({ ...answers, [q.id]: idx })} className={`rounded-xl border p-4 text-left ${answers[q.id] === idx ? "border-emerald-800 bg-emerald-50 font-bold text-emerald-900" : "bg-white"}`}>{String.fromCharCode(65 + idx)}. {option}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm xl:sticky xl:top-24">
            <h3 className="text-xl font-bold">Bảng làm bài</h3>
            <p className="mt-2 text-slate-500">Đã làm {Object.keys(answers).length}/{selected.questions.length}</p>
            <button onClick={() => setSubmitted(true)} className="mt-5 w-full rounded-2xl bg-emerald-800 p-4 font-bold text-white">Nộp bài</button>
            {submitted && <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-center"><div className="text-sm text-slate-500">Kết quả</div><div className="text-4xl font-black text-emerald-800">{score}/{selected.questions.length}</div></div>}
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <section className="rounded-3xl bg-emerald-950 p-7 text-white">
        <h2 className="text-3xl font-bold">Kho bài Listening</h2>
        <p className="mt-2 text-emerald-100">Số lượng bài test đang có: {lessons.length}. Admin upload thêm file thì học viên sẽ thấy thêm bài.</p>
      </section>
      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson, index) => (
          <article key={lesson.id} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">Test {lessons.length - index}</span><span>★★★</span></div>
            <h3 className="text-xl font-bold">{lesson.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{lesson.part} · {lesson.level}</p>
            <p className="mt-4 rounded-2xl bg-slate-100 p-3 text-sm">🎧 {lesson.audioName}</p>
            <button onClick={() => setSelected(lesson)} className="mt-5 w-full rounded-2xl bg-emerald-800 p-4 font-bold text-white hover:bg-emerald-900">Vào học</button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
 
  const [lessons, setLessons] = useState(getSavedLessons);

  if (!user) return <AuthScreen onLogin={setUser} />;

  return (
    <Layout user={user} onLogout={() => setUser(null)}>
      {user.role === "admin" ? <AdminDashboard lessons={lessons} setLessons={setLessons} /> : <StudentDashboard lessons={lessons} />}
    </Layout>
  );
}
