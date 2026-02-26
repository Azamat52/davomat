import { pct, pClass, pColor } from "../../helpers";

export default function RepPage({ att, students }) {
  const classes = [...new Set(students.map((s) => s.cls))].sort();

  return (
    <div>
      <div className="ph"><div className="ph-title">📈 Hisobotlar</div></div>

      <div className="card">
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Sinf</th><th>O'quvchilar</th><th>Jami</th>
                <th>✅</th><th>❌</th><th>⏰</th><th>%</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => {
                const sts = students.filter((s) => s.cls === c && s.status === "active");
                const records = att.filter((a) => sts.find((s) => s.id === a.studentId));
                const present = records.filter((a) => a.status === "present").length;
                const p = pct(present, records.length);
                return (
                  <tr key={c}>
                    <td><strong style={{ fontSize: 14 }}>{c}</strong></td>
                    <td style={{ fontFamily: "Fira Code" }}>{sts.length}</td>
                    <td style={{ fontFamily: "Fira Code" }}>{records.length}</td>
                    <td style={{ color: "var(--a3)", fontFamily: "Fira Code" }}>{present}</td>
                    <td style={{ color: "var(--r1)", fontFamily: "Fira Code" }}>{records.filter((a) => a.status === "absent").length}</td>
                    <td style={{ color: "var(--w1)", fontFamily: "Fira Code" }}>{records.filter((a) => a.status === "late").length}</td>
                    <td style={{ minWidth: 130 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div className="pb" style={{ flex: 1 }}>
                          <div className={`pf ${pClass(p)}`} style={{ width: `${p}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontFamily: "Fira Code", fontWeight: 800, color: pColor(p) }}>{p}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
