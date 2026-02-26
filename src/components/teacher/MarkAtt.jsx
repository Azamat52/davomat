import { useState, useEffect } from "react";
import { TODAY, SUBJECTS } from "../../constants";

export default function MarkAtt({ user, att, setAtt, students, toast }) {
  const classStudents = students.filter((s) => s.cls === user.cls && s.status === "active");
  const [date,  setDate]  = useState(TODAY);
  const [subj,  setSubj]  = useState(user.subject);
  const [sts,   setSts]   = useState({});
  const [saved, setSaved] = useState(false);

  // Load existing attendance when date/subject changes
  useEffect(() => {
    const init = {};
    classStudents.forEach((s) => {
      const record = att.find(
        (a) => a.studentId === s.id && a.date === date && a.subject === subj
      );
      if (record) init[s.id] = record.status;
    });
    setSts(init);
    setSaved(false);
  }, [date, subj]);

  function setStatus(id, value) {
    setSts((p) => ({ ...p, [id]: value }));
    setSaved(false);
  }

  function setAll(value) {
    const map = {};
    classStudents.forEach((s) => (map[s.id] = value));
    setSts(map);
    setSaved(false);
  }

  function save() {
    const newRecords = classStudents.map((s) => ({
      id: `${s.id}-${date}-${subj}-${user.id}`,
      studentId: s.id,
      date,
      subject: subj,
      status: sts[s.id] || "absent",
      teacherId: user.id,
    }));
    setAtt((prev) => {
      const filtered = prev.filter(
        (a) => !(classStudents.find((s) => s.id === a.studentId) && a.date === date && a.subject === subj)
      );
      return [...filtered, ...newRecords];
    });
    setSaved(true);
    toast("Davomat saqlandi!");
  }

  const present  = Object.values(sts).filter((s) => s === "present").length;
  const absent   = Object.values(sts).filter((s) => s === "absent").length;
  const late     = Object.values(sts).filter((s) => s === "late").length;
  const unmarked = classStudents.length - Object.keys(sts).length;

  return (
    <div>
      <div className="ph">
        <div className="ph-title">✅ Davomat olish</div>
        <div className="ph-sub">{user.cls} sinfi</div>
      </div>

      <div className="card">
        {/* Controls */}
        <div className="frow">
          <input type="date" className="fs" value={date} onChange={(e) => setDate(e.target.value)} />
          <select className="fs" value={subj} onChange={(e) => setSubj(e.target.value)}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-sm btn-gn" onClick={() => setAll("present")}>✅ Hammasi keldi</button>
          <button className="btn btn-sm btn-rd" onClick={() => setAll("absent")}>❌ Hammasi kelmadi</button>
        </div>

        {/* Summary */}
        <div className="sumrow">
          <div className="sumi"><span style={{ color: "var(--a3)" }}>✅</span>Keldi: <strong>{present}</strong></div>
          <div className="sumi"><span style={{ color: "var(--r1)" }}>❌</span>Kelmadi: <strong>{absent}</strong></div>
          <div className="sumi"><span style={{ color: "var(--w1)" }}>⏰</span>Kech: <strong>{late}</strong></div>
          {unmarked > 0 && (
            <div className="sumi" style={{ color: "var(--t4)" }}>❓ Belgilanmagan: <strong>{unmarked}</strong></div>
          )}
        </div>

        {/* Student list */}
        <div className="tw">
          <table>
            <thead><tr><th>#</th><th>O'quvchi</th><th>Holat</th></tr></thead>
            <tbody>
              {classStudents.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--t4)", fontFamily: "Fira Code" }}>{i + 1}</td>
                  <td><strong>{s.name}</strong></td>
                  <td>
                    <div className="att-row">
                      <button className={`ab${sts[s.id] === "present" ? " sp" : ""}`} onClick={() => setStatus(s.id, "present")}>✅ Keldi</button>
                      <button className={`ab${sts[s.id] === "absent"  ? " sa" : ""}`} onClick={() => setStatus(s.id, "absent")}>❌ Kelmadi</button>
                      <button className={`ab${sts[s.id] === "late"    ? " sl" : ""}`} onClick={() => setStatus(s.id, "late")}>⏰ Kech</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save */}
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 13 }}>
          <button className="btn btn-pri" onClick={save} style={{ minWidth: 170 }}>💾 Saqlash</button>
          {saved && <span style={{ color: "var(--a3)", fontWeight: 700 }}>✅ Saqlandi!</span>}
        </div>
      </div>
    </div>
  );
}
