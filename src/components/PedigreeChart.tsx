import React from 'react';

interface Person {
  id: string;
  name: string;
  gender: 'male' | 'female';
  status: 'affected' | 'unaffected' | 'carrier';
  isProband?: boolean;
}

interface Couple {
  partner1: string;
  partner2: string;
  children: string[];
}

interface Generation {
  people: Person[];
  couples: Couple[];
}

interface PedigreeChartProps {
  generations?: Generation[];
  compact?: boolean;
}

export function PedigreeChart({ generations = [], compact = false }: PedigreeChartProps) {
  const symbolSize = compact ? 'w-10 h-10' : 'w-14 h-14';
  const labelSize = compact ? 'text-[9px]' : 'text-xs';
  const spacing = compact ? 'gap-8' : 'gap-12';

  const renderSymbol = (person: Person) => {
    const baseClasses = `${symbolSize} border-3 border-gray-900 relative z-10 shadow-md transition-transform hover:scale-110`;
    const isMale = person.gender === 'male';
    const shapeClass = isMale ? '' : 'rounded-full';

    let fillColor = '';
    if (person.status === 'affected') {
      fillColor = 'bg-red-600';
    } else if (person.status === 'carrier') {
      fillColor = isMale ? 'bg-blue-400' : 'bg-pink-400';
    } else {
      fillColor = isMale ? 'bg-blue-400' : 'bg-pink-400';
    }

    return (
      <div className="text-center group">
        <div className="relative inline-block">
          {person.isProband && (
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-20">
              <div className="flex items-center gap-1">
                <div className="w-5 h-0.5 bg-blue-600"></div>
                <div className="text-blue-600 text-xl font-bold">→</div>
              </div>
            </div>
          )}
          <div className={`${baseClasses} ${shapeClass} ${fillColor} flex items-center justify-center`}>
            {person.status === 'carrier' && (
              <div className="w-3 h-3 rounded-full bg-gray-900"></div>
            )}
          </div>
        </div>
        <div className={`${labelSize} font-semibold mt-1 text-gray-900`}>{person.name}</div>
        <div className={`${labelSize} ${person.status === 'affected' ? 'text-red-600' :
          person.status === 'carrier' ? 'text-orange-600' :
            'text-green-600'
          }`}>
          {person.status === 'affected' ? 'Affected' :
            person.status === 'carrier' ? 'Carrier' :
              'Unaffected'}
        </div>
        {person.isProband && (
          <div className={`${labelSize} font-bold text-blue-600`}>Proband</div>
        )}
      </div>
    );
  };

  const renderGeneration = (generation: Generation, genIndex: number) => {
    const { people = [], couples = [] } = generation || {};

    return (
      <div key={genIndex} className="relative mb-16">
        {/* Generation Label */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
          Gen {genIndex + 1}
        </div>

        {/* People in this generation */}
        <div className={`flex items-start ${spacing} justify-center flex-wrap relative z-10`} id={`gen-${genIndex}`}>
          {people.map((person) => (
            <div key={person.id} id={`node-${person.id}`} className="relative">
              {renderSymbol(person)}
            </div>
          ))}
        </div>

        {/* Connection lines for couples */}
        {couples.length > 0 && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 5, overflow: 'visible' }}>
            {couples.map((couple, idx) => {
              const p1Index = people.findIndex(p => p.id === couple.partner1);
              const p2Index = people.findIndex(p => p.id === couple.partner2);

              if (p1Index === -1 || p2Index === -1) return null;

              // Calculate positions based on array index to render relative percentages
              // This aligns the lines properly with the flexbox layout
              const totalItems = people.length;
              if (totalItems <= 1) return null;

              const calcX = (index: number) => {
                const percentagePerItem = 100 / totalItems;
                return (index * percentagePerItem) + (percentagePerItem / 2);
              };

              // Fine-tuning the X percentages slightly inward so lines don't pierce the squares/circles
              const rawX1 = calcX(p1Index);
              const rawX2 = calcX(p2Index);
              const leftX = Math.min(rawX1, rawX2);
              const rightX = Math.max(rawX1, rawX2);

              const x1 = leftX + (compact ? 2 : 1.5);
              const x2 = rightX - (compact ? 2 : 1.5);
              const y = 25; // y % down from top of row (roughly center of the node)

              return (
                <g key={`couple-${idx}`}>
                  {/* Horizontal marriage line */}
                  <line
                    x1={`${x1}%`}
                    y1={`${y}%`}
                    x2={`${x2}%`}
                    y2={`${y}%`}
                    stroke="#1F2937"
                    strokeWidth="2.5"
                  />
                  {/* Vertical line down to children if they exist */}
                  {couple.children.length > 0 && (
                    <>
                      {/* Stem down */}
                      <line
                        x1={`${(x1 + x2) / 2}%`}
                        y1={`${y}%`}
                        x2={`${(x1 + x2) / 2}%`}
                        // Plunges down far enough to meet the new barY
                        y2={`${y + 80}%`}
                        stroke="#1F2937"
                        strokeWidth="2.5"
                      />

                      {/* Check if there's a next generation to map children into */}
                      {generations[genIndex + 1] && (
                        <g>
                          {/* Find positions of children in the next generation */}
                          {(() => {
                            const nextGen = generations[genIndex + 1].people;
                            const nextTotal = nextGen.length;
                            if (nextTotal === 0) return null;

                            const calcNextX = (index: number) => {
                              const pct = 100 / nextTotal;
                              return (index * pct) + (pct / 2);
                            };

                            const childIndices = couple.children
                              .map(cid => nextGen.findIndex(p => p.id === cid))
                              .filter(idx => idx !== -1);

                            if (childIndices.length === 0) return null;

                            const childXs = childIndices.map(calcNextX);
                            const minChildX = Math.min(...childXs);
                            const maxChildX = Math.max(...childXs);
                            const midParentX = (x1 + x2) / 2;

                            // The horizontal bar connecting all children
                            // It spans from the leftmost child to the rightmost child, 
                            // OR to the parent drop-down point if it's outside that range
                            const barStartX = Math.min(minChildX, midParentX);
                            const barEndX = Math.max(maxChildX, midParentX);
                            // Adjusted to push the line further down to touch the Gen 2 top
                            const barY = y + 80; // Meets the stem down

                            return (
                              <>
                                <line
                                  x1={`${barStartX}%`}
                                  y1={`${barY}%`}
                                  x2={`${barEndX}%`}
                                  y2={`${barY}%`}
                                  stroke="#1F2937"
                                  strokeWidth="2.5"
                                />

                                {/* Drops down to each child */}
                                {childXs.map((cx, cIdx) => (
                                  <line
                                    key={`child-drop-${cIdx}`}
                                    x1={`${cx}%`}
                                    y1={`${barY}%`}
                                    x2={`${cx}%`}
                                    // Adjusted multiplier to fully bridge the gap between Generation 1 & Generation 2
                                    y2={`${barY + 65}%`}
                                    stroke="#1F2937"
                                    strokeWidth="2.5"
                                  />
                                ))}
                              </>
                            );
                          })()}
                        </g>
                      )}
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center py-8">
        {generations && generations.length > 0 ? (
          generations.map((gen, idx) => renderGeneration(gen, idx))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No pedigree data available</p>
            <p className="text-sm">Add family members to start building your pedigree chart</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Legend Component
export function PedigreeLegend({ compact = false }: { compact?: boolean }) {
  const itemSize = compact ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = compact ? 'text-[10px]' : 'text-xs';

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className={`font-semibold text-gray-900 mb-3 ${compact ? 'text-xs' : 'text-sm'}`}>
        Pedigree Chart Symbols
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <div className={`${itemSize} border-3 border-gray-900 bg-blue-400 shadow-sm`}></div>
          <span className={`${textSize} font-medium`}>Male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${itemSize} rounded-full border-3 border-gray-900 bg-pink-400 shadow-sm`}></div>
          <span className={`${textSize} font-medium`}>Female</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${itemSize} border-3 border-gray-900 bg-red-600 shadow-sm`}></div>
          <span className={`${textSize} font-medium`}>Affected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${itemSize} border-3 border-gray-900 bg-blue-400 flex items-center justify-center shadow-sm`}>
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
          </div>
          <span className={`${textSize} font-medium`}>Carrier</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gray-900"></div>
          <span className={`${textSize} font-medium`}>Partnership</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-base font-bold">→</span>
          <span className={`${textSize} font-medium`}>Proband</span>
        </div>
      </div>
    </div>
  );
}
