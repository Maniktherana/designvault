<script lang="ts">
	import type { PageData } from './$types';

	import { route } from '$lib/ROUTES';
	import * as Form from '$lib/components/ui/form';
	import * as Avatar from '$lib/components/ui/avatar';
	import { IconAlertTriangle } from '@tabler/icons-svelte';

	export let data: PageData;

	const { loggedInUser } = data;
	const nameInitial = loggedInUser.name?.charAt(0).toUpperCase();
	const emailInitial = loggedInUser.email.charAt(0).toUpperCase();
</script>

<div class="max-width relative mx-auto pt-5">
	<section class="flex flex-col items-center justify-start gap-5 md:flex-row">
		<Avatar.Root class="size-20">
			<Avatar.Image src={loggedInUser.avatarUrl} alt="User Avatar" />
			<Avatar.Fallback class="text-5xl">
				{nameInitial || emailInitial}
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col items-center justify-start gap-3 md:items-start">
			<h1 class="text-xl">
				Hi, <span class="text-3xl">{loggedInUser.name || loggedInUser.email}</span>
				{loggedInUser.admin && '(admin)'}
			</h1>
			<div class="flex flex-row items-center justify-start gap-3">
				<form method="POST" action={route('logout /account')}>
					<Form.Button
						size="ln"
						variant="default"
						class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
						>Logout</Form.Button
					>
				</form>
				<form method="POST" action={route('deleteUser /account')}>
					<Form.Button
						size="ln"
						variant="default"
						class="gap-3 text-destructive hover:bg-destructive hover:text-destructive-foreground"
					>
						<IconAlertTriangle size="20" stroke="1.5" />
						Delete Account</Form.Button
					>
				</form>
			</div>
		</div>
	</section>
	<div class="shine-sm absolute inset-0 -z-10 md:hidden"></div>

	<div
		class="mx-auto my-8 h-[2px] max-w-screen-2xl bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
	></div>
</div>

<section class="max-width mx-auto mt-4 px-5">
	<h2 class="text-left text-2xl font-light">Saved desings</h2>
</section>
