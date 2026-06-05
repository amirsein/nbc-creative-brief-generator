exports.handler = async (event) => {
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) {
    return { statusCode: 500, body: 'NOTION_API_KEY not configured' };
  }

  const DATABASE_ID = '98392561-a919-4c16-aa3e-0d4a8326badc';
  const client = event.queryStringParameters?.client || null;

  const filter = client ? {
    property: 'Client',
    rich_text: { contains: client }
  } : undefined;

  const body = {
    sorts: [{ property: 'Created', direction: 'descending' }],
    page_size: 20,
    ...(filter ? { filter } : {})
  };

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return { statusCode: response.status, body: JSON.stringify(data) };
  }

  // Map Notion pages back to brief objects
  const briefs = (data.results || []).map((page, i) => {
    const p = page.properties;
    const getText = (prop) => p[prop]?.rich_text?.[0]?.plain_text || '';
    const getTitle = (prop) => p[prop]?.title?.[0]?.plain_text || '';
    const getSelect = (prop) => p[prop]?.select?.name || '';
    const headlines = getText('Headlines').split(' | ').filter(Boolean);

    return {
      notionId: page.id,
      notionUrl: page.url,
      briefNumber: i + 1,
      angleType: getSelect('Angle Type'),
      angleDescription: getTitle('Brief').split(': ').slice(1).join(': '),
      narrativeFramework: getSelect('Narrative Framework'),
      clientName: getText('Client'),
      createdTime: page.created_time,
      hook: {
        sentence1: getText('Hook').split('. ')[0] + '.',
        sentence2: getText('Hook').split('. ').slice(1).join('. '),
      },
      fullAdCopy: {
        problemAgitation: getText('Problem Agitation'),
        momentOfRealisation: getText('Moment of Realisation'),
        outcome: getText('Outcome'),
        uniqueMechanism: getText('Unique Mechanism'),
        socialProof: getText('Social Proof'),
        cta: getText('CTA'),
      },
      staticAdElements: {
        imageDirection: '',
        textOverlay: getText('Text Overlay'),
        headlines,
        primaryText: getText('Primary Text'),
      },
      higgsfieldPrompt: getText('Higgsfield Prompt'),
    };
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(briefs),
  };
};
