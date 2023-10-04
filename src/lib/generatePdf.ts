// import PdfPrinter from 'pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// https://fonts.google.com/specimen/Crimson+Text/about?query=Crimson+Text

// pdfMake.fonts = {
// 	Crimson: {
// 		normal: 'CrimsonText-Regular.ttf',
// 		bold: 'CrimsonText-Bold.ttf',
// 		italics: 'CrimsonText-Italic.ttf',
// 		bolditalics: 'CrimsonText-BoldItalic.ttf'
// 	}
// };
pdfMake.fonts = {
	Roboto: {
		normal: 'Roboto-Regular.ttf',
		bold: 'Roboto-Bold.ttf',
		italics: 'Roboto-Italic.ttf',
		bolditalics: 'Roboto-BoldItalic.ttf'
	}
};

function generatePdf() {
	const docDefinition: TDocumentDefinitions = {
		content: ['Hello, World!'],
		defaultStyle: {
			font: 'Roboto'
		}
	};

	try {
		pdfMake.createPdf(docDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).open();
	} catch (error) {
		console.error('Error generating PDF:', error);
	}
}

export default generatePdf;
