import { useState } from "react";
import { ADMIN } from "../constants";

export default function Login({ onLogin, teachers, students }) {
  const [tab, setTab] = useState("admin");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function go(e) {
    e.preventDefault();
    setErr("");

    if (tab === "admin" && ADMIN.username === u && ADMIN.password === p) {
      onLogin(ADMIN);
      return;
    }
    if (tab === "teacher") {
      const t = teachers.find(
        (t) => t.username === u && t.password === p && t.status === "active"
      );
      if (t) { onLogin(t); return; }
    }
    if (tab === "student") {
      const s = students.find(
        (s) => s.username === u && s.password === p && s.status === "active"
      );
      if (s) { onLogin(s); return; }
    }
    setErr("Login yoki parol noto'g'ri!");
  }

  function switchTab(id) {
    setTab(id);
    setU("");
    setP("");
    setErr("");
  }

  const quickList =
    tab === "admin"
      ? [ADMIN]
      : tab === "teacher"
      ? teachers.filter((t) => t.status === "active").slice(0, 4)
      : students.filter((s) => s.status === "active").slice(0, 4);

  const roleLabel = { admin: "Admin", teacher: "Ustoz", student: "O'quvchi" };
  const roleClass = { admin: "hr-a", teacher: "hr-t", student: "hr-s" };

  return (
    <div className="lw">
      <div className="lw-orb lw-orb1" />
      <div className="lw-orb lw-orb2" />

      <div className="lc">
        <div className="lc-logo">🎓</div>
        <h1>EduTrack</h1>
        <div className="lc-sub">Maktab boshqaruv tizimi</div>

        {/* Role tabs */}
        <div className="rtabs">
          {[
            ["admin",   "👑",   "Admin"],
            ["teacher", "👨‍🏫", "Ustoz"],
            ["student", "👨‍🎓", "O'quvchi"],
          ].map(([id, ic, lb]) => (
            <button
              key={id}
              className={`rt${tab === id ? " on" : ""}`}
              onClick={() => switchTab(id)}
            >
              {ic} {lb}
            </button>
          ))}
        </div>

        {/* Login form */}
        <form onSubmit={go}>
          <div className="fl">
            <label>Login</label>
            <input
              className="fi"
              placeholder="username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="fl">
            <label>Parol</label>
            <input
              className="fi"
              type="password"
              placeholder="••••••••"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
          </div>
          <button className="btn-go" type="submit">
            Kirish →
          </button>
          {err && <div className="err-box">{err}</div>}
        </form>

        {/* Quick login hints */}
        <div className="hints">
          <div className="hints-ttl">⚡ Tez kirish (bosing)</div>
          {quickList.map((x, i) => (
            <div
              key={i}
              className="hint"
              onClick={() => { setU(x.username); setP(x.password); setErr(""); }}
            >
              <span className="hn">{x.name}</span>
              <span className="hc">{x.username}/{x.password}</span>
              <span className={`hr ${roleClass[x.role]}`}>
                {roleLabel[x.role]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
