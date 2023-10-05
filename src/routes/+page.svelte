<script lang="ts">
	import generatePdf from '$lib/generatePdf';
	import resume from '$lib/resume.json';

	let resumePdf: any = null;

	async function handleGeneratePdf() {
		let pdfDoc = await new generatePdf(resume);
		await pdfDoc.makePdf();
		resumePdf = pdfDoc.doc.output('datauristring');
	}
</script>

<div class="grid grid-cols-2 h-screen">
	<div class="mt-8 ml-6 flex flex-col w-5/6 gap-4 items-center">
		<button class="btn variant-soft-primary" on:click={handleGeneratePdf}>Generate PDF</button>
		<h1 class="h1">{resume.name}</h1>
		<p>{resume.phone} | {resume.email} | {resume.linkedin}</p>
	</div>
	{#if resumePdf}
		<iframe title="Resume" src={resumePdf} class="w-full h-full" />
	{/if}
</div>
