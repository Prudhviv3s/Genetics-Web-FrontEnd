import svgPaths from "./svg-pe9pr4huir";

function Container() {
  return <div className="shrink-0 size-0" data-name="Container" />;
}

function PlasmoCsui() {
  return (
    <div className="absolute content-stretch flex h-0 items-start left-0 top-[64px] w-[1152px]" data-name="Plasmo-csui">
      <Container />
    </div>
  );
}

function PlasmoCsui1() {
  return <div className="absolute h-0 left-0 top-0 w-[1152px]" data-name="Plasmo-csui" />;
}

function User() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="User">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="User">
          <path d={svgPaths.p1913f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p17fe7470} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[26843500px] shrink-0 size-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <User />
      </div>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="h2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[30px] text-white top-[-1.6px] whitespace-nowrap">Sarah Johnson</p>
    </div>
  );
}

function P() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#dbeafe] text-[18px] top-[-1.4px] whitespace-nowrap">Patient ID: PT-2024-001</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <H1 />
        <P />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function P1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#dbeafe] text-[14px] top-[-0.2px] whitespace-nowrap">Age</p>
    </div>
  );
}

function P2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[20px] text-white top-[-1.2px] whitespace-nowrap">34 years</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-0 top-[24.8px] w-[245.325px]" data-name="Container">
      <P1 />
      <P2 />
    </div>
  );
}

function P3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#dbeafe] text-[14px] top-[-0.2px] whitespace-nowrap">Gender</p>
    </div>
  );
}

function P4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[20px] text-white top-[-1.2px] whitespace-nowrap">Female</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[269.33px] top-[24.8px] w-[245.338px]" data-name="Container">
      <P3 />
      <P4 />
    </div>
  );
}

function P5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#dbeafe] text-[14px] top-[-0.2px] whitespace-nowrap">Analysis Date</p>
    </div>
  );
}

function P6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px] whitespace-nowrap">2/10/2026</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[538.66px] top-[24.8px] w-[245.325px]" data-name="Container">
      <P5 />
      <P6 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[76.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <Container7 />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#155dfc] gap-[24px] h-[244.8px] items-start left-0 pt-[32px] px-[32px] rounded-[16px] to-[#1447e6] top-0 w-[848px]" data-name="Container">
      <Container3 />
      <Container6 />
    </div>
  );
}

function Activity() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Activity">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Activity">
          <path d={svgPaths.p3012a800} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[180.588px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[20px] top-[-1.2px] whitespace-nowrap">Inheritance Pattern</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[24.8px] top-[24.8px] w-[362.4px]" data-name="Container">
      <Activity />
      <H2 />
    </div>
  );
}

function P7() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px not-italic relative text-[#1c398e] text-[24px]">Autosomal Dominant</p>
    </div>
  );
}

function TrendingUp() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="TrendingUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="TrendingUp">
          <path d={svgPaths.p305bd600} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 5.25H16.5V9.75" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[182.275px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#364153] text-[14px] top-[-0.2px] whitespace-nowrap">
          <span className="leading-[20px]">{`Confidence: `}</span>
          <span className="leading-[20px] text-[#00a63e]">92% (Very High)</span>
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <TrendingUp />
      <Span />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[12px] h-[107.188px] items-start left-[24.8px] pb-[1.6px] pt-[21.6px] px-[21.6px] rounded-[14px] top-[72.8px] w-[362.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#155dfc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <P7 />
      <Container14 />
    </div>
  );
}

function P8() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#364153] text-[14px] top-[-0.4px] w-[319px]">Pattern where only one copy of the mutated gene from one parent is sufficient to cause the condition. Affected individuals have a 50% chance of passing the condition to each child.</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[123px] items-start left-[24.8px] pt-[16px] px-[16px] rounded-[10px] top-[195.99px] w-[362.4px]" data-name="Container">
      <P8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white col-1 h-[343.788px] justify-self-stretch relative rounded-[14px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container12 />
      <Container13 />
      <Container15 />
    </div>
  );
}

function Activity1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Activity">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Activity">
          <path d={svgPaths.p3012a800} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function H3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[164.65px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[20px] top-[-1.2px] whitespace-nowrap">Pedigree Analysis</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Activity1 />
      <H3 />
    </div>
  );
}

