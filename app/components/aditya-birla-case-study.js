import Image from "next/image";
import Link from "next/link";
import CaseStudyNav from "./case-study-nav";
import CaseStudyScreen from "./case-study-screen";
import ScrollTop from "../work/[slug]/scroll-top";

const sections = [
  ["dms-overview", "Overview"], ["dms-structure", "Information structure"],
  ["dms-dashboard", "Dashboard"], ["dms-library", "Document library"],
  ["dms-approval", "Upload & approval"], ["dms-interface", "Interface decisions"],
  ["dms-next", "Future opportunities"], ["dms-reflection", "Reflection"],
];
const dashboard = { src: "/images/aditya-birla-dms-cover.webp", alt: "Aditya Birla document management dashboard showing activity metrics, document status, charts, and a searchable document table" };
const workflow = { src: "/images/aditya-birla-dms-showcase.webp", alt: "Aditya Birla document management designs showing a document list, personal dashboard, and Add Attachment form" };

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
          <h1>Shared knowledge.<br /><em>Clearer control.</em></h1>
          <p className="train-lead">An internal workspace for the Aditya Birla team to find, upload, and review documents. A familiar shared-drive experience, shaped around business units, document categories, and supervisor approvals.</p>
        </div>
        <div className="dms-hero-visual"><Image src={workflow.src} alt={workflow.alt} width={1920} height={1320} sizes="(max-width: 800px) 100vw, 50vw" loading="eager" /></div>
      </div>
      <dl className="train-project-details">{[
        ["My role", "UI Designer"], ["Design tool", "Figma"], ["Platform", "Internal web application"], ["Core workflow", "Find · Upload · Review"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </header>

    <div className="train-editorial-layout">
      <aside className="train-section-nav"><CaseStudyNav sections={sections} /></aside>
      <article className="train-article">
        <Section id="dms-overview" number="01" title="A shared drive with a business context.">
          <div className="train-reading"><p>The team needed a place to work with documents across different units, categories, and subcategories. Like a shared drive, the product brings files together. Unlike a simple folder of attachments, it also makes document ownership, approval, and time-sensitive status part of the experience.</p><p>I designed the interface in Figma, bringing the dashboard, document library, and upload experience into one consistent workspace. The application is used internally by the Aditya Birla team.</p></div>
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
          ].map(([title, detail], index) => <li key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{detail}</p></li>)}</ol><figcaption>The navigation model moves from organisational context to an individual document.</figcaption></figure>
          <div className="train-reading"><h3>Browse and search serve different needs.</h3><p>The sidebar keeps the hierarchy visible. Search and table filters help when a user already knows a name, unit, or document attribute. Keeping both routes available supports quick retrieval without forcing every task through the same navigation path.</p></div>
        </Section>

        <Section id="dms-dashboard" number="03" title="Start with what matters today.">
          <div className="train-reading"><p>The dashboard brings activity and document health into one view. Users can understand their available documents and recent activity, while approval and date-related statuses identify work that needs a closer look.</p></div>
          <figure className="dms-screen-figure"><CaseStudyScreen screen={dashboard} /><figcaption>The dashboard design pairs summary cards with distribution charts and a working document table. Numbers shown are interface data, not measures of the project’s impact.</figcaption></figure>
          <div className="dms-dashboard-groups">{[
            ["Activity", "Active users · Viewed · Uploaded · Downloaded", "A concise view of participation and document activity."],
            ["Access", "Total documents", "The document collection available to the user."],
            ["Attention", "Pending approval · Expiring · Overdue", "Separate signals for review work and time-sensitive follow-up."],
          ].map(([label, title, text]) => <div key={label}><span>{label}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
          <div className="train-reading"><p>Unit-wise and category-wise charts add a broader view of the collection. The document table remains below the summary, keeping an overview and the next practical action close together.</p></div>
        </Section>

        <Section id="dms-library" number="04" title="Make a dense library easier to read.">
          <div className="train-reading"><p>The table gives each document enough context to be identified without opening it first. The design groups the file’s identity, its organisational location, and the people and dates behind it.</p></div>
          <div className="train-table-wrap"><table><caption>The information behind a document</caption><thead><tr><th>Information</th><th>Fields</th><th>Why it matters</th></tr></thead><tbody>
            <tr><td>Document identity</td><td>Name, document number, file type</td><td>Recognise the item and distinguish similar files.</td></tr>
            <tr><td>Business context</td><td>Unit, category, subcategory</td><td>Understand where the document belongs.</td></tr>
            <tr><td>Ownership &amp; review</td><td>Uploaded by, approved by</td><td>See who contributed the file and who reviewed it.</td></tr>
            <tr><td>Timing &amp; status</td><td>Upload date, approval status, relevant due and expiry dates</td><td>Check progress and identify items needing attention.</td></tr>
            <tr><td>Available actions</td><td>View, download, review where permitted</td><td>Take the next step from the document’s context.</td></tr>
          </tbody></table></div>
          <div className="train-reading"><h3>Keep the list useful as it grows.</h3><p>Search, category filters, and status controls narrow a large collection into a manageable working list. Clear file-type icons and consistent row alignment help users scan repeated information. Labels carry meaning alongside colour, so status does not depend on colour alone.</p></div>
        </Section>

        <Section id="dms-approval" number="05" title="An upload is the beginning of a review.">
          <div className="train-reading"><p>Team members can upload documents, but a supervisor must check that the correct document has been submitted before approving it. This separates contributing a file from confirming that it is ready for the shared collection.</p><p>The Add Attachment design collects the document’s unit, category, subcategory, reference details, and relevant dates alongside the file itself. Capturing context at upload helps the reviewer understand what the submission is and where it belongs.</p></div>
          <figure className="train-flow dms-review-flow"><ol>{["Choose the unit and category", "Add details and attach the file", "Submit for supervisor review", "Supervisor checks and approves"].map((step) => <li key={step}>{step}</li>)}</ol><figcaption>The core upload-to-approval workflow described for the project.</figcaption></figure>
          <figure className="dms-screen-figure"><CaseStudyScreen screen={workflow} /><figcaption>The supplied design showcase brings together the document list, personal dashboard, and attachment form.</figcaption></figure>
          <div className="dms-design-note"><span>Design principle</span><h3>Show the state, not just the submission.</h3><p>A pending document should be distinguishable from an approved one. The uploader needs to know that the file is awaiting a decision; the supervisor needs a clear queue of items to review.</p></div>
        </Section>

        <Section id="dms-interface" number="06" title="A familiar frame for detailed work.">
          <div className="train-direction-list">{[
            ["A persistent navigation anchor", "The deep red sidebar gives the hierarchy a consistent home. A contrasting active item identifies the current destination as users move between categories."],
            ["An overview before the detail", "Summary cards establish the dashboard hierarchy. Charts explain the collection, and the table supports document-level work."],
            ["Consistent patterns for repeated tasks", "Aligned table fields, labelled filters, clear form labels, and a prominent upload action help connect browsing with contribution."],
            ["Status with a reason to act", "Pending approval, expiring, and overdue are distinct states. Keeping their labels explicit helps users understand whether a document needs review or date-related follow-up."],
          ].map(([title, text], index) => <div key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </Section>

        <Section id="dms-next" number="07" title="Where I would take it next.">
          <p className="train-section-caption">Proposed enhancements to the core document and approval experience.</p>
          <div className="train-evidence-grid">{[
            ["Version history", "Keep previous revisions, identify the current approved version, and make changes easier to trace."],
            ["Review comments", "Let supervisors return a submission with a clear reason and a direct path to upload a correction."],
            ["Timely reminders", "Notify the right person when a review is waiting or a document is approaching expiry."],
          ].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
          <div className="train-reading"><h3>Validate with real document tasks.</h3><p>I would test finding a file in an unfamiliar category, uploading a document with the correct metadata, reviewing a pending submission, and locating an expiring item. Task completion, retrieval time, and classification errors would help assess the design and guide the next iteration.</p></div>
        </Section>

        <Section id="dms-reflection" number="08" title="The file is only part of the experience.">
          <div className="train-reading"><p>This project brought together two needs: the familiarity of a shared drive and the structure of an internal approval system. The important design work was connecting a document with its place, its people, and its status, without losing the everyday simplicity of finding and uploading a file.</p><p>The result is a Figma-designed workspace that brings discovery, contribution, and review into one interface for the team. A next iteration would focus on validating those core tasks and making the review feedback loop more complete.</p></div>
        </Section>
      </article>
    </div>
    <section className="train-ending"><p className="train-eyebrow">Keep exploring</p><h2>On to the next project.</h2><Link href={`/work/${next.slug}`} className="train-next-card"><div><h3>{next.title}</h3><p>{next.summary}</p></div></Link><Link className="train-back" href="/work">All projects</Link></section>
  </main>;
}
