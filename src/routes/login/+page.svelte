<script>
	import { route } from '$lib/ROUTES';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { IconBrandGoogle } from '@tabler/icons-svelte';
</script>

<div
	class="relative flex h-screen w-full items-center justify-center bg-background bg-grid-black/[0.16] dark:bg-grid-white/[0.1]"
>
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_bottom,transparent,black)]"
	></div>
	<div
		class="z-[999] m-5 mt-[-10rem] flex min-h-[10vh] w-[400px] flex-col items-center justify-center gap-10 rounded-xl border border-muted-foreground/30 bg-muted/30 px-5 py-10 text-center backdrop-blur-xl"
	>
		<div class=" flex w-full flex-row items-center justify-center gap-3">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/30">
				<Logo classes="h-6 w-6 text-white" />
			</div>
			<p class="text-lg text-foreground">Sign in to Design Vault</p>
		</div>
		<Button
			variant="default"
			size="lg"
			class="gap-3 rounded-lg font-mono"
			href={route('GET /login/google')}
		>
			<IconBrandGoogle size="20" stroke="1.5" />
			<span>Sign in with Google</span>
		</Button>
	</div>
	<div class="shine-lg absolute inset-0"></div>
</div>
