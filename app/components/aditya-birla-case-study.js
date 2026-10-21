import DmsHeroImage from "./dms-hero-image";
import Link from "next/link";
import CaseStudyNav from "./case-study-nav";
import CaseStudyScreen from "./case-study-screen";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [
  ["dms-overview", "Overview"], ["dms-structure", "Information structure"],
  ["dms-dashboard", "Dashboard"], ["dms-library", "Document library"],
  ["dms-approval", "Upload & approval"], ["dms-interface", "Interface decisions"],
  ["dms-reflection", "Reflection"],
];
const dashboard = { src: "/images/aditya-birla-dms-cover.webp", alt: "Aditya Birla document management dashboard showing activity metrics, document status, charts, and a searchable document table" };
const workflow = { src: "/images/aditya-birla-dms-showcase.webp", alt: "Aditya Birla document management designs showing a document list, personal dashboard, and Add Attachment form" };

const screens = {
  projects: { src: "/images/aditya-birla/projects.webp", alt: "Projects with expandable unit and folder navigation, column filters, and project actions" },
  knowledge: { src: "/images/aditya-birla/knowledge-sharing.webp", alt: "Knowledge Sharing document table with department, unit, uploader, and download actions" },
  search: { src: "/images/aditya-birla/global-search.webp", alt: "Global document search results with date, unit, category, and subcategory filters" },
  attachment: { src: "/images/aditya-birla/add-attachment.webp", alt: "Add Attachment form with business context, reference validation, dates, and file upload" },
  departments: { src: "/images/aditya-birla/departments.webp", alt: "Department folder grid with document counts and list and grid controls" },
  mobileUpload: { src: "/images/aditya-birla/mobile-upload.webp", alt: "Mobile document upload success message and Pending for approval status" },
  mobileEmpty: { src: "/images/aditya-birla/mobile-empty.webp", alt: "Mobile empty document library with an Add attachment action" },
  mobileActions: { src: "/images/aditya-birla/mobile-actions.webp", alt: "Mobile Pending for action queue with Actions and History tabs" },
  mobileDashboard: { src: "/images/aditya-birla/mobile-dashboard.webp", alt: "Mobile dashboard with document totals, pending approvals, charts, and action table" },
};
function ScreenFigure({ screen, caption, mobile = false }) {
  return <figure className={`dms-screen-figure${mobile ? " dms-mobile-screen" : ""}`}><CaseStudyScreen screen={screen} showLabel={false} /><figcaption>{caption}</figcaption></figure>;
}

function Section({ id, number, title, children }) {
  return <section className="train-section" id={id}><div className="train-section-title"><span>{number}</span><h2>{title}</h2></div>{children}</section>;
}

