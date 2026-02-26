import { pct, ini, stBadge, stLabel, pClass, pColor } from "../../helpers";

export default function SDash({ user, att }) {
  const myAtt  = att.filter((a) => a.studentId === user.id);
  const present = myAtt.filter((a) => a.status === "present").length;
  const absent  = myAtt.filter((a) => a.status === "absent").length;
  const late    = myAtt.filter((a) => a.status === "late").length;
  const p       = pct(present, myAtt.length);
  const recent  = myAtt.slice(-6).reverse();

  return (
    <div>
      {/* Student profile header */}
      <div className="std-head">
        <div className="std-av">{ini(user.name)}</div>
        <div className="std-info">
          <h2>{user.name}</h2>
          <p>👨‍🎓 {user.cls} sinfi &nbsp;·&nbsp; 🔑 {user.username}</p>
          <div className="std-stats">
            <div className="ss"><div className="ss-v" style={{ color: "var(--a3)" }}>{present}</div><div className="ss-l">Keldi</div></div>
            <div className="ss"><div className="ss-v" style={{ color: "var(--r1)" }}>{absent}</div><div className="ss-l">Kelmadi</div></div>
            <div className="ss"><div className="ss-v" style={{ color: "var(--w1)" }}>{late}</div><div className="ss-l">Kech</div></div>
            <div className="ss"><div className="ss-v" style={{ color: pColor(p) }}>{p}%</div><div className="ss-l">Davomat</div></div>
          </div>
        </div>
      </div>

      <div className="g2">
        {/* Overall attendance */}
        <div className="card">
          <div className="ch"><div className="ct">📊 Umumiy davomat</div></div>
          <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--t3)" }}>{myAtt.length} darsdan {present} ta</span>
            <span style={{ fontWeight: 800, color: pColor(p) }}>{p}%</span>
          </div>
          <div className="pb" style={{ height: 9, borderRadius: 5 }}>
            <div className={`pf ${pClass(p)}`} style={{ width: `${p}%` }} />
          </div>
          {p < 75 && (
            <div style={{ marginTop: 10, padding: "9px 13px", background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.18)", borderRadius: 8, fontSize: 12, color: "var(--r1)" }}>
              ⚠️ Davomatingiz 75% dan past! Ko'proq darsga keling.
            </div>
          )}
        </div>

        {/* Recent lessons */}
        <div className="card">
          <div className="ch"><div className="ct">🕐 So'nggi darslar</div></div>
          {recent.length === 0 ? (
            <div className="empty"><div className="empty-ic">📋</div>Hali davomat yo'q</div>
          ) : (
            <div className="tw">
              <table>
                <thead><tr><th>Sana</th><th>Fan</th><th>Holat</th></tr></thead>
                <tbody>
                  {recent.map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontFamily: "Fira Code", fontSize: 11.5, color: "var(--t3)" }}>{a.date}</td>
                      <td style={{ color: "var(--t2)" }}>{a.subject}</td>
                      <td><span className={`badge ${stBadge(a.status)}`}>{stLabel(a.status)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
