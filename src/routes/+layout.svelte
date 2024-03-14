<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Nav from '$lib/components/nav.svelte';
</script>

<ModeWatcher />
<Toaster />
<Nav />
<slot />
<div class="gradient-bg"></div>

<style>
	.gradient-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 20vh;
		pointer-events: none;
		background: linear-gradient(
			rgba(18, 134, 251, 0.2) 0%,
			rgba(21, 237, 212, 0.1) 50%,
			rgba(21, 154, 237, 0) 100%
		);
	}
</style>
