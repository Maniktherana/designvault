<script>
	import { cn } from '$lib/utils';
	/**
	 * @type {string}
	 */
	export let className;
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class={className}>
	<g class="animated-spinner">
		<rect x="11" y="1" width="2" height="5" opacity=".14" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
		<rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
	</g>
</svg>
