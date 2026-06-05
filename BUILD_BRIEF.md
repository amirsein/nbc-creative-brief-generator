# NBC Creative Brief Generator - Build Brief

## What This Is
A web app (React) that takes a client intake form as input and outputs a set of structured Meta ad creative briefs, each built according to the Imperium Acquisition (Charlie Morgan) creative framework from the uploaded PDFs and worksheets. Each brief includes all copy elements plus a ready-to-use Higgsfield image generation prompt.

This is an internal tool for an NBC Sales & Marketing agency that runs Meta lead gen campaigns for local service businesses (initial niche: med spa). The tool removes manual creative work and standardizes output quality across all client accounts.

---

## Source Material (Already in Project Folder)
The following files are the knowledge base. They must be loaded and embedded into the AI system prompt at generation time:

**PDFs (full framework documentation):**
- `_IA__Video_1_-_Meta_Ad_Methodology_docx.pdf` - Modern Meta methodology, creative targeting, why creative > audience targeting
- `_IA__Video_2_-_Ad_Angles__1__docx.pdf` - What angles are, 5 angle types (pain, benefit, objection, challenge, identity), how to prioritize
- `_IA__Video_3_-_Writing_Hooks_That_Catch__1__docx.pdf` - Hook structure (2-sentence: clarity + curiosity/contrast), 4 hook mistakes to avoid
- `_IA__Video_4_-_Building_Hooks_From_Angles__1__docx.pdf` - Hook components (subject, action, outcome, contrast, proof, time), assembly rules
- `_IA__Video_5_-_Creating_Ad_Scripts__1__docx.pdf` - 3 narrative frameworks (Problem-Solution, Before-After-Bridge, Myth-Truth), full ad structure (Hook > Problem Agitation > Moment of Realisation > Outcome > Unique Mechanism > Social Proof > CTA)
- `_IA__Video_6_-_Direct_Response___Copy_Psychology_docx.pdf` - Psychological triggers (social proof, authority, urgency, scarcity, loss aversion, specificity), direct response principles (no ambiguity, active voice, quantitative numbers, clarity over cleverness)
- `_IA__Video_7_-_Writing_Copy_For_Static_Ads_docx.pdf` - Static ad anatomy (Image + Overlay + Headline = hook system), 5 elements and their individual jobs, primary text rules for statics

**CSV Worksheets (structured templates):**
- `IA_Meta_Ad_Hooks_Worksheet__Master__-_Template.csv` - Hook building worksheet with columns for angle inputs and hook outputs
- `Copy_of__IA___Meta_Ad_Angles_Worksheet__Master__-_Template.csv` - Angles worksheet with columns for pain points, benefits, objections, challenges, identity inputs
- `_IA__Meta_Ad_Hooks_Worksheet__Master__-_Template.csv` - Additional hooks worksheet

---

## The Creative Framework (Summary for System Prompt)
The AI must follow this pipeline exactly when generating briefs:

### Step 1: Angles
Built from 5 input types:
- **Pain Points** - specific frustrations the customer feels regularly
- **Benefits** - outcomes they want after the problem is solved
- **Objection Handling** - common reasons they don't buy (no time, too expensive, etc.)
- **Challenges** - things they've already tried and failed
- **Identity** - how they see themselves or want to see themselves

Prioritize angles by: strength of pain, breadth of applicability, believability.

### Step 2: Hooks (2 sentences)
- Sentence 1: Clarity (Subject + Action + Outcome) - tells viewer exactly what ad is about and who it's for
- Sentence 2: Curiosity/Contrast - challenges what they believe or introduces a better alternative
- Must avoid: delay, confusion, irrelevance, disinterest
- Use "you/your" not "I/me", active voice, 6th grade reading level

### Step 3: Narrative Framework (pick one per ad)
- **Problem → Solution**: Best for audiences who already know they have a problem
- **Before → After → Bridge**: Best for transformation/contrast angles
- **Myth → Truth**: Best for challenging a common belief or objection

### Step 4: Full Ad Structure
Every ad follows this sequence:
1. Hook (from Step 2)
2. Problem Agitation (deepen the pain - how long, what it cost, what they tried, what happens if nothing changes)
3. Moment of Realisation (reveal the insight - why the problem keeps happening)
4. Outcome (specific, believable result - not fantasy)
5. Unique Mechanism (how your solution works in 2-3 sentences)
6. Social Proof (specific named result, not vague endorsement)
7. CTA (direct, friction-free, matches the action: Learn More for lead gen, Sign Up for lead form)

