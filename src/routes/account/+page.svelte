<script lang="ts">
	import type { PageData } from './$types';

	import { route } from '$lib/ROUTES';
	import * as Form from '$lib/components/ui/form';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { IconAlertTriangle } from '@tabler/icons-svelte';

	export let data: PageData;

	const { loggedInUser, isSubscribed } = data;
	const nameInitial = loggedInUser.name?.charAt(0).toUpperCase();
	const emailInitial = loggedInUser.email.charAt(0).toUpperCase();
</script>

<div class="max-width relative mx-auto pt-5">
	<section class="flex flex-row items-center justify-center gap-5">
		<Avatar.Root class="size-20">
			<Avatar.Image src={loggedInUser.avatarUrl} alt="User Avatar" />
			<Avatar.Fallback class="text-5xl">
				{nameInitial || emailInitial}
			</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col items-center justify-start gap-3 md:items-start">
			<h1 class="text-xl">
				Hi, <span class="text-3xl">{loggedInUser.name || loggedInUser.email}</span>
				{loggedInUser.admin ? '(admin)' : ''}
			</h1>
		</div>
	</section>
	<div class="shine-sm absolute inset-0 -z-10 md:hidden"></div>

	<div
		class="mx-auto my-8 h-[2px] max-w-screen-2xl bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
	></div>
</div>

<section class="max-width mx-auto mt-4 px-5">
	<h2 class="text-left text-xl font-light">Accout Settings</h2>
	<p class="mt-1 font-mono text-sm text-muted-foreground">Update your account settings.</p>
	<hr class="my-4" />
	<div class="flex flex-col items-center justify-center gap-3">
		<Card.Root class="w-full max-w-screen-sm bg-background">
			<Card.Content class="flex flex-row items-center justify-between p-5">
				<div class="flex flex-col">
					<h3 class="text-lg text-foreground">Newsletter</h3>
					<p class="font-mono text-xs text-muted-foreground">Update email preferences</p>
				</div>
				<form method="POST" action={route('toggleSubscription /account')}>
					<Form.Button variant="default">{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Form.Button>
				</form>
			</Card.Content>
		</Card.Root>
		<Card.Root class="w-full max-w-screen-sm bg-background">
			<Card.Content class="flex flex-row items-center justify-between p-5">
				<div class="flex flex-col">
					<h3 class="text-lg text-foreground">Logout</h3>
					<p class="font-mono text-xs text-muted-foreground">Logout from Design Vault</p>
				</div>
				<form method="POST" action={route('logout /account')}>
					<Form.Button
						variant="default"
						class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
						>Logout</Form.Button
					>
				</form>
			</Card.Content>
		</Card.Root>
		<Card.Root class="w-full max-w-screen-sm bg-background">
			<Card.Content class="flex flex-row items-center justify-between gap-5 p-5">
				<div class="flex flex-col">
					<h3 class="text-lg text-foreground">Delete your account</h3>
					<p class="font-mono text-xs text-muted-foreground">
						Permanently delete all data associated with this account
					</p>
				</div>
				<form method="POST" action={route('deleteUser /account')}>
					<Form.Button
						variant="default"
						class="gap-3 text-destructive hover:bg-destructive hover:text-destructive-foreground"
					>
						<IconAlertTriangle size="20" stroke="1.5" />
						Delete Account</Form.Button
					>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</section>

<section class="max-width mx-auto mt-4 px-5">
	<h2 class="text-left text-xl font-light">Saved desings</h2>
	<p class="mt-1 font-mono text-sm text-muted-foreground">View your saved designs</p>
	<hr class="my-4" />
</section>
