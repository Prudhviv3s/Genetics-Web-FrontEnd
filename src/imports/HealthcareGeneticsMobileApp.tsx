import svgPaths from "./svg-4wmf4c7etf";

function Award() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Award">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Award">
          <path d={svgPaths.p2cc18b60} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p4bda500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="h2">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">Analysis Complete</p>
    </div>
  );
}

function P() {
  return (
    <div className="h-[20px] opacity-90 relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.2px] whitespace-nowrap">Inheritance pattern identified</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[51.987px] relative shrink-0 w-[207.163px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <H1 />
        <P />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[51.987px] items-center relative shrink-0 w-full" data-name="Container">
      <Award />
      <Container3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-gradient-to-r from-[#155dfc] h-[115.988px] relative rounded-[14px] shrink-0 to-[#1447e6] w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[24px] px-[24px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[134.2px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.4px] whitespace-nowrap">Primary Pattern</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="bg-[#dcfce7] h-[28px] relative rounded-[26843500px] shrink-0 w-[130.163px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#008236] text-[14px] top-[3.8px] whitespace-nowrap">High Confidence</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <H2 />
          <Span />
        </div>
      </div>
    </div>
  );
}

function H3() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="h4">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px not-italic relative text-[#155dfc] text-[24px]">Autosomal Dominant</p>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#155dfc] h-[12px] shrink-0 w-full" data-name="Container" />;
}

function Container8() {
  return (
    <div className="bg-[#e5e7eb] flex-[1_0_0] h-[12px] min-h-px min-w-px relative rounded-[26843500px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[66.988px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[36.325px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.4px] whitespace-nowrap">78%</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center relative size-full">
          <Container8 />
          <Span1 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[67.988px] items-start relative shrink-0 w-full" data-name="Container">
      <H3 />
      <Container7 />
    </div>
  );
}

function P1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-0.2px] w-[293px]">Strong evidence supports autosomal dominant inheritance with 4 out of 5 classical criteria met.</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#eff6ff] h-[73.6px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-[0.8px] pt-[16.8px] px-[16.8px] relative size-full">
        <P1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[252.788px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#7bf1a8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[1.6px] pt-[25.6px] px-[25.6px] relative size-full">
        <Container5 />
        <Container6 />
        <Container10 />
      </div>
    </div>
  );
}

function H4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">Alternative Patterns</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[151.413px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">Autosomal Recessive</p>
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.563px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-0.2px] whitespace-nowrap">42%</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Span2 />
      <Span3 />
    </div>
  );
}

function Container15() {
  return <div className="bg-[#f0b100] h-[8px] rounded-[26843500px] shrink-0 w-full" data-name="Container" />;
}

function Container14() {
  return (
    <div className="bg-[#e5e7eb] h-[8px] relative rounded-[26843500px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[212.512px] relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[73.6px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[0.8px] pt-[16.8px] px-[16.8px] relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[63.938px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.2px] whitespace-nowrap">X-Linked</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.563px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-0.2px] whitespace-nowrap">15%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Span4 />
      <Span5 />
    </div>
  );
}

function Container19() {
  return <div className="bg-[#ad46ff] h-[8px] rounded-[26843500px] shrink-0 w-full" data-name="Container" />;
}

function Container18() {
  return (
    <div className="bg-[#e5e7eb] h-[8px] relative rounded-[26843500px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[311.45px] relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[73.6px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[0.8px] pt-[16.8px] px-[16.8px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[195.2px] items-start relative shrink-0 w-full" data-name="Container">
      <H4 />
      <Container12 />
      <Container16 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[815.975px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[84px] px-[24px] relative size-full">
        <Container1 />
        <Container4 />
        <Container11 />
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f9fafb] h-[815.975px] relative shrink-0 w-full" data-name="div">
      <div className="content-stretch flex flex-col items-start px-[352px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[681.6px] items-start left-0 top-0 w-[1152px]" data-name="Body">
      <Div />
    </div>
  );
}

function TrendingUp() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="TrendingUp">
      <div className="absolute inset-[29.17%_8.33%_45.83%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p26fac1f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 10">
            <path d={svgPaths.p1f5e580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[103.02px] size-[20px] top-[14px]" data-name="span">
      <TrendingUp />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#155dfc] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <Span6 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[214.52px] not-italic text-[16px] text-center text-white top-[9.8px] whitespace-nowrap">View Confidence Score</p>
    </div>
  );
}

function FileText() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 18.3333">
            <path d={svgPaths.p2b8e5100} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p3b6dc480} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 1.66667">
            <path d="M7.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 1.66667">
            <path d="M7.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[126.13px] size-[20px] top-[15.6px]" data-name="span">
      <FileText />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[51.2px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-[#155dfc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Span7 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[214.63px] not-italic text-[#155dfc] text-[16px] text-center top-[11.4px] whitespace-nowrap">Generate Report</p>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[111.2px] items-start left-[352px] px-[24px] top-[546.4px] w-[448px]" data-name="div">
      <Button />
      <Button1 />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="ArrowLeft">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 16">
            <path d="M8 15L1 8L8 1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M15 1H1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[26843500px] shrink-0 size-[36px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] px-[6px] relative size-full">
        <ArrowLeft />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="h-[28px] relative shrink-0 w-[128.538px]" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px] whitespace-nowrap">Analysis Results</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button2 />
        <H />
      </div>
    </div>
  );
}

function Container21() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function Div2() {
  return (
    <div className="absolute bg-[#155dfc] content-stretch flex h-[60px] items-center justify-between left-[352px] px-[16px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-0 w-[448px]" data-name="div">
      <Container20 />
      <Container21 />
    </div>
  );
}

export default function HealthcareGeneticsMobileApp() {
  return (
    <div className="bg-white relative size-full" data-name="Healthcare Genetics Mobile App">
      <Body />
      <Div1 />
      <Div2 />
    </div>
  );
}