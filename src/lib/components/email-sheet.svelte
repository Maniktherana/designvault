<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconMailFilled } from '@tabler/icons-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Logo from '$lib/components/logo.svelte';
	import type { PageData } from '../../routes/$types';
	import EmailForm from '../../routes/email-form.svelte';

	export let data: PageData;
	export const small = true;
</script>

<Sheet.Root>
	<Sheet.Trigger>
		{#if small}
			<Button variant="ghost" size="sm" class="flex gap-1">
				<IconMailFilled size="20" stroke="1.5" />
				<span class="hidden md:block">Subscribe</span>
			</Button>
		{:else}
			<Button variant="default" size="default" class="flex gap-3 bg-transparent">
				<IconMailFilled size="24" stroke="1.5" />
				<span class="text-lg">Subscribe</span>
			</Button>
		{/if}
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
