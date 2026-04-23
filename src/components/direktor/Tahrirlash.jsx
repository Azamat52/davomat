import {ini} from "../../helpers.js";
import Modal from "../Modal.jsx";
import {useState} from "react";

function Tahrirlash({admins, students, teachers, direktor, setStudents, setTeachers, setAdmins, toast}) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [role, setRole] = useState("admin");
    const [form, setForm] = useState({ pays: "" , name: "", password: "" , username: ""});
    const [formErr, setFormErr] = useState("");
    const [id, setId] = useState(null);
    const [checkPassword, setCheckPassword] = useState({text: "", width: 0});
    const textField = [
        ["Oylik maosh(ixtiyoriy)", "pays", "Oylik maosh ($)", "number"],
        ["Isn Familya", "name", "Isn Familya", "text"],
        ["Parol *", "password", "••••••", `${showPassword ? "password" : "text"}`],
        ["Login", "username", "Username", "text"]
    ];
    console.log(role)
    function NextOpening(){ setShow(true); setFormErr(""); setForm({ pays: "" , name: "", password: "" , username: ""}); CheckingPassword("") }

    const FinishEditing = () => {
        if (form.name.trim() === "" || form.username.trim() === "" || form.password.trim() === "") {
            setFormErr("Majburiy maydonni to'ldiring"); return;
        }
        if (students.find((student) => student.username === form.username) || teachers.find((teacher) => teacher.username === form.username) || admins.find((admin) => admin.username === form.username) || direktor.username === form.username) {
            setFormErr("Bu username allaqachon mavjud"); return;
        }
        if (checkPassword.text === "Zaif parol" || checkPassword.text === "O'rtacha parol"){
            setFormErr("Kuchliroq parol o'ylab toping"); return;
        }
        setAdmins(admins.map((admin) => admin.id === id && admin.role === "admin" ? {...admin, pays: Number(form.pays), name: form.name, username: form.username, password: form.password} : admin));
        setTeachers(teachers.map((teacher) => teacher.id === id && teacher.role === "teacher" ? {...teacher, pays: Number(form.pays), name: form.name, username: form.username, password: form.password} : teacher));
        setStudents(students.map((student) => student.id === id && student.role === "student" ? {...student, pays: Number(form.pays), name: form.name, username: form.username, password: form.password} : student))
        setShow(false)
        toast("Ma'lumotlar muvafaqiyatli o'zgartirldi")
    }
    const CheckingPassword = (value) => {
        const length = value.trim().length;
        if (length === 0){
            setCheckPassword((p) => ({...p, text: "", width: 0}))
        } else if (length <= 3) {
            setCheckPassword(p => ({ ...p, text: "Zaif parol", width: 25 }));
        } else if (length <= 8) {
            setCheckPassword(p => ({ ...p, text: "O'rtacha parol", width: 66 }));
        } else {
            setCheckPassword(p => ({ ...p, text: "Kuchli parol", width: 100 }));
        }
    };
    return (
        <div className="users">
            <div className="ph">
                <div className="ph-top">
                    <div className="ph-title">🖋️ Foydalanuvchilarning ma'lumotlarini o'zgartirish</div>
                </div>
            </div>
            <div className="admins">
                <div className="title">👑 Adminlar</div>
                <div className="ph-sub">
                    {admins.filter((t) => t.status === "active").length}faol / {admins.length} jami
                </div>
                <div className="pays">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Huquq</th>
                            <th>Login</th>
                            <th>Holat</th>
                            <th>Oylik maosh</th>
                            <th>O'zgartirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {admins.map((t, i) => {
                            return (
                                <tr key={t.id}>
                                    <td style={{ color: "var(--t4)" }}>{i + 1}</td>
                                    <td style={{ fontFamily: "Fira Code" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                            <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                                            <span style={{fontWeight: 500 }}>{t.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: "var(--t4)" }}>{t.username}</td>
                                    <td>
                                          <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                                              {t.status === "active" ? "✅ Faol" : "🚫 Huquqsiz"}
                                          </span>
                                    </td>
                                    <td>
                                        <div className={t.status === "active" ? "salary-on" : "salary-off"}>
                                            {t.status === "active" ? `Oylik maosh ${t.pays}$` : "Bu admin huquqsiz!"}
                                        </div>
                                    </td>
                                    <td style={{color: "var(--t4)"}} onClick={() => {t.status === "active" && NextOpening()}}>
                                        <div className={t.status === "active" ? "edit" : "un-edit"} onClick={() => {setId(teachers[i].id); setName(t.name)}}>
                                            {t.status === "active" ? "Ma'lumotni o'zgartirish" : "Ma'lumotni o'zgaritish imkonsiz"}<i className="fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <div className="teachers">
                <div className="title">👨‍🏫 Ustozlar</div>
                <div className="ph-sub">
                    {teachers.filter((t) => t.status === "active").length}faol / {teachers.length}jami
                </div>
                <div className="pays">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Huquq</th>
                            <th>Login</th>
                            <th>Holat</th>
                            <th>Oylik maosh</th>
                            <th>O'zgartirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teachers.map((t, i) => {
                            return (
                                <tr key={t.id}>
                                    <td style={{ color: "var(--t4)" }}>{i + 1}</td>
                                    <td style={{ fontFamily: "Fira Code" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                            <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                                            <span style={{fontWeight: 500 }}>{t.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: "var(--t4)" }}>{t.username}</td>
                                    <td>
                                          <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                                              {t.status === "active" ? "✅ Faol" : "🚫 Ishdan bo'shatilgan"}
                                          </span>
                                    </td>
                                    <td>
                                        <div className={t.status === "active" ? "salary-on" : "salary-off"}>
                                            {t.status === "active" ? `Oylik maosh ${t.pays}$` : "Bu ustoz ishdan bo'shatilgan!"}
                                        </div>
                                    </td>
                                    <td style={{color: "var(--t4)"}} onClick={() => {t.status === "active" && NextOpening()}}>
                                        <div className={t.status === "active" ? "edit" : "un-edit"} onClick={() => {setId(teachers[i].id); setName(t.name)}}>
                                            {t.status === "active" ? "Ma'lumotni o'zgartirish" : "Ma'lumotni o'zgartirish imkonsiz"}<i className="fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            <div className="students">
                <div className="title"> 🧑‍🎓 O'quvchilar</div>
                <div className="ph-sub">
                    {students.filter((t) => t.status === "active").length}faol / {students.length}jami
                </div>
                <div className="pays">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Huquq</th>
                            <th>Login</th>
                            <th>Holat</th>
                            <th>O'zgartirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((t, i) => {
                            return (
                                <tr key={t.id}>
                                    <td style={{ color: "var(--t4)" }}>{i + 1}</td>
                                    <td style={{ fontFamily: "Fira Code" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                            <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                                            <span style={{fontWeight: 500 }}>{t.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: "var(--t4)" }}>{t.username}</td>
                                    <td>
                                          <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                                              {t.status === "active" ? "✅ Faol" : "🚫 Maktabdan haydalgan"}
                                          </span>
                                    </td>
                                    <td style={{color: "var(--t4)"}} onClick={() => {t.status === "active" && NextOpening()}}>
                                        <div className={t.status === "active" ? "edit" : "un-edit"} onClick={() => {setId(students[i].id); setName(t.name); setRole(t.role)}}>
                                            {t.status === "active" ? "Ma'lumotni o'zgartirish" : "Ma'lumotni o'zgartirish imkaonsiz"}<i className="fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="Editing">
                {show && (
                    <Modal title={`${name}ning ma'lumotlarini o'zgartirish`} sub={"Malumotlarni to'ldiring"} onClose={() => setShow((false))}>
                        {textField.map(([label, key, placeholder, type]) => {
                            return(
                                <>
                                    <div key={key} className="fl">
                                        <label htmlFor="">{label}</label>
                                        <input className="fi" type={type}
                                               placeholder={placeholder} onChange={(e) => {
                                            setForm((p) => ({...p, [key]: e.target.value}));
                                            key === "password" && CheckingPassword(e.target.value);
                                        }}/>
                                        {key === "password" && (
                                            <button className="changing_password" type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}>
                                                {showPassword ? <i className="fa-regular fa-eye"></i> :
                                                    <i className="fa-regular fa-eye-slash"></i>}
                                            </button>)}
                                    </div>
                                    {key === "password" && (checkPassword && (
                                        <div className={`Checking_password ${checkPassword.width === 0 && "hidden"}`} style={{marginTop: "10px"}}>
                                            <p>{checkPassword.text}</p>
                                            <div className="p_check">
                                                <div
                                                    className={`p_check_in ${checkPassword.width === 25 && "red" || checkPassword.width === 66 && "orange" || checkPassword.width === 100 && "green"}`}
                                                    style={{width: `${checkPassword.width}%`}}></div>
                                            </div>
                                        </div>))}
                                </>
                            )
                        })}
                        {formErr && <div className="err-box">{formErr}</div>}
                        <div className="mrow">
                            <button className="btn btn-rd" onClick={() => setShow(false)}>Bekor qilish</button>
                            <button className="btn btn-pri" onClick={FinishEditing}>✅ O'zgartirish</button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}
export default Tahrirlash;