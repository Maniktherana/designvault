<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Logo from './logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import ModeToggle from './mode-toggle.svelte';
	import { IconMailFilled, IconBolt } from '@tabler/icons-svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let isScrolled = writable(false);

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleScroll() {
		isScrolled.set(window.scrollY > 0);
	}

	let isScrolledValue = false;
	isScrolled.subscribe((value) => {
		isScrolledValue = value;
	});
</script>

<nav
	class={`sticky left-0 right-0 top-0 z-50 flex flex-row items-center justify-between bg-background/70 p-3 backdrop-blur-lg ${isScrolledValue ? 'border-b border-b-muted' : ''}`}
>
	<a
		href="/"
		class="spinner mr-4 text-muted-foreground transition-colors dark:hover:text-white md:mr-6"
	>
		<Logo classes="h-5 w-5" />
	</a>

	<div class="nav-width flex min-w-0 flex-1 items-center justify-between font-mono">
		<div class="flex flex-row items-center justify-center gap-3">
			<Button href="/" variant="ghost" size="sm" class="hidden gap-1 md:flex">
				<Logo classes="h-5 w-5" />
				<span>Vault</span>
			</Button>
			<Button href="/about" variant="ghost" size="sm" class="flex gap-1">
				<IconBolt size="20" stroke="1.5" />
				<span class="hidden md:block">About</span>
			</Button>

			<Sheet.Root>
				<Sheet.Trigger>
					<Button variant="ghost" size="sm" class="flex gap-1">
						<IconMailFilled size="20" stroke="1.5" />
						<span class="hidden md:block">Subscribe</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content
					side="bottom"
					class="max-width mx-5 my-5 h-[20vh] rounded-xl border border-muted-foreground/30 bg-muted/30 text-center backdrop-blur-xl md:mx-auto"
				>
					<Sheet.Header>
						<Sheet.Description>
							<div class="flex w-full flex-col items-center justify-center gap-3">
								<div class="flex w-full flex-row items-center justify-center gap-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30"
									>
										<Logo classes="h-6 w-6 text-white" />
									</div>
									<p class="text-lg text-foreground">Subscribe to Design Vault</p>
								</div>
								<p class="text-sm text-muted-foreground">No Spam. New designs every month.</p>
							</div>
						</Sheet.Description>
					</Sheet.Header>
				</Sheet.Content>
			</Sheet.Root>
		</div>

		<div class="flex flex-row items-center justify-center gap-3">
			<!-- <ModeToggle /> -->
			<Button href="/login" variant="default" size="ln">Sign in</Button>
		</div>
	</div>
</nav>

<style>
	.spinner {
		transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.spinner:hover {
		transform: rotate(360deg);
	}
</style>
