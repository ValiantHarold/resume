import { jsPDF } from 'jspdf';
import Crimson from './fonts.json';

class generatePdf {
	doc: jsPDF;
	resume: any;
	pageWidth: number;
	pageHeight: number;
	marginX: number;
	spacing: number;
	addSpace: number;
	yPos: number;
	text: string;

	constructor(resume: any) {
		this.doc = new jsPDF({ unit: 'in' });
		this.resume = resume;
		this.pageWidth = this.doc.internal.pageSize.getWidth();
		this.pageHeight = this.doc.internal.pageSize.getHeight();
		this.marginX = 0.75;
		this.spacing = 12 / 72;
		this.addSpace = 10 / 72;
		this.yPos = 0.5;
		this.text = '';
	}

	async makePdf(): Promise<void> {
		await this.loadFonts();
		await this.setDefaults();
		await this.header();
		await this.education();
		await this.tools();
	}

	loadFonts() {
		// https://fonts.google.com/specimen/Crimson+Text/about?query=Crimson+Text
		this.doc.addFileToVFS('Crimson-normal.ttf', Crimson.normal);
		this.doc.addFont('Crimson-normal.ttf', 'Crimson', 'normal');
		this.doc.addFileToVFS('Crimson-bold.ttf', Crimson.bold);
		this.doc.addFont('Crimson-bold.ttf', 'Crimson', 'bold');
		this.doc.addFileToVFS('Crimson-italic.ttf', Crimson.italic);
		this.doc.addFont('Crimson-italic.ttf', 'Crimson', 'italic');
	}

	setDefaults() {
		this.doc.setLineHeightFactor(1);
		this.doc.setLineWidth(1 / 72);
	}

	header() {
		this.doc.setFont('Crimson', 'bold');
		this.doc.setFontSize(20);

		this.text = this.resume.name;
		let textWidth = this.doc.getTextWidth(this.text);
		let xPos = (this.pageWidth - textWidth) / 2;

		this.doc.text(this.text, xPos, this.yPos);

		this.yPos += this.spacing;

		this.doc.setFont('Crimson', 'normal');
		this.doc.setFontSize(12);

		this.text = `${this.resume.phone} | ${this.resume.email} | ${this.resume.linkedin}`;
		textWidth = this.doc.getTextWidth(this.text);
		xPos = (this.pageWidth - textWidth) / 2;

		this.doc.text(this.text, xPos, this.yPos);

		this.yPos += this.spacing;
	}

	education() {
		this.doc.setFont('Crimson', 'bold');

		this.yPos += this.addSpace;
		this.text = 'Education';
		this.doc.text(this.text, this.marginX, this.yPos);
		this.yPos += this.spacing / 4;

		this.doc.line(this.marginX, this.yPos, this.pageWidth - this.marginX, this.yPos);
		this.yPos += this.spacing;

		this.doc.setFont('Crimson', 'italic');

		const edu = this.resume.education;
		this.text = `${edu.degree} | ${edu.university} | ${edu.location}`;
		this.doc.text(this.text, this.marginX, this.yPos);

		this.text = edu.duration;
		this.doc.text(this.text, this.pageWidth - this.marginX, this.yPos, { align: 'right' });
		this.yPos += this.spacing;

		this.doc.setFont('Crimson', 'normal');
		this.text = `GPA - ${edu.gpa}`;
		this.doc.text(this.text, this.pageWidth - this.marginX, this.yPos, { align: 'right' });

		edu.certificates.forEach((certificate: string) => {
			this.doc.text('•', this.marginX + 0.25, this.yPos);
			this.doc.text(certificate, this.marginX + 0.4, this.yPos);
			this.yPos += this.spacing;
		});
	}

	tools() {
		this.doc.setFont('Crimson', 'bold');

		this.yPos += this.addSpace;
		this.text = 'Tools';
		this.doc.text(this.text, this.marginX, this.yPos);
		this.yPos += this.spacing / 4;

		this.doc.line(this.marginX, this.yPos, this.pageWidth - this.marginX, this.yPos);
		this.yPos += this.spacing;

		this.doc.setFont('Crimson', 'normal');
		const row = Math.ceil(this.resume.tools.length / 4);
		const yTemp = this.yPos;
		let xTemp = this.marginX;
		let i = 0;
		this.resume.tools.forEach((tool: string) => {
			this.doc.text('•', xTemp + 0.25, this.yPos);
			this.doc.text(tool, xTemp + 0.4, this.yPos);
			this.yPos += this.spacing;

			if (i % row == row - 1) {
				xTemp += (this.pageWidth - this.marginX - 0.25) / 4;
				this.yPos = yTemp;
			}

			i += 1;
		});
	}
}

export default generatePdf;
