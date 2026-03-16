import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ZoomIn, ZoomOut, User, GitBranch } from 'lucide-react';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';
import { PedigreeLegend } from '../components/PedigreeChart';

// ── Constants ────────────────────────────────────────────────────────────────
const NODE_SIZE = 56;   // px – width / height of each symbol
const H_GAP     = 80;   // px – horizontal gap between sibling nodes
const GEN_GAP   = 140;  // px – vertical distance between gen rows (centres)
const PAD_LEFT  = 90;   // px – left padding (leaves room for gen labels)
const PAD_V     = 50;   // px – top / bottom padding inside SVG
const LABEL_H   = 70;   // px – height reserved below a node for text labels

// Total visual height of one generation row
const ROW_H = NODE_SIZE + LABEL_H;

// ── Type ─────────────────────────────────────────────────────────────────────
interface NodeDef {
  id: string | number;
  name: string;
  gender: 'male' | 'female';
  status: 'affected' | 'unaffected' | 'carrier' | 'unknown';
  relationship: string;
  isProband: boolean;
  displayId: string;
}

// ── Resolve Patient ID from whichever field the backend uses ─────────────────
function resolvePatientId(info: any): string {
  if (!info) return '---';
  const raw = info.patient_id ?? info.patientId ?? info.pt_id ?? info.idno ?? '';
  if (!raw) {
    const num = info.id ?? info.user_id ?? '';
    return num ? `PT${String(num).padStart(4, '0')}` : '---';
  }
  return String(raw).replace(/^#/, '').toUpperCase();
}

// ── Single Pedigree Node (SVG) ───────────────────────────────────────────────
function PedigreeNode({ member, cx, cy }: { member: NodeDef; cx: number; cy: number }) {
  const half      = NODE_SIZE / 2;
  const isMale    = member.gender === 'male';
  const isAffected = member.status === 'affected';
  const isCarrier  = member.status === 'carrier';

  const fill      = isAffected ? '#DC2626' : isMale ? '#60A5FA' : '#F472B6';
  const idFill    = member.isProband ? '#2563EB' : '#111827';
  const statusFill = isAffected ? '#DC2626' : isCarrier ? '#EA580C' : '#16A34A';

  const labelY0 = cy + NODE_SIZE + 14; // displayId
  const labelY1 = labelY0 + 12;        // proband / relationship
  const labelY2 = labelY1 + 12;        // relationship / status
  const labelY3 = labelY2 + 12;        // status (only if proband)

  return (
    <g>
      {/* Proband arrow */}
      {member.isProband && (
        <>
          <line x1={cx - half - 36} y1={cy + half} x2={cx - half - 6} y2={cy + half}
            stroke="#2563EB" strokeWidth={2} />
          <polygon
            points={`${cx - half - 6},${cy + half - 5} ${cx - half},${cy + half} ${cx - half - 6},${cy + half + 5}`}
            fill="#2563EB" />
        </>
      )}

      {/* Symbol */}
      {isMale
        ? <rect x={cx - half} y={cy} width={NODE_SIZE} height={NODE_SIZE}
            fill={fill} stroke="#111827" strokeWidth={3} />
        : <circle cx={cx} cy={cy + half} r={half}
            fill={fill} stroke="#111827" strokeWidth={3} />
      }

      {/* Carrier dot */}
      {isCarrier && <circle cx={cx} cy={cy + half} r={7} fill="#111827" />}

      {/* Labels */}
      <text x={cx} y={labelY0} textAnchor="middle" fontSize={11} fontWeight={700} fill={idFill}
        fontFamily="Inter,system-ui,sans-serif">
        {member.displayId}
      </text>
      {member.isProband && (
        <text x={cx} y={labelY1} textAnchor="middle" fontSize={10} fontWeight={700} fill="#2563EB"
          fontFamily="Inter,system-ui,sans-serif">
          Proband
        </text>
      )}
      <text x={cx} y={member.isProband ? labelY2 : labelY1} textAnchor="middle" fontSize={10}
        fill="#4B5563" fontFamily="Inter,system-ui,sans-serif">
        {member.relationship}
      </text>
      <text x={cx} y={member.isProband ? labelY3 : labelY2} textAnchor="middle" fontSize={9}
        fontWeight={700} fill={statusFill} fontFamily="Inter,system-ui,sans-serif"
        style={{ textTransform: 'capitalize' }}>
        {member.status}
      </text>
    </g>
  );
}

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function VisualPedigreeAnalysisScreen() {
  const navigate    = useNavigate();
  const { patientId } = useParams();

  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [zoom, setZoom]               = useState(1);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [gen1, setGen1]               = useState<NodeDef[]>([]);
  const [gen2, setGen2]               = useState<NodeDef[]>([]);
  const [gen3, setGen3]               = useState<NodeDef[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !patientId) return;

        const res  = await fetch(`${API_BASE_URL}/api/doctor/patient/${patientId}/pedigree/`, {
          headers: { Authorization: `Token ${token}` }
        });
        const data = await res.json();

        // Debug – lets us see the real field names in the browser console
        console.log('[Pedigree] patient object:', data.patient);

        if (data.status && data.pedigree) {
          setPatientInfo(data.patient);

          const g1: NodeDef[] = [], g2: NodeDef[] = [], g3: NodeDef[] = [];

          (data.pedigree.nodes as any[]).forEach(n => {
            const rawStatus = (n.health_status ?? '').toLowerCase();
            const node: NodeDef = {
              id:           n.node_id ?? n.id,
              name:         n.full_name ?? '',
              gender:       (n.gender ?? '').toLowerCase() === 'female' ? 'female' : 'male',
              status:       (['affected', 'carrier', 'unaffected'].includes(rawStatus)
                            ? rawStatus : 'unaffected') as NodeDef['status'],
              relationship: n.relationship ?? '',
              isProband:    !!(n.is_proband || n.relationship === 'Patient'),
              displayId:    '',
            };

            if (['Grandfather', 'Grandmother'].includes(n.relationship))               g1.push(node);
            else if (['Father', 'Mother', 'Uncle', 'Aunt'].includes(n.relationship))   g2.push(node);
            else if (['Patient', 'Brother', 'Sister', 'Son', 'Daughter'].includes(n.relationship)) g3.push(node);
          });

          const sort = (arr: NodeDef[], order: string[]) =>
            [...arr].sort((a, b) => order.indexOf(a.relationship) - order.indexOf(b.relationship));

          const s1 = sort(g1, ['Grandfather', 'Grandmother']);
          const s2 = sort(g2, ['Uncle', 'Father', 'Mother', 'Aunt']);
          const s3 = sort(g3, ['Sister', 'Patient', 'Brother', 'Son', 'Daughter']);

          // Number display IDs based on which gens are actually populated
          const active = [s1, s2, s3].filter(g => g.length > 0);
          const roman  = ['I', 'II', 'III'];
          active.forEach((gen, gi) => gen.forEach((p, i) => { p.displayId = `${roman[gi]}-${i + 1}`; }));

          setGen1(s1); setGen2(s2); setGen3(s3);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error('[Pedigree] fetch error:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [patientId]);

  // ── Early returns ────────────────────────────────────────────────────────
  if (loading) return (
    <DesktopLayout title="Pedigree Analysis" defaultUserRole="doctor">
      <div className="flex items-center justify-center min-h-[50vh] text-gray-400 text-lg">
        Loading pedigree analysis…
      </div>
    </DesktopLayout>
  );

  if (error || !gen3.length) return (
    <DesktopLayout title="Pedigree Analysis" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
        <GitBranch size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-6">Pedigree data not available for this patient</p>
        <button onClick={() => navigate('/visual-analysis')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          ← Back to Patient List
        </button>
      </div>
    </DesktopLayout>
  );

  // ── Layout computation ───────────────────────────────────────────────────
  const hasG1 = gen1.length > 0;
  const hasG2 = gen2.length > 0;

  // Width of a row of n nodes
  const rowW = (n: number) => n * NODE_SIZE + Math.max(0, n - 1) * H_GAP;

  // Maximum width across all three gens (determines SVG width)
  const contentW = Math.max(rowW(gen1.length), rowW(gen2.length), rowW(gen3.length), 200);
  const svgW     = PAD_LEFT + contentW + 60;

  // Centre-X of each node in a row (absolute, including PAD_LEFT)
  const centres = (count: number) => {
    const total  = rowW(count);
    const startX = PAD_LEFT + (contentW - total) / 2;
    return Array.from({ length: count }, (_, i) => startX + i * (NODE_SIZE + H_GAP) + NODE_SIZE / 2);
  };

  const cx1 = centres(gen1.length);
  const cx2 = centres(gen2.length);
  const cx3 = centres(gen3.length);

  // Y-top of each visible generation
  const genYs: number[] = [];
  let curY = PAD_V;
  const visGens = [hasG1 ? gen1 : null, hasG2 ? gen2 : null, gen3].filter(Boolean);
  visGens.forEach((_, i) => {
    genYs.push(curY);
    if (i < visGens.length - 1) curY += ROW_H + (GEN_GAP - ROW_H);
  });

  // Map gen index (0,1,2) → yTop; null if that gen is absent
  let vIdx = 0;
  const yMap: (number | null)[] = [
    hasG1 ? genYs[vIdx++] : null,
    hasG2 ? genYs[vIdx++] : null,
    genYs[vIdx],
  ];
  const [yc1, yc2, yc3] = yMap;

  const svgH = genYs[genYs.length - 1]! + ROW_H + PAD_V;

  // Mid-Y of a node's symbol centre
  const midY = (y: number) => y + NODE_SIZE / 2;

  // ── Connection SVG elements ──────────────────────────────────────────────
  const buildLines = () => {
    const els: React.ReactElement[] = [];
    const S = '#1F2937', W = 2.5;

    // Helper: clamp between two xs
    const marLine = (xa: number, xb: number, y: number, key: string) => {
      const x1 = Math.min(xa, xb) + NODE_SIZE / 2;
      const x2 = Math.max(xa, xb) - NODE_SIZE / 2;
      if (x1 < x2) els.push(<line key={key} x1={x1} y1={y} x2={x2} y2={y} stroke={S} strokeWidth={W} />);
    };

    // ── Gen 1 couple → Gen 2 ──
    if (hasG1 && yc1 !== null && hasG2 && yc2 !== null && gen1.length >= 2) {
      const marY  = midY(yc1);
      const x1L   = cx1[0] + NODE_SIZE / 2;
      const x1R   = cx1[cx1.length - 1] - NODE_SIZE / 2;
      const stemX = (x1L + x1R) / 2;
      // marriage line Gen 1
      els.push(<line key="g1mar" x1={x1L} y1={marY} x2={x1R} y2={marY} stroke={S} strokeWidth={W} />);
      // vertical stem to Gen 2 horizontal bar
      const barY = yc2 - 24;
      els.push(<line key="g1stem" x1={stemX} y1={marY} x2={stemX} y2={barY} stroke={S} strokeWidth={W} />);
      // horizontal bar at Gen 2 level
      const bL = Math.min(...cx2), bR = Math.max(...cx2);
      els.push(<line key="g1bar" x1={bL} y1={barY} x2={bR} y2={barY} stroke={S} strokeWidth={W} />);
      cx2.forEach((cx, i) =>
        els.push(<line key={`g1drop${i}`} x1={cx} y1={barY} x2={cx} y2={yc2!} stroke={S} strokeWidth={W} />)
      );
    }

    // ── Gen 2 couple → Gen 3 ──
    if (hasG2 && yc2 !== null && yc3 !== null && gen3.length > 0) {
      const fIdx  = gen2.findIndex(p => p.relationship === 'Father');
      const mIdx  = gen2.findIndex(p => p.relationship === 'Mother');
      const xF    = fIdx >= 0 ? cx2[fIdx] : cx2[0];
      const xM    = mIdx >= 0 ? cx2[mIdx] : cx2[cx2.length - 1];
      const marY  = midY(yc2);
      const stemX = (xF + xM) / 2;

      // marriage line between Father & Mother
      marLine(xF, xM, marY, 'g2mar');
      // stem down
      const barY = yc3 - 24;
      els.push(<line key="g2stem" x1={stemX} y1={marY} x2={stemX} y2={barY} stroke={S} strokeWidth={W} />);

      if (gen3.length === 1) {
        // single child – just a drop from stem to child
        els.push(<line key="g3drop0" x1={cx3[0]} y1={barY} x2={cx3[0]} y2={yc3} stroke={S} strokeWidth={W} />);
      } else {
        // horizontal bar across all children
        const bL = Math.min(...cx3, stemX);
        const bR = Math.max(...cx3, stemX);
        els.push(<line key="g2bar3" x1={bL} y1={barY} x2={bR} y2={barY} stroke={S} strokeWidth={W} />);
        cx3.forEach((cx, i) =>
          els.push(<line key={`g3drop${i}`} x1={cx} y1={barY} x2={cx} y2={yc3!} stroke={S} strokeWidth={W} />)
        );
      }
    }

    return els;
  };

  // Gen labels and their y position
  const genLabels: { text: string; y: number }[] = [];
  const labelNames = ['Generation I', 'Generation II', 'Generation III'];
  let li = 0;
  if (hasG1) genLabels.push({ text: labelNames[li++], y: yc1! });
  if (hasG2) genLabels.push({ text: labelNames[li++], y: yc2! });
  genLabels.push({ text: labelNames[li], y: yc3! });

  return (
    <DesktopLayout title="Pedigree Analysis" defaultUserRole="doctor">
      <div className="max-w-6xl mx-auto">

        {/* Patient header */}
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 mb-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={20} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Patient</p>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">{patientInfo?.full_name || '—'}</h2>
              <p className="text-sm text-gray-500 font-mono tracking-wide">
                ID:&nbsp;<span className="font-semibold text-gray-700">{resolvePatientId(patientInfo)}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(z => Math.max(0.4, +(z - 0.1).toFixed(1)))}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ZoomOut size={18} className="text-gray-600" />
            </button>
            <span className="w-14 text-center text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg py-1.5 bg-gray-50">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(1)))}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ZoomIn size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chart canvas */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md mb-6 overflow-auto">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.15s ease' }}>
            <svg width={svgW} height={svgH} style={{ display: 'block' }}>

              {/* Generation labels */}
              {genLabels.map(({ text, y }) => (
                <text key={text} x={8} y={y + NODE_SIZE / 2 + 4}
                  fontSize={10} fontWeight={700} fill="#9CA3AF"
                  fontFamily="Inter,system-ui,sans-serif"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {text}
                </text>
              ))}

              {/* Connecting lines */}
              {buildLines()}

              {/* Gen 1 nodes */}
              {hasG1 && gen1.map((m, i) => (
                <PedigreeNode key={m.id} member={m} cx={cx1[i]} cy={yc1!} />
              ))}

              {/* Gen 2 nodes */}
              {hasG2 && gen2.map((m, i) => (
                <PedigreeNode key={m.id} member={m} cx={cx2[i]} cy={yc2!} />
              ))}

              {/* Gen 3 nodes */}
              {gen3.map((m, i) => (
                <PedigreeNode key={m.id} member={m} cx={cx3[i]} cy={yc3!} />
              ))}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-8">
          <PedigreeLegend />
        </div>
      </div>
    </DesktopLayout>
  );
}
