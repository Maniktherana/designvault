<script lang="ts">
	import img1 from '$lib/assets/images/img1.png';
	import img2 from '$lib/assets/images/img2.png';
	import img3 from '$lib/assets/images/img3.png';
	import img4 from '$lib/assets/images/img4.png';
	import img5 from '$lib/assets/images/img5.png';
	import img6 from '$lib/assets/images/img6.png';

	import { IconMailFilled } from '@tabler/icons-svelte';
	import Logo from '$lib/components/logo.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';

	import type { PageData } from './$types.js';
	import EmailForm from './email-form.svelte';
	import Websites from '$lib/components/websites.svelte';
	import Marquee from '$lib/components/marquee.svelte';
	export let data: PageData;

	const images = [img1, img2, img3, img4, img5, img6];
	images.sort(() => Math.random() - 0.5);
</script>

<section
	class="relative mx-auto flex h-[40vh] w-full items-center justify-center bg-background bg-grid-black/[0.16] dark:bg-grid-white/[0.1]"
>
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_bottom,transparent,black)]"
	></div>
	<div class="shine-sm absolute inset-0 md:hidden"></div>
	<div class="shine-lg absolute inset-0 hidden md:block"></div>
	<div
		class="max-width z-40 mx-auto flex flex-col items-center justify-center gap-5 px-5 pt-[3rem]"
	>
		<h1 class="text-center text-4xl text-foreground/80 md:text-6xl">
			A Vault for the Best Designs on the Web
		</h1>
		<p class="mt-6 text-center font-mono text-muted-foreground">
			Design vault curates the best designs on the web. New websites every day.
		</p>

		<Sheet.Root>
			<Sheet.Trigger>
				<Button variant="default" size="default" class="flex gap-3 rounded-lg bg-transparent">
					<IconMailFilled size="24" stroke="1.5" />
					<span class="text-lg">Subscribe</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content
				side="bottom"
				class="mx-5 my-5 min-h-[25vh] max-w-screen-sm rounded-xl border border-muted-foreground/30 bg-background/70 text-center backdrop-blur-lg md:mx-auto"
			>
				<Sheet.Header>
					<Sheet.Description>
						<div class="flex w-full flex-col items-center justify-center gap-5">
							<Marquee direction="left" fade={true} reverse={false}>
								{#each images as image, idx}
									<img src={image} alt={`${image}${idx}`} class="h-32" />
								{/each}
							</Marquee>

							<div class="flex w-full flex-row items-center justify-center gap-3">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30"
								>
									<Logo classes="h-6 w-6 text-white" />
								</div>
								<p class="text-2xl text-foreground">Subscribe to Design Vault</p>
							</div>

							<p class="font-mono">Get top picks once a month on the first of every month.</p>

							<EmailForm data={data.form} />
						</div>
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</section>
<div
	class="z-10 mx-auto h-[2px] max-w-screen-2xl bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
></div>

<div class="z-10">
	<Websites posts={data.posts} />
</div>
