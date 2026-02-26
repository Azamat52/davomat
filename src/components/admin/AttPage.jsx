import { useState } from "react";
import { TODAY, CLASSES } from "../../constants";
import { stBadge, stLabel } from "../../helpers";

export default function AttPage({ att, students }) {
  const [fC, setFC] = useState("all");
  const [fD, setFD] = useState(TODAY);
  const [fS, setFS] = useState("all");

  const shown = att.filter((a) => {
    const s = students.find((s) => s.id === a.studentId);
    return (
      s &&
      (fC === "all" || s.cls === fC) &&
      (fD === "" || a.date === fD) &&
      (fS === "all" || a.status === fS)
    );
  });

  return (
    <div>
      <div className="ph">
        <div className="ph-title">📋 Davomat jurnali</div>
        <div className="ph-sub">{shown.length} yozuv</div>
      </div>

      <div className="card">
        {/* Filters */}
        <div className="frow">
          <select className="fs" value={fC} onChange={(e) => setFC(e.target.value)}>
            <option value="all">Barcha sinflar</option>
            {CLASSES.filter((c) => students.find((s) => s.cls === c)).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            type="date"
            className="fs"
            value={fD}
            onChange={(e) => setFD(e.target.value)}
          />
          <select className="fs" value={fS} onChange={(e) => setFS(e.target.value)}>
            <option value="all">Barcha holat</option>
            <option value="present">Keldi</option>
            <option value="absent">Kelmadi</option>
            <option value="late">Kech</option>
          </select>
        </div>

        {/* Table */}
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>#</th><th>O'quvchi</th><th>Sinf</th>
                <th>Sana</th><th>Fan</th><th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="empty"><div className="empty-ic">📭</div>Topilmadi</div>
                  </td>
                </tr>
              ) : (
                shown.map((a, i) => {
                  const s = students.find((s) => s.id === a.studentId);
                  return (
                    <tr key={a.id}>
                      <td style={{ color: "var(--t4)", fontFamily: "Fira Code" }}>{i + 1}</td>
                      <td><strong>{s?.name}</strong></td>
                      <td><span className="badge b-b">{s?.cls}</span></td>
                      <td style={{ fontFamily: "Fira Code", fontSize: 11.5, color: "var(--t3)" }}>{a.date}</td>
                      <td style={{ color: "var(--t3)" }}>{a.subject}</td>
                      <td><span className={`badge ${stBadge(a.status)}`}>{stLabel(a.status)}</span></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
