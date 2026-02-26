import { useState } from "react";
import { stBadge, stLabel } from "../../helpers";

export default function SMyAtt({ user, att }) {
  const myAtt = att.filter((a) => a.studentId === user.id);
  const [fStatus,  setFStatus]  = useState("all");
  const [fSubject, setFSubject] = useState("all");

  const subjects = [...new Set(myAtt.map((a) => a.subject))];

  const shown = myAtt.filter(
    (a) =>
      (fStatus  === "all" || a.status  === fStatus) &&
      (fSubject === "all" || a.subject === fSubject)
  );

  return (
    <div>
      <div className="ph">
        <div className="ph-title">📋 Mening davomatim</div>
        <div className="ph-sub">{myAtt.length} ta yozuv</div>
      </div>

      <div className="card">
        <div className="frow">
          <select className="fs" value={fSubject} onChange={(e) => setFSubject(e.target.value)}>
            <option value="all">Barcha fanlar</option>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="fs" value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
            <option value="all">Barcha holat</option>
            <option value="present">Keldi</option>
            <option value="absent">Kelmadi</option>
            <option value="late">Kech</option>
          </select>
        </div>

        <div className="tw">
          <table>
            <thead><tr><th>#</th><th>Sana</th><th>Fan</th><th>Holat</th></tr></thead>
            <tbody>
              {shown.length === 0 ? (
                <tr><td colSpan="4"><div className="empty"><div className="empty-ic">📭</div>Ma'lumot yo'q</div></td></tr>
              ) : (
                shown.map((a, i) => (
                  <tr key={a.id}>
                    <td style={{ color: "var(--t4)", fontFamily: "Fira Code" }}>{i + 1}</td>
                    <td style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--t3)" }}>{a.date}</td>
                    <td style={{ color: "var(--t2)" }}>{a.subject}</td>
                    <td><span className={`badge ${stBadge(a.status)}`}>{stLabel(a.status)}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
