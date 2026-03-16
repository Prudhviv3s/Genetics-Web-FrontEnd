import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from a DOM element.
 * @param elementId The ID of the HTML element to capture.
 * @param fileName The name of the PDF file to save.
 */
export const generatePDFFromElement = async (element: HTMLElement, fileName: string) => {
    try {
        const canvas = await html2canvas(element, {
            scale: 1.5, // Reduced scale for better compatibility with complex layouts
            useCORS: true,
            allowTaint: true, // Help with cross-origin images if useCORS fails
            logging: true, // Enable logging for debugging during this phase
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG with slightly lower quality for smaller size/better performance
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        return false;
    }
};
