import pdf from "html-pdf-node";

const GeneratePdf = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ message: "htmlContent is required" });
    }

    const options = { format: "A4" };
    const file = { content: htmlContent };

    const pdfBuffer = await pdf.generatePdf(file, options);

    let filename = `invoice_${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${filename}`);
    return res.end(pdfBuffer);
  } catch (error) {
    console.log("PDF generation error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { GeneratePdf };
