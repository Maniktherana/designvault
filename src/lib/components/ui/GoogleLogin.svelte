<script>
	import { route } from '$lib/ROUTES';

	import Button from './ui/button/button.svelte';
</script>

<div
	class="max-width m-5 flex min-h-24 flex-col items-center justify-start rounded-xl border border-muted-foreground/30 bg-muted/30 text-center backdrop-blur-xl md:mx-auto"
>
	<Button class="flex-grow gap-2 font-bold " href={route('GET /login/google')}>
		<iconify-icon icon="mdi:google" width="25"></iconify-icon>
		<span>Google</span>
	</Button>
</div>
