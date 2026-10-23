import { productBlogPosts } from "@/lib/product-blog-data";
import { getProductById } from "@/lib/products-data";
const BLOG_INDEX_INTRO = "Practical articles on hospital operations, laboratory workflows, medical education and healthcare software.";
const blogPosts = [
  {
    slug: "ai-revolutionizing-healthcare-workflow-automation-india",
    title: "Where AI can help with hospital paperwork",
    excerpt: "Prescription digitisation is a practical use of AI in a hospital workflow. Its value depends on what happens before and after text is recognised.",
    author: "Amit Kumar Jain",
    authorRole: "Co-Founder & CTO, IQ-Line",
    publishedAt: "2026-03-28",
    readingTime: 3,
    tags: ["AI", "Smart Parcha", "Hospital operations"],
    coverGradient: "from-[#00d4ff]/20 via-transparent to-transparent",
    body: `
A handwritten prescription may be used by several teams during a patient\u2019s visit. If each team re-enters the same information, work is repeated and details can be transcribed differently.

Smart Parcha helps convert handwritten prescriptions into structured digital records. The useful question for a hospital is not simply whether the software can recognise handwriting. It is whether the recognised information can be checked and used in the next stage of work.

Start with a clear review process. Define who checks the output, how corrections are recorded and which systems receive the verified information. Recognition quality should be assessed on representative prescriptions, including difficult handwriting and incomplete images.

Then examine the connected workflow. Laboratory requests, pharmacy work and patient records may need different fields and approval steps. These should be agreed during implementation rather than assumed from a demonstration.

Measure the change in daily work: time spent entering details, the number of corrections and the effort required at each handover. These measures are more useful than a general claim that AI transforms care.

To explore prescription digitisation in your hospital, [book a Smart Parcha demo](/contact-us?product=eprescription).
    `.trim()
  },
  {
    slug: "building-abdm-compliant-digital-health-infrastructure",
    title: "What to plan before a healthcare software rollout",
    excerpt: "A successful rollout needs more than a feature list. It needs a clear plan for daily workflows, connectivity, integration and the people using the system.",
    author: "Ayush Garg",
    authorRole: "Founder and CEO, IQ-Line",
    publishedAt: "2026-04-05",
    readingTime: 4,
    tags: ["Implementation", "Integrations", "ABDM", "Hospital operations"],
    coverGradient: "from-[#7c3aed]/20 via-transparent to-transparent",
    body: `
## Start with the people and the work

Follow a patient registration, a laboratory sample or a report through the current process. Note where information is entered twice, where a handover is unclear and who needs access at each stage. This gives the implementation team a practical starting point.

## Check the operating conditions

Facilities differ in their connectivity, devices and support arrangements. Agree which functions will be available in the proposed deployment and what staff should do during an outage. Test those arrangements before relying on them in daily work.

## Define the integrations

List the systems that need to exchange information and the records each connection will carry. For ABDM-related requirements, ask for the relevant product documentation and the scope of the supported integration. A general company-level statement is not a substitute for this discussion.

## Agree access and review responsibilities

Identify who can view, enter, correct and approve information. Review how access is managed and how activity is recorded. Confirm these details for the actual deployment, including connected third-party systems.

## Prepare for use after launch

Training should follow the tasks each team performs. Agree the support route and review how the system is being used after rollout. Track practical measures such as repeated entry, incomplete records and unresolved support requests.

[Talk to IQ-Line about the workflows and integration requirements of your institution.](/contact-us)
    `.trim()
  }
];
function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
function getLatestBlogPosts(limit = 2) {
  return [...blogPosts].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}
const BLOG_INDEX_INSIGHTS_FILTER = "insights";
function articleLinkText(title) {
  return `Read \u201C${title}\u201D`;
}
function getBlogIndexItems() {
  const companyItems = blogPosts.map((post) => ({
    key: `insight-${post.slug}`,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    authorRole: post.authorRole,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    tags: post.tags,
    href: `/blog/${post.slug}`,
    filter: BLOG_INDEX_INSIGHTS_FILTER,
    coverGradient: post.coverGradient,
    linkText: articleLinkText(post.title)
  }));
  const productItems = productBlogPosts.map((post) => {
    const product = getProductById(post.productId);
    return {
      key: `${post.productId}-${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      authorRole: post.authorRole,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      tags: post.tags,
      href: `/products/${post.productId}/blog/${post.slug}`,
      filter: post.productId,
      productTitle: product?.title,
      coverGradient: product?.gradient ?? "from-primary/20 via-transparent to-transparent",
      linkText: articleLinkText(post.title)
    };
  });
  return [...companyItems, ...productItems].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );
}
export {
  BLOG_INDEX_INSIGHTS_FILTER,
  BLOG_INDEX_INTRO,
  blogPosts,
  getBlogIndexItems,
  getBlogPostBySlug,
  getLatestBlogPosts
};
