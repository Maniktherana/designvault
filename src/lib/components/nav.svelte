<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Logo from './logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { fly } from 'svelte/transition';

	let isHovered = false;

	function toggleHover() {
		isHovered = !isHovered;
	}

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
	<a href="/" class="spinner text-muted-foreground transition-colors hover:text-white">
		<Logo classes="h-5 w-5" />
	</a>
	<div class="flex flex-row items-center justify-center">
		<Button variant="default" size="sm">Sign in</Button>
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
