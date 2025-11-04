'use strict';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: 'ok' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'RESEND_API_KEY manquante côté serveur' }) };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}');
    if (!name || !email || !message) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Champs manquants' }) };
    }

    const toEmail = 'arthur.champagne-forterre@epitech.digital';
    const subject = `Nouveau message de ${name}`;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#0f172a">
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const apiRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [toEmail],
        subject,
        html,
        reply_to: email,
      }),
    });

    const rawText = await apiRes.text();
    let apiData;
    try { apiData = JSON.parse(rawText); } catch { apiData = { raw: rawText }; }

    if (!apiRes.ok) {
      const errMsg = apiData?.message || apiData?.error || apiData?.raw || 'Erreur Resend';
      return { statusCode: apiRes.status, headers: corsHeaders, body: JSON.stringify({ error: errMsg, data: apiData }) };
    }

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true, id: apiData?.id || apiData?.data?.id }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err?.message || 'Erreur serveur' }) };
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


