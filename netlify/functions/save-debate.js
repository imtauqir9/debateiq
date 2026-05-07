exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method not allowed' };

  try {
    const { topic, topic_emoji, position, tone, language, source, score, layers, total_tokens, user_id } = JSON.parse(event.body);

    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/debates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        user_id, topic, topic_emoji, position, tone, language, source,
        score_overall: score?.overall || null,
        score_strength: score?.strength || null,
        score_evidence: score?.evidence || null,
        score_logic: score?.logic || null,
        score_persuasion: score?.persuasion || null,
        score_verdict: score?.verdict || null,
        layers: JSON.stringify(layers),
        total_tokens
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, id: data[0]?.id }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
