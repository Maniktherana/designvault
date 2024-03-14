<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
</script>

<div class="h-[100vh]"></div>
<h1 class="font-black text-red-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button
	class="light:backdrop-blur-lg mt-[400px] rounded-lg"
	size="sm"
	variant="default"
	on:click={() => toast('Hello world')}>Show toast</Button
>
<ModeToggle />

<p class="text-muted-foreground">hello</p>
