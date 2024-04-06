<script lang="ts">
	import type { PageData } from './$types';

	import { route } from '$lib/ROUTES';
	import * as Form from '$lib/components/ui/form';

	export let data: PageData;
</script>

<div class="max-width mx-auto">
	<section>
		<h1 class="mb-5 text-2xl">
			Hi, <span class="font-bold">{data.loggedInUserName}</span>
		</h1>

		<form method="POST" action={route('logout /account')}>
			<Form.Button>Logout</Form.Button>
		</form>
	</section>

	<hr class="my-8" />

	<section class="mt-4 max-w-md"></section>
</div>
