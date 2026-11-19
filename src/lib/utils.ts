export function fmt(sec:number){ return `${Math.floor(sec/60)}:${Math.floor(sec%60).toString().padStart(2,'0')}` }
export function calcPrice(plan:string, code?:string){ const base = plan==='monthly'?350: plan==='term'?900:1500; const disc = code?.toUpperCase()==='NOOR10'? Math.round(base*0.1):0; return {base, disc, total: base-disc} }
