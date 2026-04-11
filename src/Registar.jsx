import { useState } from "react";
import {CLASSES, TODAY} from "./constants.js";
import {uid} from "./helpers.js";

const EMPTY_FORM_STUDENTS = {
    name: "", username: "", password: "", cls: "", phone: "", joinDate: TODAY,
}

export default function Registar({ setStudents, students, setPath }) {
    const [form, setForm] = useState(EMPTY_FORM_STUDENTS)
    const [classes, setClasses] = useState("");
    const [err, setErr] = useState("");

    function registar(e) {
        e.preventDefault();

        if (form.username.trim() === "" || form.password.trim() === "" || classes === "") {
            setErr("Majburiy mayadonlarni to'ldiring"); return;
        }
        if (students.find((s) => s.username === form.username)) {
            setErr("Bu username allaqachon mavjud"); return;
        }
        setStudents((p) => [...p,{...form, role: "student", id: uid(), status: "active"}]);
        tozalash()
    }
    const tozalash = () => {
        setForm(EMPTY_FORM_STUDENTS);
        setClasses("");
        setErr("")
    }
    return (
        <div className="lw">
            <div className="lw-orb lw-orb1" />
            <div className="lw-orb lw-orb2" />

            <div className="lc">
                <div className="lc-logo">🎓</div>
                <h1>EduTrack</h1>
                <div className="lc-sub">Maktab boshqaruv tizimi</div>
                {/* Registar form */}
                <form onSubmit={registar}>
                    <div className="fl">
                        <label>Ism va Familiya</label>
                        <input
                            className="fi"
                            placeholder="Ism va familiya"
                            onChange={e => setForm((p) => ({...p, name: e.target.value}))}
                        />
                    </div>
                    <div className="fl">
                        <label>Login</label>
                        <input
                            className="fi"
                            placeholder="username"
                            autoComplete="off"
                            onChange={e => setForm((p) => ({...p, username: e.target.value}))}
                        />
                    </div>
                    <div className="fl">
                        <label>Parol</label>
                        <input
                            className="fi"
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setForm((p) => ({...p, password: e.target.value}))}
                        />
                    </div>
                    <div className="fl">
                        <label htmlFor="">Sinf</label>
                        <select name="" id="" className="fi" onChange={(e) => setClasses(e.target.value)}>
                            <option value="">Sinfni tanlang</option>
                            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <button className="btn-go" type="submit">
                        Ro'yhatdan o'tish →
                    </button>
                    {err && <div className="err-box">{err}</div>}
                </form>
                <div className="auth">Saytga kirmoqchimisiz? <span className="both_login" onClick={() => setPath("login")}>Kirish</span></div>
            </div>
        </div>
    );
}
