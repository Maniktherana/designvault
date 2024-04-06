<script lang="ts">
	import type { PageData } from './$types';

	import { route } from '$lib/ROUTES';
	import * as Form from '$lib/components/ui/form';
	import * as Avatar from '$lib/components/ui/avatar';

	export let data: PageData;

	const { loggedInUser } = data;
	const nameInitial = loggedInUser.name?.charAt(0).toUpperCase();
	const emailInitial = loggedInUser.email.charAt(0).toUpperCase();
</script>

<div class="max-width mx-auto">
	<section>
		<Avatar.Root class="size-20">
			<Avatar.Image src={loggedInUser.avatarUrl} alt="User Avatar" />
			<Avatar.Fallback class="text-5xl">
				{nameInitial || emailInitial}
			</Avatar.Fallback>
		</Avatar.Root>
		<h1 class="mb-5 text-2xl">
			Hi, <span class="font-bold">{loggedInUser.name || loggedInUser.email}</span>
		</h1>

		<form method="POST" action={route('logout /account')}>
			<Form.Button>Logout</Form.Button>
		</form>
		<form method="POST" action={route('deleteUser /account')}>
			<Form.Button>Delete Account</Form.Button>
		</form>
	</section>

	<hr class="my-8" />

	<section class="mt-4 max-w-md"></section>
</div>
