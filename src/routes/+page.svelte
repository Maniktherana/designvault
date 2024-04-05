<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconMailFilled } from '@tabler/icons-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { toast } from 'svelte-sonner';
	import Logo from '$lib/components/logo.svelte';

	import type { PageData } from './$types.js';
	import EmailForm from './email-form.svelte';
	export let data: PageData;
</script>

<div
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
				<Button variant="default" size="default" class="flex gap-3 bg-transparent">
					<IconMailFilled size="24" stroke="1.5" />
					<span class="text-lg">Subscribe</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content
				side="bottom"
				class="max-width mx-5 my-5 h-[25vh] rounded-xl border border-muted-foreground/30 bg-muted/30 text-center backdrop-blur-xl md:mx-auto"
			>
				<Sheet.Header>
					<Sheet.Description>
						<div class="flex w-full flex-col items-center justify-center gap-5">
							<div class="flex w-full flex-row items-center justify-center gap-3">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30"
								>
									<Logo classes="h-6 w-6 text-white" />
								</div>
								<p class="text-lg text-foreground">Subscribe to Design Vault</p>
							</div>
							<EmailForm data={data.form} />
						</div>
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</div>
<div
	class="z-10 mx-auto h-[2px] max-w-screen-2xl bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
></div>

<div class="z-10 h-screen"></div>

<style>
	.shine-sm {
		background-image: radial-gradient(
			200px 200px at 50% 100%,
			#2d2f337b 20%,
			rgba(40, 41, 45, 0) 100%
		);
	}
	.shine-lg {
		background-image: radial-gradient(
			500px 200px at 50% 100%,
			#2d2f337b 20%,
			rgba(40, 41, 45, 0) 100%
		);
	}
</style>
