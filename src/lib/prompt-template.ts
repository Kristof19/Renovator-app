export interface PromptInputs {
  industry: string;
  colors?: string;
  oldHtml: string;
}

export const generateRenovationPrompt = ({ industry, colors, oldHtml }: PromptInputs): string => {
  return `
**Role:**
Act as a Senior Frontend Developer and UI/UX Designer specializing in high-conversion websites for local businesses.

**Context:**
I am redesigning an outdated website for a local business operating in the ${industry} industry. The goal is to modernize the brand, improve user experience, and increase lead generation (phone calls/contact forms).

**Input Data:**
I will provide the existing content (text and structure) below.

**Technical Constraints (Stack):**
1. **Structure:** Single HTML5 file (if possible) or clearly separated HTML/CSS/JS.
2. **Styling:** Use Tailwind CSS via CDN (script tag) for rapid, modern styling. Do not write custom raw CSS unless necessary for animations.
3. **Interactivity:** Use Vanilla JavaScript (no heavy frameworks like React/Angular).
4. **Responsiveness:** Mobile-first approach is mandatory. The site must look perfect on smartphones.
5. **Assets:** Use placeholders from Unsplash (source.unsplash.com) for images, with keywords relevant to the industry.

**Design Requirements:**
1. **Aesthetic:** Clean, professional, trustworthy, and modern. Use plenty of whitespace.
2. **Color Palette:** ${colors ? `Use the following colors: ${colors}` : `Derive a professional color scheme based on the industry (e.g., Blue/Grey for corporate, Green/Earth for landscaping).`}
3. **Typography:** Use modern Google Fonts (e.g., Inter, Roboto, or Poppins).
4. **Components:**
   * **Sticky Header:** With clear navigation and a highlighted "Call Now" or "Get Quote" button.
   * **Hero Section:** High-impact headline, subheadline, and a primary Call-to-Action (CTA) button.
   * **Services Grid:** A clean layout utilizing cards/icons to showcase services.
   * **Social Proof:** A section for testimonials/reviews to build trust.
   * **Footer:** Including contact info, address, map placeholder, and copyright.

**Content Rules:**
* **Strictly keep the original text content provided below.** Do not summarize or delete information, but you may reorganize it to fit the new layout better.
* You may add conversion-focused headlines (e.g., "Ready to get started?") if they are missing.

**Task:**
Generate the complete, production-ready code (HTML/Tailwind/JS) for the homepage redesign based on the content provided below.

---
**EXISTING CONTENT:**
${oldHtml}
`;
};
