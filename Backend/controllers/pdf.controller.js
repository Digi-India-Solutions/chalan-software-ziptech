import puppeteer from "puppeteer";

const GeneratePdf = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ message: "htmlContent is required" });
    }
    const browser = await puppeteer.launch({
      headless: "new", // Ensures headless mode
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-extensions",
        "--disable-features=site-per-process",
        "--disable-blink-features=AutomationControlled",
      ],
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();
    let filename = `invoice_${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${filename}`);
    return res.end(pdfBuffer);
  } catch (error) {
    console.log("PDF generation error:", error);
    res.status(500).json({ message: "Internal Server Error" ,error:error});
  }
};
export { GeneratePdf };
