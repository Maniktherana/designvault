<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from '../$types';
	import EmailForm from '../email-form.svelte';

	export let data: PageData;
</script>

<div
	class="relative flex h-screen w-full items-center justify-center bg-background bg-grid-black/[0.16] dark:bg-grid-white/[0.1]"
>
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_bottom,transparent,black)]"
	></div>
	<div
		class="z-[999] m-5 mt-[-10rem] flex w-full max-w-screen-sm flex-col items-center justify-center gap-10 rounded-xl border border-muted-foreground/30 bg-muted/30 px-5 py-10 text-center backdrop-blur-xl"
	>
		<div class="flex w-full max-w-[500px] flex-row justify-start gap-3">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30">
				<Logo classes="h-6 w-6 text-white" />
			</div>
			<p class="text-lg text-foreground">Subscribe to Design Vault</p>
		</div>
		<EmailForm data={data.form} />
	</div>
	<div class="shine-lg absolute inset-0"></div>
</div>
