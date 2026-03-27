import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { PedigreeLegend } from './PedigreeChart';

// ── Constants ────────────────────────────────────────────────────────────────
const NODE_SIZE = 56;   // px – width / height of each symbol
const H_GAP     = 110;  // px – horizontal gap between sibling nodes (increased to avoid name overlap)
const GEN_GAP   = 240;  // px – vertical distance between gen rows (increased for multiline labels)
const PAD_LEFT  = 100;  // px – left padding
const PAD_V     = 50;   // px – top / bottom padding inside SVG
const LABEL_H   = 110;  // px – height reserved below a node for text labels

// Total visual height of one generation row
const ROW_H = NODE_SIZE + LABEL_H;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PedigreeNodeDef {
  id: string | number;
  name: string;
  gender: 'male' | 'female';
  status: 'affected' | 'unaffected' | 'carrier' | 'unknown';
  relationship: string;
  isProband: boolean;
  displayId: string;
  side_of_family?: string;
}

interface FormalPedigreeChartProps {
  nodes: PedigreeNodeDef[];
  title?: string;
  patientName?: string;
  patientDisplayId?: string;
}

// ── Single Pedigree Node (SVG) ───────────────────────────────────────────────
function PedigreeNode({ member, cx, cy }: { member: PedigreeNodeDef; cx: number; cy: number }) {
  const half      = NODE_SIZE / 2;
  const isMale    = member.gender === 'male';
  const isAffected = member.status === 'affected';
  const isCarrier  = member.status === 'carrier';

  const fill      = isAffected ? '#DC2626' : isMale ? '#60A5FA' : '#F472B6';
  const idFill    = member.isProband ? '#2563EB' : '#111827';
  const statusFill = isAffected ? '#DC2626' : isCarrier ? '#EA580C' : '#16A34A';

  const labelYName = cy + NODE_SIZE + 14;
  const labelY0    = labelYName + 14; // displayId
  const labelY1    = labelY0 + 12;    // proband / relationship
  const labelY2    = labelY1 + 12;    // relationship / status
  const labelY3    = labelY2 + 12;    // status (only if proband)

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
      <text x={cx} y={labelYName} textAnchor="middle" fontSize={11} fontWeight={700} fill="#111827"
        fontFamily="Inter,system-ui,sans-serif">
        {member.name}
      </text>
      <text x={cx} y={labelY0} textAnchor="middle" fontSize={11} fontWeight={400} fill={idFill}
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

export function FormalPedigreeChart({ nodes, title, patientName, patientDisplayId }: FormalPedigreeChartProps) {
  const [zoom, setZoom] = React.useState(1);

  if (!nodes || nodes.length === 0) return null;

  const gen1: PedigreeNodeDef[] = [];
  const gen2: PedigreeNodeDef[] = [];
  const gen3: PedigreeNodeDef[] = [];
  const gen4: PedigreeNodeDef[] = [];

  nodes.forEach(node => {
    const rel = node.relationship;
    if (['Grandfather', 'Grandmother'].includes(rel)) gen1.push(node);
    else if (['Father', 'Mother', 'Uncle', 'Aunt'].includes(rel)) gen2.push(node);
    else if (['Patient', 'Brother', 'Sister', 'Cousin', 'Other Relative'].includes(rel)) gen3.push(node);
    else if (['Son', 'Daughter'].includes(rel)) gen4.push(node);
  });

  const sort = (arr: PedigreeNodeDef[], order: string[]) =>
    [...arr].sort((a, b) => order.indexOf(a.relationship) - order.indexOf(b.relationship));

  // Generation 1: Group by side, then relationship
  const paternalG1 = gen1.filter(n => n.side_of_family === 'Father Side');
  const maternalG1 = gen1.filter(n => n.side_of_family === 'Mother Side');
  const otherG1    = gen1.filter(n => !n.side_of_family || (n.side_of_family !== 'Father Side' && n.side_of_family !== 'Mother Side'));

  const s1 = [
    ...sort(paternalG1, ['Grandfather', 'Grandmother']),
    ...sort(otherG1,    ['Grandfather', 'Grandmother']),
    ...sort(maternalG1, ['Grandfather', 'Grandmother'])
  ];

  // Generation 2: Group by side, then relationship
  const paternalG2 = gen2.filter(n => n.side_of_family === 'Father Side' && n.relationship !== 'Father');
  const maternalG2 = gen2.filter(n => n.side_of_family === 'Mother Side' && n.relationship !== 'Mother');
  const father     = gen2.find(n => n.relationship === 'Father');
  const mother     = gen2.find(n => n.relationship === 'Mother');
  const otherG2    = gen2.filter(n => !n.side_of_family && !['Father', 'Mother'].includes(n.relationship));

  const s2 = [
    ...sort(paternalG2, ['Uncle', 'Aunt']),
    ...(father ? [father] : []),
    ...(mother ? [mother] : []),
    ...sort(maternalG2, ['Uncle', 'Aunt']),
    ...otherG2
  ];

  const s3 = sort(gen3, ['Sister', 'Patient', 'Brother', 'Cousin', 'Other Relative']);
  const s4 = sort(gen4, ['Son', 'Daughter']);

  const active = [s1, s2, s3, s4].filter(g => g.length > 0);
  const roman = ['I', 'II', 'III', 'IV'];
  active.forEach((gen, gi) => gen.forEach((p, i) => { p.displayId = `${roman[gi]}-${i + 1}`; }));

  const hasG1 = s1.length > 0;
  const hasG2 = s2.length > 0;
  const hasG4 = s4.length > 0;

  const rowW = (n: number) => n * NODE_SIZE + Math.max(0, n - 1) * H_GAP;
  const contentW = Math.max(rowW(s1.length), rowW(s2.length), rowW(s3.length), rowW(s4.length), 200);
  const svgW = PAD_LEFT + contentW + 60;

  const centres = (count: number) => {
    const total = rowW(count);
    const startX = PAD_LEFT + (contentW - total) / 2;
    return Array.from({ length: count }, (_, i) => startX + i * (NODE_SIZE + H_GAP) + NODE_SIZE / 2);
  };

  const cx1 = centres(s1.length);
  const cx2 = centres(s2.length);
  const cx3 = centres(s3.length);
  const cx4 = centres(s4.length);

  const genYs: number[] = [];
  let curY = PAD_V;
  const visGens = [hasG1 ? s1 : null, hasG2 ? s2 : null, s3, hasG4 ? s4 : null].filter(Boolean) as PedigreeNodeDef[][];
  visGens.forEach((_, i) => {
    genYs.push(curY);
    if (i < visGens.length - 1) curY += ROW_H + (GEN_GAP - ROW_H);
  });

  let vIdx = 0;
  const yMap: (number | null)[] = [
    hasG1 ? genYs[vIdx++] : null,
    hasG2 ? genYs[vIdx++] : null,
    genYs[vIdx++],
    hasG4 ? genYs[vIdx] : null,
  ];
  const [yc1, yc2, yc3, yc4] = yMap;
  const svgH = genYs[genYs.length - 1]! + ROW_H + PAD_V;

  const midY = (y: number) => y + NODE_SIZE / 2;

  const buildLines = () => {
    const els: React.ReactElement[] = [];
    const S = '#000000', W = 2; // Black, slightly thinner lines for a cleaner look

    // Marriage line between two centers with clipping
    const marLine = (xa: number, xb: number, y: number, key: string) => {
      const x1 = Math.min(xa, xb) + NODE_SIZE / 2;
      const x2 = Math.max(xa, xb) - NODE_SIZE / 2;
      if (x1 < x2) els.push(<line key={key} x1={x1} y1={y} x2={x2} y2={y} stroke={S} strokeWidth={W} />);
    };

    // Calculate halfway point for bars between generations
    const getBarY = (topY: number, botY: number) => (topY + NODE_SIZE + botY) / 2;

    // Generation I to Generation II
    if (hasG1 && yc1 !== null && hasG2 && yc2 !== null) {
      const marY = midY(yc1);
      const barY = getBarY(yc1, yc2);

      const drawPair = (sideFilter: (n: PedigreeNodeDef) => boolean, keyPrefix: string, isPaternal: boolean) => {
        const sideNodes = s1.filter(sideFilter);
        const gf = sideNodes.find(n => n.relationship === 'Grandfather');
        const gm = sideNodes.find(n => n.relationship === 'Grandmother');

        if (gf && gm) {
          const idxF = s1.indexOf(gf);
          const idxM = s1.indexOf(gm);
          const xL = cx1[idxF];
          const xR = cx1[idxM];
          const stemX = (xL + xR) / 2;
          
          marLine(xL, xR, marY, `${keyPrefix}_mar`);
          els.push(<line key={`${keyPrefix}_stem`} x1={stemX} y1={marY} x2={stemX} y2={barY} stroke={S} strokeWidth={W} />);

          const childIndices = s2.map((p, ci) => {
            const rel = p.relationship;
            const side = p.side_of_family;
            if (isPaternal) {
              return (side === 'Father Side' || (['Father', 'Uncle', 'Aunt'].includes(rel) && side !== 'Mother Side')) ? ci : -1;
            } else {
              return (side === 'Mother Side' || (rel === 'Mother' && side !== 'Father Side')) ? ci : -1;
            }
          }).filter(ci => ci !== -1);

          if (childIndices.length > 0) {
            const cX = childIndices.map(ci => cx2[ci]);
            const bL = Math.min(...cX, stemX);
            const bR = Math.max(...cX, stemX);
            els.push(<line key={`${keyPrefix}_bar`} x1={bL} y1={barY} x2={bR} y2={barY} stroke={S} strokeWidth={W} />);
            childIndices.forEach((idx) => {
              els.push(<line key={`${keyPrefix}_drop${idx}`} x1={cx2[idx]} y1={barY} x2={cx2[idx]} y2={yc2!} stroke={S} strokeWidth={W} />);
            });
          }
        }
      };

      drawPair(n => n.side_of_family === 'Father Side', 'paternal', true);
      drawPair(n => n.side_of_family === 'Mother Side', 'maternal', false);
    }

    // Generation II to Generation III
    if (hasG2 && yc2 !== null && yc3 !== null && s3.length > 0) {
      const fIdx = s2.findIndex(p => p.relationship === 'Father');
      const mIdx = s2.findIndex(p => p.relationship === 'Mother');
      
      if (fIdx >= 0 && mIdx >= 0) {
        const xF = cx2[fIdx];
        const xM = cx2[mIdx];
        const marY = midY(yc2);
        const stemX = (xF + xM) / 2;
        const barY = getBarY(yc2, yc3);

        marLine(xF, xM, marY, 'g2mar');

        // Drop stem from marriage to sibship bar
        els.push(<line key="g2stem" x1={stemX} y1={marY} x2={stemX} y2={barY} stroke={S} strokeWidth={W} />);

        // Sibship bar for G3
        const bL = Math.min(...cx3, stemX);
        const bR = Math.max(...cx3, stemX);
        els.push(<line key="g2bar3" x1={bL} y1={barY} x2={bR} y2={barY} stroke={S} strokeWidth={W} />);
        
        // Vertical drops to all nodes in Gen 3
        cx3.forEach((cx, i) =>
          els.push(<line key={`g3drop${i}`} x1={cx} y1={barY} x2={cx} y2={yc3!} stroke={S} strokeWidth={W} />)
        );
      }
    }

    // Generation III to Generation IV (Children of Patient)
    if (yc3 !== null && yc4 !== null && hasG4) {
      const pIdx = s3.findIndex(p => p.relationship === 'Patient');
      if (pIdx >= 0) {
        const xP = cx3[pIdx];
        const barY = getBarY(yc3, yc4);
        
        // Stem down from Patient (Assume single parent for now as per backend simplifiction)
        els.push(<line key="g3stem" x1={xP} y1={yc3 + NODE_SIZE} x2={xP} y2={barY} stroke={S} strokeWidth={W} />);
        
        // Sibship bar for Gen 4
        const bL = Math.min(...cx4, xP);
        const bR = Math.max(...cx4, xP);
        els.push(<line key="g3bar4" x1={bL} y1={barY} x2={bR} y2={barY} stroke={S} strokeWidth={W} />);
        
        // Vertical drops to all nodes in Gen 4
        cx4.forEach((cx, i) =>
          els.push(<line key={`g4drop${i}`} x1={cx} y1={barY} x2={cx} y2={yc4!} stroke={S} strokeWidth={W} />)
        );
      }
    }
    return els;
  };

  const genLabels: { text: string; y: number }[] = [];
  const labelNames = ['Generation I', 'Generation II', 'Generation III', 'Generation IV'];
  let li = 0;
  if (hasG1) genLabels.push({ text: labelNames[li++], y: yc1! });
  if (hasG2) genLabels.push({ text: labelNames[li++], y: yc2! });
  genLabels.push({ text: labelNames[li++], y: yc3! });
  if (hasG4) genLabels.push({ text: labelNames[li], y: yc4! });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Patient header */}
      {(patientName || patientDisplayId) && (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 mb-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-lg">{patientName ? patientName[0] : 'P'}</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Patient</p>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">{patientName || '—'}</h2>
              {patientDisplayId && (
                <p className="text-sm text-gray-500 font-mono tracking-wide">
                  ID:&nbsp;<span className="font-semibold text-gray-700">{patientDisplayId}</span>
                </p>
              )}
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
      )}

      {/* Chart canvas */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md mb-6 overflow-auto">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.15s ease' }}>
          <svg width={svgW} height={svgH} style={{ display: 'block' }}>
            {genLabels.map(({ text, y }) => (
              <text key={text} x={8} y={y + NODE_SIZE / 2 + 4}
                fontSize={10} fontWeight={700} fill="#9CA3AF"
                fontFamily="Inter,system-ui,sans-serif"
                style={{ textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {text}
              </text>
            ))}
            {buildLines()}
            {hasG1 && s1.map((m, i) => (
              <PedigreeNode key={m.id} member={m} cx={cx1[i]} cy={yc1!} />
            ))}
            {hasG2 && s2.map((m, i) => (
              <PedigreeNode key={m.id} member={m} cx={cx2[i]} cy={yc2!} />
            ))}
            {s3.map((m, i) => (
              <PedigreeNode key={m.id} member={m} cx={cx3[i]} cy={yc3!} />
            ))}
            {hasG4 && s4.map((m, i) => (
              <PedigreeNode key={m.id} member={m} cx={cx4[i]} cy={yc4!} />
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-8">
        <PedigreeLegend />
      </div>
    </div>
  );
}