function P9() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[34.25px] not-italic text-[#1c398e] text-[36px] text-center top-[-2px] whitespace-nowrap">12</p>
    </div>
  );
}

function P10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33.47px] not-italic text-[#4a5565] text-[14px] text-center top-[-0.2px] w-[60px]">Family Members</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[8px] h-[131.2px] items-start left-0 pb-[1.6px] pt-[21.6px] px-[21.6px] rounded-[14px] top-0 w-[110.125px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <P9 />
      <P10 />
    </div>
  );
}

function P11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[33.11px] not-italic text-[#7e2a0c] text-[36px] text-center top-[-2px] whitespace-nowrap">5</p>
    </div>
  );
}

function P12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[34px] not-italic text-[#4a5565] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Affected</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#fff7ed] content-stretch flex flex-col gap-[8px] h-[131.2px] items-start left-[126.13px] pb-[1.6px] pt-[21.6px] px-[21.6px] rounded-[14px] top-0 w-[110.138px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ffd6a8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <P11 />
      <P12 />
    </div>
  );
}

function P13() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[33.11px] not-italic text-[#59168b] text-[36px] text-center top-[-2px] whitespace-nowrap">3</p>
    </div>
  );
}

function P14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[38px] not-italic text-[#4a5565] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Generations</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#faf5ff] content-stretch flex flex-col gap-[8px] h-[131.2px] items-start left-[252.26px] pb-[1.6px] pt-[21.6px] px-[21.6px] rounded-[14px] top-0 w-[110.138px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e9d4ff] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <P13 />
      <P14 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[131.2px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white col-2 h-[343.788px] justify-self-stretch relative rounded-[14px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[0.8px] pt-[24.8px] px-[24.8px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[343.788px] left-0 top-[276.8px] w-[848px]" data-name="Container">
      <Container11 />
      <Container16 />
    </div>
  );
}

function Calendar() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Calendar">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Calendar">
          <path d="M6 1.5V4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 1.5V4.5" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p13693a10} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 7.5H15.75" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[210.2px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-0.2px] whitespace-nowrap">Report Generated: March 7, 2026</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Calendar />
      <Span1 />
    </div>
  );
}

function P15() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.2px] w-[745px]">This report is based on automated pedigree analysis and should be reviewed by a qualified genetics professional. Clinical correlation is essential.</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[8px] h-[109.6px] items-start left-0 pb-[0.8px] pt-[20.8px] px-[20.8px] rounded-[14px] top-[652.59px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container23 />
      <P15 />
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Download">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Download">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 10L12 15L17 10" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15V3" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[64.763px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[32px] not-italic text-[#364153] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Download</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col gap-[8px] h-[87.2px] items-center justify-self-stretch px-[1.6px] py-[17.6px] relative rounded-[14px] row-1 shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Download />
      <Span2 />
    </div>
  );
}

function Share() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Share2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Share2">
          <path d={svgPaths.p240f9a80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p66efb00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pd8f4e80} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8.59 13.51L15.42 17.49" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M15.41 6.51L8.59 10.49" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[35.575px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[18px] not-italic text-[#364153] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Share</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col gap-[8px] h-[87.2px] items-center justify-self-stretch px-[1.6px] py-[17.6px] relative rounded-[14px] row-1 shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Share />
      <Span3 />
    </div>
  );
}

function Printer() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Printer">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Printer">
          <path d={svgPaths.p31e77980} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p11c4fd00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p258ef980} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[30.25px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[15.5px] not-italic text-[#364153] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Print</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white col-3 content-stretch flex flex-col gap-[8px] h-[87.2px] items-center justify-self-stretch px-[1.6px] py-[17.6px] relative rounded-[14px] row-1 shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Printer />
      <Span4 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[87.2px] left-0 top-[786.19px] w-[848px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f9fafb] h-[873.388px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container10 />
      <Container22 />
      <Container24 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f9fafb] h-[921.388px] relative shrink-0 w-full" data-name="div">
      <div className="content-stretch flex flex-col items-start pl-[280px] pr-[24px] pt-[24px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[681.6px] items-start left-0 top-[64px] w-[1152px]" data-name="Body">
      <Div />
    </div>
  );
}

function GitBranch() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="GitBranch">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="GitBranch">
          <path d="M6 3V15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33719c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p4141780} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pea47f00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="h1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.4px] whitespace-nowrap">Genetics</p>
    </div>
  );
}

