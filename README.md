# Shvamz Portfolio

A minimal portfolio starter built with React and Next.js.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Train Staff case study

The first project opens `/work/project-one`. Its editorial content is in `app/components/train-staff-case-study.js`; real screenshot paths, alternative text, and captions belong in `app/train-staff.js`. Missing screens render labelled asset slots in draft mode. Supplied screens open in a native dialog, with Escape, a close button, and focus restoration.

Draft mode is the default so all supplied content placeholders remain visible. For publication, set `TRAIN_STAFF_PUBLISHED=true` when building. This hides pending sections, unverified details, and missing asset slots. Currently the confirmed project metadata, introduction, overview, launch information, and next-project links remain in that mode. Populate and verify each section before including it in the published case study. Do not treat the illustrative journeys or proposed validation plan as project evidence.
