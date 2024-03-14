<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Logo from './logo.svelte';

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
	class={`sticky left-0 right-0 top-0 z-50 ${isScrolledValue ? 'border-b border-b-accent' : ''}`}
>
	<Logo pathClass="text-muted-foreground hover:text-white" classes="h-8 w-8" />
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		/* transition: border-bottom 0.3s; */
	}
	.scrolled {
		border-bottom: 2px solid black;
	}
</style>