### Step 5: Static Ad Elements (for each brief)
- **Image direction**: Describe who/what should be in it, what emotion/situation it conveys, what angle it visually represents (stop scroll + signal relevance)
- **Text overlay**: 3-7 words, clarity over cleverness, one idea from the hook expressed in under 1 second
- **Headline variations** (2-3): 6-10 words each, creates tension/contrast/question, pushes the click. Cold audience = contrast/problem/tension. Warm audience = clarity/outcome/specificity
- **Primary text**: Lead with hook as first line, follow narrative framework structure, shorter sentences than video, end with CTA

### Step 6: Higgsfield Image Prompt
A detailed text-to-image prompt for generating the static ad image in Higgsfield. Should describe: subject, setting, mood/emotion, visual style, what the image communicates about the angle, any text overlay direction. Be specific - a vague brief produces a vague image.

---

## Intake Form Fields
The user fills out this form for each client:

| Field | Description |
|---|---|
| Business Name | Name of the client's business |
| Industry / Niche | e.g. Med Spa, Pool Builder, Kitchen Remodeler |
| Location | City/region they serve |
| What They Sell | The specific service or treatment being advertised |
| The Result Clients Get | What the end customer achieves (be specific) |
| Social Proof | Any real numbers, names, timeframes, results they have |
| USPs / Differentiators | What makes this business different from competitors |
| Customer Pain (in their words) | How frustrated customers describe their problem - exact language if possible |
| Objections They Hear | Common reasons people don't book or buy |
| Audience Description | Who is the ideal customer (age, lifestyle, situation) |
| Tone Preference | Professional, casual, direct, educational (optional) |

---

## Output Format
Generate **5-8 ad briefs** per submission. Each brief is a distinct angle type so they cover different audience entry points.

Each brief card should display:
```
BRIEF #[N] - [ANGLE TYPE]: [Short angle description]
NARRATIVE FRAMEWORK: [Problem-Solution / Before-After-Bridge / Myth-Truth]

HOOK:
[Sentence 1 - Clarity]
[Sentence 2 - Curiosity/Contrast]

FULL AD COPY:
Problem Agitation: [2-3 sentences]
Moment of Realisation: [1-2 sentences]
Outcome: [1-2 sentences with specific numbers if available]
Unique Mechanism: [2-3 sentences]
Social Proof: [1 specific, named result]
CTA: [Direct instruction]

STATIC AD ELEMENTS:
Image Direction: [Specific visual brief]
Text Overlay: [3-7 words]
Headline Option 1: [6-10 words]
Headline Option 2: [6-10 words]
Headline Option 3: [6-10 words]

HIGGSFIELD IMAGE PROMPT:
[Detailed, specific prompt for AI image generation. Include subject, setting, mood, lighting, style, what the image should communicate about the angle.]
```

---

## V1 Scope (Build This First)
- React web app
- Intake form UI (all fields listed above)
- On submit: sends intake data + full PDF/CSV knowledge base to Anthropic API (claude-sonnet-4-20250514)
- Displays 5-8 brief cards with all sections above
- Copy button on each brief card (copies the full brief to clipboard)
- Copy button on each Higgsfield prompt (copies just the prompt)
- Clean, functional UI - doesn't need to be fancy, needs to be fast and readable
- Loading state while generating

## V2 Scope (Future - Do Not Build Yet)
- Higgsfield MCP integration: "Generate Image" button on each brief that auto-sends the prompt to Higgsfield and returns the image inline
- Save briefs per client
- Brief history / library
- Export to PDF

---

## Technical Notes
- Use Anthropic API: `https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`
- Max tokens: 8000 (briefs are long)
- The PDFs and CSVs should be read from the project folder and their content embedded into the system prompt so the AI generates output faithful to the framework
- Do not hallucinate or ignore the framework - the system prompt should instruct the model to follow the IA methodology strictly and not invent its own creative approach
- The system prompt should include the full framework summary above plus the key rules from the PDFs
- Keep the API key out of the frontend - use an environment variable

---

## Context: Who This Is For
This tool is being built for Amir, who is running the back-end fulfillment arm of an NBC Sales & Marketing agency. The agency acquires clients (local service businesses like med spas) and runs Meta lead gen campaigns for them. The two biggest bottlenecks are creative quality and ISA calling. This tool solves the creative bottleneck by standardizing brief production using the Imperium Acquisition framework that the agency's SOPs are built on.

The tool will eventually be used for onboarding new clients - fill out the intake form, get 5-8 battle-tested ad concepts immediately, ready to brief a designer or push into Higgsfield.
