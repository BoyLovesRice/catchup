'use client';
import { useState } from 'react';

type PlanKey = 'free'|'personal'|'pro'|'team';
const features: Record<PlanKey,string[]> = {
  free:["1 source: Gmail or Slack","Weekday digest (1/day)","30-day archive (read-only)","Email delivery"],
  personal:["2 sources (Gmail + Slack/Notion/RSS)","1–2 digests/day","Priority senders (20)","90-day archive with search"],
  pro:["All common sources","Smart topic grouping","Custom sections & rules","Weekly rollup + attachments","1-year archive + vector search","API/Zapier + reply drafts"],
  team:["Everything in Pro","Shared team digests & Slack app","SSO (Google), domain claim","Admin console & role-based access","2-year archive, org-wide search","Analytics: reads, time saved"],
};
const prices: Record<PlanKey,string> = { free:'$0', personal:'$9', pro:'$19', team:'$99+' };

export default function PricingSection(){
  const [billing, setBilling] = useState<'monthly'|'yearly'>('monthly');
  return (
    <section className="container">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Simple, fair pricing</h2>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={()=>setBilling('monthly')} className={`btn ${billing==='monthly'?'btn-primary text-white':''}`}>Monthly</button>
          <button onClick={()=>setBilling('yearly')} className={`btn ${billing==='yearly'?'btn-primary text-white':''}`}>Yearly <span className="ml-1 text-xs"> (2 months free)</span></button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {(['free','personal','pro','team'] as PlanKey[]).map(key=> (
          <div key={key} className="card p-4">
            <div className="flex items-baseline justify-between">
              <div className="text-lg font-semibold capitalize">{key}</div>
              <div className="text-2xl font-bold">{prices[key]}<span className="text-base font-normal text-[color:var(--muted)]">{key==='team'?'/mo':(billing==='yearly'?'/yr':'/mo')}</span></div>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-[color:var(--muted)]">
              {features[key].map((f,i)=>(<li key={i}>{f}</li>))}
            </ul>
            <button
              onClick={async ()=>{
                if (key==='free'){ window.location.href='/signup?plan=free'; return; }
                const res = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plan:key, billing }) });
                const data = await res.json();
                if (data?.url) window.location.href = data.url; else alert(data?.error || 'Checkout failed');
              }}
              className={`btn w-full mt-4 ${key==='free'?'':'btn-primary text-white'}`}
            >
              {key==='free'?'Start free':'Start 7‑day trial'}
            </button>
            {key==='team' && <div className="mt-2 text-xs text-[color:var(--muted)]">Includes 5 seats. $15/additional seat.</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
