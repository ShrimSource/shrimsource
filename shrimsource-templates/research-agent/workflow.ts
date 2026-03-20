import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Search company info (runs in parallel with scraping)
        { id: "search", tool: "searchCompany" },
        // 2. Scrape website content
        { id: "scrape", tool: "scrapeWebsite", parallel: true, retry: 2, timeoutMs: 10000 },
        // 3. Summarize product based on scraped website content
        { id: "summarize", tool: "summarizeProduct", dependsOn: ["scrape"] },
        // 4. Generate final report using company info and product summary
        { id: "report", tool: "generateReport", dependsOn: ["search", "summarize"] }
    ],
    "research-pipeline"
)