function P16() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Doctor Portal</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[43.987px] relative shrink-0 w-[117.4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <H />
        <P16 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[12px] h-[43.987px] items-center relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[92.787px] relative shrink-0 w-[255.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[24px] px-[24px] relative size-full">
        <Container26 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[42.888px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[21.5px] not-italic text-[#364153] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-0 pl-[16px] rounded-[10px] top-0 w-[223.2px]" data-name="button">
      <Icon />
      <Span5 />
    </div>
  );
}

function Li() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="li">
      <Button3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[104.225px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[52.5px] not-italic text-[#364153] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Pedigree Chart</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-0 pl-[16px] rounded-[10px] top-0 w-[223.2px]" data-name="button">
      <Icon1 />
      <Span6 />
    </div>
  );
}

function Li1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="li">
      <Button4 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_218_465)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_218_465">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[56.588px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[28.5px] not-italic text-[#364153] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Analysis</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-0 pl-[16px] rounded-[10px] top-0 w-[223.2px]" data-name="button">
      <Icon2 />
      <Span7 />
    </div>
  );
}

function Li2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="li">
      <Button5 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.ped54800} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[56.862px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[28.5px] not-italic text-[#364153] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[48px] items-center left-0 pl-[16px] rounded-[10px] top-0 w-[223.2px]" data-name="button">
      <Icon3 />
      <Span8 />
    </div>
  );
}

function Li3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="li">
      <Button6 />
    </div>
  );
}

function Ul() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[204px] items-start relative shrink-0 w-full" data-name="ul">
      <Li />
      <Li1 />
      <Li2 />
      <Li3 />
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255.2px]" data-name="nav">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
          <Ul />
        </div>
      </div>
    </div>
  );
}

function LogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="LogOut">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="LogOut">
          <path d={svgPaths.p38966ca0} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14ca9100} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[50.188px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[25.5px] not-italic text-[#e7000b] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Logout</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <LogOut />
          <Span9 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[80.8px] relative shrink-0 w-[255.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16.8px] px-[16px] relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[681.6px] items-start left-0 pr-[0.8px] top-0 w-[256px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-r-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container25 />
      <Nav />
      <Container29 />
    </div>
  );
}

function H4() {
  return (
    <div className="h-[31.988px] relative shrink-0 w-[669px]" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px not-italic relative text-[#101828] text-[24px]">Inheritance Pattern Report</p>
      </div>
    </div>
  );
}

function P17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="p">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[59px] not-italic text-[#101828] text-[14px] text-right top-[-0.2px] whitespace-nowrap">Dr. Smith</p>
    </div>
  );
}

function P18() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="p">
      <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] text-right">doctor</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[35.987px] relative shrink-0 w-[58.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <P17 />
        <P18 />
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="User">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="User">
          <path d={svgPaths.p2026e800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[26843500px] shrink-0 size-[40px]" data-name="button" style={{ backgroundImage: "linear-gradient(135deg, rgb(21, 93, 252) 0%, rgb(152, 16, 250) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <User1 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[52px] pl-[16.8px] top-0 w-[127px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container32 />
      <Button8 />
    </div>
  );
}

function Bell() {
  return (
    <div className="absolute left-[8px] size-[20px] top-[8px]" data-name="Bell">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Bell">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span10() {
  return <div className="absolute bg-[#fb2c36] left-[24px] rounded-[26843500px] size-[8px] top-[4px]" data-name="span" />;
}

function Button9() {
  return (
    <div className="absolute left-0 rounded-[10px] size-[36px] top-[2px]" data-name="button">
      <Bell />
      <Span10 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[40px] relative shrink-0 w-[179px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container31 />
        <Button9 />
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[63.2px] items-center justify-between left-[256px] pb-[0.8px] px-[24px] top-0 w-[896px]" data-name="div">
      <div aria-hidden="true" className="absolute border-b-[0.8px] border-black border-solid inset-0 pointer-events-none" />
      <H4 />
      <Container30 />
    </div>
  );
}

export default function HealthcareGeneticsWebApp() {
  return (
    <div className="bg-white relative size-full" data-name="Healthcare Genetics WebApp">
      <PlasmoCsui />
      <PlasmoCsui1 />
      <Body />
      <Div1 />
      <Div2 />
    </div>
  );
}
