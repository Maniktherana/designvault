<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { IconSunHigh, IconMoon } from '@tabler/icons-svelte';

	import { toggleMode } from 'mode-watcher';
</script>

<Button on:click={toggleMode} variant="ghost" size="sm">
	<IconSunHigh
		stroke="1.5"
		size="20"
		class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<IconMoon
		stroke="1.5"
		size="20"
		class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
