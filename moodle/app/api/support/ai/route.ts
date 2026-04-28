import { NextRequest, NextResponse } from 'next/server';
import { getAppAuthContext } from '@/lib/auth/server-session';

const AI_SUPPORT_WEBHOOK_URL =
  'https://n8n.edumeup.com/webhook/f0a0ac6f-f667-404a-9b13-74d11dd68632';

function extractReply(payload: unknown): string {
  if (!payload) return '';
  if (typeof payload === 'string') return payload;

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractReply(item);
      if (nested) return nested;
    }
    return '';
  }

  if (typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const keys = ['reply', 'message', 'response', 'output', 'text', 'answer'];
    for (const key of keys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim()) return value;
      const nested = extractReply(value);
      if (nested) return nested;
    }
  }

  return '';
}

export async function POST(request: NextRequest) {
  const auth = await getAppAuthContext();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (auth.role !== 'student') {
    return NextResponse.json({ error: 'Only students can use AI support chat' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const msg = typeof body?.msg === 'string' ? body.msg.trim() : '';
    if (!msg) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const webhookUrl = new URL(AI_SUPPORT_WEBHOOK_URL);
    webhookUrl.searchParams.set('student_id', String(auth.moodleUserId));
    webhookUrl.searchParams.set('msg', msg);

    async function callWebhook(method: 'GET' | 'POST') {
      const response = await fetch(webhookUrl.toString(), {
        method,
        headers: {
          Accept: 'application/json, text/plain, */*',
          ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
        },
        body: method === 'POST' ? JSON.stringify({ student_id: auth.moodleUserId, msg }) : undefined,
        cache: 'no-store',
      });

      const rawText = await response.text();
      let payload: unknown = rawText;
      if (rawText.trim()) {
        try {
          payload = JSON.parse(rawText);
        } catch {
          payload = rawText;
        }
      }
      const reply = extractReply(payload);

      return { response, payload, reply };
    }

    const getAttempt = await callWebhook('GET');
    if (getAttempt.response.ok && getAttempt.reply) {
      return NextResponse.json({ ok: true, reply: getAttempt.reply });
    }

    const postAttempt = await callWebhook('POST');
    if (postAttempt.response.ok && postAttempt.reply) {
      return NextResponse.json({ ok: true, reply: postAttempt.reply });
    }

    if (!getAttempt.response.ok && !postAttempt.response.ok) {
      return NextResponse.json(
        {
          error: 'AI support service is unavailable',
          details:
            typeof postAttempt.payload === 'string'
              ? postAttempt.payload
              : typeof getAttempt.payload === 'string'
                ? getAttempt.payload
                : undefined,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error:
          'AI service received your message but did not return a reply text. Please check n8n webhook response mapping.',
      },
      { status: 502 },
    );
  } catch (error) {
    console.error('[support][ai] failed', error);
    return NextResponse.json({ error: 'Failed to reach AI support service' }, { status: 500 });
  }
}
