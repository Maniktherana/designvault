<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Logo from './logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import ModeToggle from './mode-toggle.svelte';
	import { IconMailFilled, IconBolt } from '@tabler/icons-svelte';

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
	class={`sticky left-0 right-0 top-0 z-50 flex flex-row items-center justify-between p-3 backdrop-blur-lg ${isScrolledValue ? 'border-b border-b-accent' : ''}`}
>
	<a href="/" class="spinner mr-6 text-muted-foreground transition-colors hover:text-white">
		<Logo classes="h-5 w-5" />
	</a>

	<div class="nav-width flex min-w-0 flex-1 items-center justify-between">
		<div class="flex flex-row items-center justify-center gap-3">
			<a href="/about">
				<Button variant="ghost" size="sm" class="flex gap-1">
					<IconBolt class="hidden md:block" size="20" stroke="1.5" />
					<span>About</span>
				</Button>
			</a>
			<Button variant="ghost" size="sm" class="flex gap-1">
				<IconMailFilled class="hidden md:block" size="20" stroke="1.5" />
				<span>Subscribe</span>
			</Button>
		</div>

		<div class="flex flex-row items-center justify-center gap-3">
			<ModeToggle />
			<Button variant="default" size="ln">Sign in</Button>
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
