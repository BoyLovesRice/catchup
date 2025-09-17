import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function offline(text: string){
  const lines = text.split(/\n+/).slice(0,200);
  const bullets: string[] = [];
  const push = (t?:string)=>{ if(t && bullets.length<8) bullets.push('• '+t.trim()); };
  lines.forEach(l=>{ const s=l.toLowerCase(); if(/(launch|deadline|due|invoice|approve|decision|confirm)/.test(s)) push(l.replace(/subject:\s*/i,'').replace(/from:\s*/i,'')); });
  if (bullets.length<5) lines.forEach(l=>{ if(bullets.length<8 && l.length>20) push(l); });
  return bullets.join('\n');
}

export async function POST(req: NextRequest){
  const { text } = await req.json();
  if (!process.env.OPENAI_API_KEY){ return NextResponse.json({ summary: offline(text) }); }
  try{
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Summarize messages into 6-10 bullets. Bold dates, owners, and money. Include an Action Items section if applicable.\n\nINPUT:\n${text}`;
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      max_output_tokens: 500,
    });
    const out = resp.output_text || offline(text);
    return NextResponse.json({ summary: out.trim() });
  }catch(e:any){
    return NextResponse.json({ summary: offline(text), error: e?.message }, { status: 200 });
  }
}
