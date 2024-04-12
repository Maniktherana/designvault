<script lang="ts">
	import extend from 'just-extend';
	import { toast } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { MetaTags } from 'svelte-meta-tags';
	import { getFlash } from 'sveltekit-flash-message';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import Nav from '$lib/components/nav.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.pcss';

	import { page } from '$app/stores';

	export let data;

	const flash = getFlash(page);

	$: if ($flash) {
		toast.info($flash.message);
	}

	setupViewTransition();

	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
	$: isUserLoggedIn = data.isUserLoggedIn;
</script>

<MetaTags {...metaTags} />
<ModeWatcher />
<Toaster richColors closeButton position="top-center" />
<Nav {isUserLoggedIn} />
<slot />
<div class="bottom"></div>

<style>
	.bottom {
		height: 120px;
		width: 100dvw;
		background: linear-gradient(180deg, #00000000 0%, #131416 100%);
		position: sticky;
		overflow: hidden;
		pointer-events: none;
		user-select: none;
		bottom: 0;
		z-index: 10;
	}
</style>
