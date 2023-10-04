<script lang="ts">
	import generatePdf from '$lib/generatePdf';
	import resume from '$lib/resume.json';
</script>

<div>
	<button on:click={generatePdf}>Generate PDF</button>
</div>