export default function AdityaBirlaCaseStudy({ next }) {
  return <main id="content" className="train-case train-case-refined dms-case">
    <ScrollTop />
    <header className="train-hero">
      <Link className="train-back" href="/work">All projects</Link>
      <div className="train-hero-layout">
        <div className="train-hero-copy">
          <p className="train-eyebrow">Aditya Birla · Document Management</p>
          <h1>Find the file.<br /><em>Keep work moving.</em></h1>
          <p className="train-lead">I designed a document management workspace for the Aditya Birla team. It helps people find files by department or unit, upload documents, and track what needs approval.</p>
        </div>
        <DmsHeroImage src={workflow.src} alt={workflow.alt} />
      </div>
      <dl className="train-project-details">{[
        ["My role", "UI Designer"], ["Design tool", "Figma"], ["Platform", "Responsive web application"], ["Core workflow", "Find · Upload · Review"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </header>

    <div className="train-editorial-layout">
      <aside className="train-section-nav"><CaseStudyNav sections={sections} /></aside>
      <article className="train-article">
        <Section id="dms-overview" number="01" title="What the project is about">
          <div className="train-reading"><p>The team works with documents across departments and business units. Finding a file is one part of the job. People also need to know who uploaded it, whether it has been approved, and when it is due to expire.</p><p>My role was UI design in Figma. I worked on the dashboard, folder navigation, search, and upload screens, including layouts for smaller screens.</p></div>
          <div className="train-evidence-grid">{[
            ["Find the right document", "Navigate by business context, then use document details to narrow the list."],
            ["Know what needs attention", "Surface pending approvals, expiring documents, and overdue items alongside everyday activity."],
            ["Review before sharing", "Let team members upload documents while supervisors check them before approval."],
          ].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
        </Section>

        <Section id="dms-structure" number="02" title="Give every document a place.">
          <div className="train-reading"><p>A file name alone rarely tells the whole story. The structure connects each document to a unit and a category, with subcategories providing more specific context. This gives users a way to browse when they know where a document belongs, even if they do not remember its name.</p></div>
          <figure className="dms-hierarchy"><ol>{[
            ["Unit", "Where the work belongs"], ["Category", "The type of work"], ["Subcategory", "A more specific grouping"], ["Document", "The file and its details"],
          ].map(([title, detail], index) => <li key={title}><span>2.{index + 1}</span><strong>{title}</strong><p>{detail}</p></li>)}</ol><figcaption>The navigation model moves from organisational context to an individual document.</figcaption></figure>
          <div className="dms-desktop-gallery">
          <ScreenFigure screen={screens.departments} caption="Departments provide a visual starting point, with document counts and a choice of list or grid view." />
          <ScreenFigure screen={screens.projects} caption="Within a unit, the sidebar keeps project folders visible while the table shows project dates, ownership, and available actions." />
          </div>
          <div className="train-reading"><h3>Browse and search serve different needs.</h3><p>The sidebar keeps the hierarchy visible. Search and table filters help when a user already knows a name, unit, or document attribute. Keeping both routes available supports quick retrieval without forcing every task through the same navigation path.</p></div>
        </Section>

        <Section id="dms-dashboard" number="03" title="See what needs attention">
          <div className="train-reading"><p>The dashboard brings activity and document health into one view. Users can understand their available documents and recent activity, while approval and date-related statuses identify work that needs a closer look.</p></div>
          <div className="dms-desktop-gallery">
            <ScreenFigure screen={dashboard} caption="Dashboard summary, charts, and document activity. Figures are sample interface data." />
            <ScreenFigure screen={screens.search} caption="Global search with date, unit, category, and subcategory filters." />
          </div>
          <div className="dms-dashboard-groups">{[
            ["Activity", "Active users · Viewed · Uploaded · Downloaded", "A concise view of participation and document activity."],
            ["Access", "Total documents", "The document collection available to the user."],
            ["Attention", "Pending approval · Expiring · Overdue", "Separate signals for review work and time-sensitive follow-up."],
          ].map(([label, title, text]) => <div key={label}><span>{label}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
          <div className="train-reading"><p>Unit-wise and category-wise charts add a broader view of the collection. The document table remains below the summary, keeping an overview and the next practical action close together.</p></div>
        </Section>

        <Section id="dms-library" number="04" title="Find and check documents">
          <div className="train-reading"><p>The table gives each document enough context to be identified without opening it first. The design groups the file’s identity, its organisational location, and the people and dates behind it.</p></div>
          <div className="train-table-wrap"><table><caption>The information behind a document</caption><thead><tr><th>Information</th><th>Fields</th><th>Why it matters</th></tr></thead><tbody>
            <tr><td>Document identity</td><td>Name, document number, file type</td><td>Recognise the item and distinguish similar files.</td></tr>
            <tr><td>Business context</td><td>Unit, category, subcategory</td><td>Understand where the document belongs.</td></tr>
            <tr><td>Ownership &amp; review</td><td>Uploaded by, approved by</td><td>See who contributed the file and who reviewed it.</td></tr>
            <tr><td>Timing &amp; status</td><td>Upload date, approval status, relevant due and expiry dates</td><td>Check progress and identify items needing attention.</td></tr>
            <tr><td>Available actions</td><td>View, download, review where permitted</td><td>Take the next step from the document’s context.</td></tr>
          </tbody></table></div>
          <div className="train-reading"><h3>Keep the list useful as it grows.</h3><p>Search, category filters, and status controls narrow a large collection into a manageable working list. Clear file-type icons and consistent row alignment help users scan repeated information. Labels carry meaning alongside colour, so status does not depend on colour alone.</p></div>
          <div className="dms-desktop-gallery">
          <ScreenFigure screen={screens.knowledge} caption="Knowledge Sharing lists documents across departments and units, with uploader details and download actions." />
            <ScreenFigure screen={screens.attachment} caption="The attachment form collects business context, validates references, and accepts the document file." />
          </div>
        </Section>

        <Section id="dms-approval" number="05" title="Upload a file and track its approval">
          <div className="train-reading"><p>Team members can upload documents, but a supervisor must check that the correct document has been submitted before approving it. This separates contributing a file from confirming that it is ready for the shared collection.</p><p>The Add Attachment design collects the document’s unit, category, subcategory, reference details, and relevant dates alongside the file itself. Capturing context at upload helps the reviewer understand what the submission is and where it belongs.</p></div>
          <figure className="train-flow dms-review-flow"><ol>{["Choose the unit and category", "Add details and attach the file", "Submit for supervisor review", "Supervisor checks and approves"].map((step) => <li key={step}>{step}</li>)}</ol><figcaption>The core upload-to-approval workflow described for the project.</figcaption></figure>
          <div className="dms-mobile-states">
            <ScreenFigure screen={screens.mobileDashboard} mobile caption="A mobile overview of documents, charts, and pending work." />
            <ScreenFigure screen={screens.mobileEmpty} mobile caption="An empty library offers a clear route to upload the first document." />
            <ScreenFigure screen={screens.mobileUpload} mobile caption="After upload, a success message and approval label explain the document’s current state." />
            <ScreenFigure screen={screens.mobileActions} mobile caption="The action queue separates work awaiting review from its history." />
          </div>
          <div className="dms-design-note"><span>Design principle</span><h3>Show the state, not just the submission.</h3><p>A pending document should be distinguishable from an approved one. The uploader needs to know that the file is awaiting a decision; the supervisor needs a clear queue of items to review.</p></div>
        </Section>

        <Section id="dms-interface" number="06" title="The main design decisions">
          <div className="train-direction-list">{[
            ["A persistent navigation anchor", "The deep red sidebar gives the hierarchy a consistent home. A contrasting active item identifies the current destination as users move between categories."],
            ["An overview before the detail", "Summary cards establish the dashboard hierarchy. Charts explain the collection, and the table supports document-level work."],
            ["Consistent patterns for repeated tasks", "Aligned table fields, labelled filters, clear form labels, and a prominent upload action help connect browsing with contribution."],
            ["Status with a reason to act", "Pending approval, expiring, and overdue are distinct states. Keeping their labels explicit helps users understand whether a document needs review or date-related follow-up."],
          ].map(([title, text], index) => <div key={title}><span>6.{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </Section>

        <Section id="dms-reflection" number="07" title="What I took from this project">
          <div className="train-reading"><p>The main challenge was keeping a detailed document system easy to follow. Folder navigation helps people browse, search helps them find a known file, and status labels show what needs attention.</p><p>The next step I would take is to test those tasks with the team: finding a document, uploading it in the right place, and reviewing a submission.</p></div>
        </Section>
      </article>
    </div>
    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>On to the next project.</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3><p>{next.summary}</p></div></Link><Link className="train-back" href="/work">All projects</Link></section>
  </main>;
}
