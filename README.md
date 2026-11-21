<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,50:1a1a2e,100:0d0d0d&height=160&section=header&text=hey%2C+i%27m+aditya+%F0%9F%91%8B&fontSize=38&fontColor=c9a96e&fontAlignY=45&animation=fadeIn" width="100%"/>

*final-year AI/ML student. i build models, and the backends that make them usable.*

[![Portfolio](https://img.shields.io/badge/see_my_work-adityakeerti.vercel.app-c9a96e?style=flat-square&labelColor=0d0d0d)](https://adityakeerti.vercel.app/)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/let's_connect-LinkedIn-0a66c2?style=flat-square&logo=linkedin&logoColor=white&labelColor=0d0d0d)](https://linkedin.com/in/adityakeerti)
&nbsp;
[![Email](https://img.shields.io/badge/say_hello-Gmail-c9a96e?style=flat-square&logo=gmail&logoColor=white&labelColor=0d0d0d)](mailto:adityacodes404@gmail.com)

</div>

---

```python
class Aditya:
    studying   = "B.Tech CSE (AI/ML) @ Graphic Era Hill University, 2023 – 2027"
    location   = "Dehradun, India 🏔️"
    works_on   = ["LLM document extraction", "reinforcement learning", "agentic AI", "Python backends"]
    stack      = ["PyTorch", "LangGraph", "FastAPI", "llama.cpp", "PostgreSQL"]
    looking_for = "entry-level AI/ML and software engineering roles"
```

---

## 💼 experience

**Software Engineering Intern (AI/ML) @ Peerprep** &nbsp;`Mar – May 2026`

- built a marksheet extraction pipeline: OpenCV, a fine-tuned YOLOv8 to identify the board, Table Transformer for layout
- structure-preserving OCR (LLM Whisperer) for marksheets with messy layouts and tables
- React frontend + async FastAPI/MySQL backend → about **30 seconds per document**, end to end

`Python` `OpenCV` `YOLOv8` `Table Transformer` `FastAPI` `MySQL` `React`

---

## 🔨 things i built

### 🏙️ CitySense — *why does that pothole keep coming back?* &nbsp;`Oct – Nov 2026`

> a pothole, a damp wall and a water-pressure dip land in three different departments. they're often the same leaking pipe.

- traces recurring civic complaints back to the infrastructure fault behind them, and names the department that owns it
- LangGraph planner routes citizen requests to specialist agents: complaint filing, emergency response, hybrid-RAG answers (Hindi/English)
- tested on two fault-injection simulations: a synthetic city (water, sewer, waste, streetlights) and a traffic twin of a 10-junction Dehradun corridor
- **89% top-cause accuracy** over 118 benchmark runs, using shockwave analysis + counterfactual replays
- Double DQN written from scratch in NumPy decides what to inspect first: wasted repairs **~45 → under 4** per episode
- a second RL agent (PyTorch) runs traffic signals within safety limits: **27% shorter queues** than fixed-time signals

*all numbers are from simulation, not a live city.*

`Python` `PyTorch` `NumPy` `LangGraph` `FastAPI` `PostgreSQL/pgvector` `llama.cpp` `React`

---

### 📄 [DOC-OC v2](https://github.com/Adityakeerti/DOC-OC-LLM) — *a whole OCR pipeline, replaced by one local model* &nbsp;`Sep – Oct 2026` &nbsp;·&nbsp; [live demo](https://adityacodes404-doc-oc.hf.space/)

> runs on a 6 GB laptop GPU. no cloud, no API bill.

- swapped a multi-stage OCR + CV cascade for a single pass of **Gemma 4 E2B** (Q4, 3.2 GB VRAM) on llama.cpp, picked after benchmarking Qwen2.5-VL-3B and UI-TARS-7B
- **27 s → 6.3 s per page (4.3×)**: reasoning-token suppression, full GPU offload, FlashAttention, 1600 px input cap
- JSON schema compiled to a GBNF grammar, so output is always valid; then Pydantic + arithmetic checks fix column shifts
- tested on 37 marksheets from CBSE, ICSE/ISC and state boards

`Python` `Gemma 4` `llama.cpp` `GBNF` `Pydantic` `PyMuPDF` `FastAPI`

---

### 🏥 [Anand Kosh](https://github.com/Adityakeerti/anand-kosh) — *clinical records for a real clinic* &nbsp;`Jul – Aug 2026`

> used by operators in a government hospital department clinic.

- manages 50+ patient records, documents, reminders and scheduling
- role-based access for administrators, medical staff and clinical observers
- Prisma + Neon PostgreSQL, Google Drive API for documents, audit logging

`TypeScript` `Next.js` `Prisma` `PostgreSQL` `Google Drive API`

---

### more

- [**Advanzia AutoLend**](https://github.com/Adityakeerti/Credit_Limit_Adjust_RL): RL credit-limit optimization, Dueling Double DQN + Cox hazard model
- [**Campus Intel**](https://github.com/Adityakeerti/CampusIntel): campus platform with RAG assistant, marksheet correction flow, phone-camera library scanner
- [**Resume Rank AI**](https://github.com/Adityakeerti/resumeRankerAi): embeddings → NLI gate → cross-encoder reranker to shortlist resumes on CPU

---

## 🖌️ the tech wall

<div align="center">

<img src="https://skillicons.dev/icons?i=python,java,c&theme=dark" height="42" title="languages"/>
&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=pytorch,sklearn,opencv&theme=dark" height="42" title="AI/ML"/>
&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=fastapi,postgres,mysql&theme=dark" height="42" title="backend + databases"/>
&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=react,ts&theme=dark" height="42" title="frontend"/>
&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=gcp,docker,git&theme=dark" height="42" title="cloud + tools"/>

</div>

---

## 🏆 hackathons

🥇 **1st place, MariTHON National Hackathon**: Google Cloud Vertex AI pipeline that pulls structured JSON out of maritime documents. the Integrated Maritime Exchange adopted it for their production backend.

🏁 **finalist, HackTheWinter National Hackathon**: RL credit-limit optimization (Dueling Double DQN + Cox Proportional Hazards) over 10,000+ synthetic borrower profiles.

🏛️ **finalist, India Innovates 2026**: made the physical finale at Bharat Mandapam, New Delhi (top 500 of 10,000+ teams).

---

<div align="center">

<img src="https://github-readme-activity-graph.vercel.app/graph?username=Adityakeerti&bg_color=0d0d0d&color=c9a96e&line=c9a96e&point=e8d5a8&area=true&hide_border=true&custom_title=proof+that+i+actually+code" width="95%"/>

<br/>

<img src="https://github-readme-stats.vercel.app/api?username=Adityakeerti&show_icons=true&bg_color=0d0d0d&title_color=c9a96e&text_color=888888&icon_color=c9a96e&hide_border=true&include_all_commits=true&count_private=true" height="160"/>
&nbsp;&nbsp;
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Adityakeerti&layout=compact&bg_color=0d0d0d&title_color=c9a96e&text_color=888888&hide_border=true&langs_count=6" height="160"/>

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d0d0d,100:1a1a2e&height=100&section=footer" width="100%"/>

</div>
