import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

// Fetch the input.docx file
const loadTemplate = async () => {
  const response = await fetch('https://raw.githubusercontent.com/dauspairet/L_Isola/main/template_surat/input.docx');
  const content = await response.arrayBuffer();
  return content;
};

export const generateDocument = async () => {
  const content = await loadTemplate();
  
  // Unzip the content of the file
  const zip = new PizZip(content);
  
  // Parse the template
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  
  // Render the document with the tags replaced by actual data
  doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "+33666666",
    description: "The Acme Product",
  });

  // Generate the document as a Blob (browser-compatible)
  const output = doc.getZip().generate({ type: "blob" });

  // Create a download link and trigger it
  const link = document.createElement('a');
  link.href = URL.createObjectURL(output);
  link.download = "output.docx";
  link.click();
};
