import { TODAY } from "../../constants";
import { stBadge, stLabel } from "../../helpers";

export default function TDash({ user, att, students }) {
  const classStudents = students.filter((s) => s.cls === user.cls && s.status === "active");
  const todayAtt     = att.filter((a) => a.teacherId === user.id && a.date === TODAY);
  const present      = todayAtt.filter((a) => a.status === "present").length;

  return (
    <div>
      <div className="wcard" data-emoji="📚">
        <div className="wcard-t">Salom, {user.name}! 👋</div>
        <div className="wcard-s">{user.subject} • {user.cls} sinfi</div>
      </div>

      <div className="sgrid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="sc">
          <div className="sc-ic">👥</div>
          <div className="sc-v" style={{ color: "var(--a1)" }}>{classStudents.length}</div>
          <div className="sc-l">O'quvchilar</div>
        </div>
        <div className="sc">
          <div className="sc-ic">✅</div>
          <div className="sc-v" style={{ color: "var(--a3)" }}>{present}</div>
          <div className="sc-l">Bugun keldi</div>
        </div>
        <div className="sc">
          <div className="sc-ic">❌</div>
          <div className="sc-v" style={{ color: "var(--r1)" }}>{todayAtt.length - present}</div>
          <div className="sc-l">Kelmadi/Kech</div>
        </div>
      </div>

      <div className="card">
        <div className="ch"><div className="ct">📋 Bugungi davomat</div></div>
        {todayAtt.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">📋</div>
            <strong>Bugun davomat olinmagan</strong>
            <div style={{ fontSize: 12, color: "var(--t4)", marginTop: 6 }}>"Davomat olish" bo'limiga o'ting</div>
          </div>
        ) : (
          <div className="tw">
            <table>
              <thead><tr><th>O'quvchi</th><th>Fan</th><th>Holat</th></tr></thead>
              <tbody>
                {todayAtt.map((a) => {
                  const s = students.find((s) => s.id === a.studentId);
                  return (
                    <tr key={a.id}>
                      <td><strong>{s?.name}</strong></td>
                      <td style={{ color: "var(--t3)" }}>{a.subject}</td>
                      <td><span className={`badge ${stBadge(a.status)}`}>{stLabel(a.status)}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
