exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) {
    return { statusCode: 500, body: 'NOTION_API_KEY not configured' };
  }

  let brief, clientName, industry;
  try {
    ({ brief, clientName, industry } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const DATABASE_ID = '82b0e2c6-d762-4f71-974e-34a5f673e477';

  const properties = {
    'Brief': {
      title: [{ text: { content: `${clientName} — Brief #${brief.briefNumber}: ${brief.angleDescription}` } }]
    },
    'Client': { rich_text: [{ text: { content: clientName || '' } }] },
    'Industry': { rich_text: [{ text: { content: industry || '' } }] },
    'Angle Type': { select: { name: brief.angleType } },
    'Narrative Framework': { select: { name: brief.narrativeFramework } },
    'Hook': { rich_text: [{ text: { content: `${brief.hook.sentence1} ${brief.hook.sentence2}` } }] },
    'Problem Agitation': { rich_text: [{ text: { content: brief.fullAdCopy?.problemAgitation || '' } }] },
    'Moment of Realisation': { rich_text: [{ text: { content: brief.fullAdCopy?.momentOfRealisation || '' } }] },
    'Outcome': { rich_text: [{ text: { content: brief.fullAdCopy?.outcome || '' } }] },
    'Unique Mechanism': { rich_text: [{ text: { content: brief.fullAdCopy?.uniqueMechanism || '' } }] },
    'Social Proof': { rich_text: [{ text: { content: brief.fullAdCopy?.socialProof || '' } }] },
    'CTA': { rich_text: [{ text: { content: brief.fullAdCopy?.cta || '' } }] },
    'Text Overlay': { rich_text: [{ text: { content: brief.staticAdElements?.textOverlay || '' } }] },
    'Headlines': { rich_text: [{ text: { content: (brief.staticAdElements?.headlines || []).join(' | ') } }] },
    'Primary Text': { rich_text: [{ text: { content: brief.staticAdElements?.primaryText || '' } }] },
    'Higgsfield Prompt': { rich_text: [{ text: { content: (brief.higgsfieldPrompt || '').slice(0, 2000) } }] },
  };

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({ parent: { database_id: DATABASE_ID }, properties }),
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: response.ok, id: data.id }),
  };
};
