<script lang="ts">
	import img1 from '$lib/assets/images/img1.png';
	import img2 from '$lib/assets/images/img2.png';
	import img3 from '$lib/assets/images/img3.png';
	import img4 from '$lib/assets/images/img4.png';
	import img5 from '$lib/assets/images/img5.png';
	import img6 from '$lib/assets/images/img6.png';

	import Marquee from '$lib/components/marquee.svelte';
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from '../$types';
	import EmailForm from '../email-form.svelte';

	export let data: PageData;
</script>

<div
	class="relative flex h-dvh w-full items-center justify-center bg-background bg-grid-black/[0.16] dark:bg-grid-white/[0.1]"
>
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_bottom,transparent,black)]"
	></div>
	<div
		class="z-[999] m-5 mt-[-10rem] flex w-full max-w-screen-sm flex-col items-center justify-center gap-10 rounded-xl border border-muted-foreground/30 bg-background/30 px-5 py-10 text-center backdrop-blur-xl"
	>
		<Marquee direction="left" fade={true} reverse={false}>
			<img src={img1} alt="img1" class="h-32" />
			<img src={img2} alt="img2" class="h-32" />
			<img src={img3} alt="img3" class="h-32" />
			<img src={img4} alt="img4" class="h-32" />
			<img src={img5} alt="img5" class="h-32" />
			<img src={img6} alt="img6" class="h-32" />
		</Marquee>

		<div class="flex w-full flex-row items-center justify-center gap-3">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30">
				<Logo classes="h-6 w-6 text-white" />
			</div>
			<p class="text-2xl text-foreground">Subscribe to Design Vault</p>
		</div>

		<p class="font-mono text-muted-foreground">
			Get top picks once a month on the first of every month.
		</p>

		<EmailForm data={data.form} />
	</div>
	<div class="shine-lg absolute inset-0"></div>
</div>
