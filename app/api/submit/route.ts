import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const webhookUrl = process.env['N8N_WEBHOOK_URL'];

  if (!webhookUrl) {
    // W3 not yet configured — log so submission is not lost
    console.log('[ASSESSMENT SUBMISSION]', JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('[ASSESSMENT] n8n webhook returned', res.status);
      return NextResponse.json({ error: 'Webhook failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[ASSESSMENT] Webhook fetch error:', err);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
}
