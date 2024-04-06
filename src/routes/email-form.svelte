<script lang="ts">
	import AnimatedSpinner from '$lib/components/animated-spinner.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<form
	method="POST"
	use:enhance
	class="mt-5 flex w-full max-w-screen-lg flex-col items-center justify-center gap-2 font-mono"
>
	<Form.Field {form} name="email" class="flex w-full max-w-[500px] flex-col">
		<Form.Control let:attrs>
			<Form.Label class="text-left">Email</Form.Label>
			<div class="flex w-full flex-row items-center justify-center gap-3">
				<Input
					{...attrs}
					bind:value={$formData.email}
					class="w-full rounded-lg focus-visible:ring-1 focus-visible:ring-muted-foreground"
				/>
				<Form.Button
					variant="default"
					disabled={$submitting || $delayed}
					aria-disabled={$submitting || $delayed}
					class="w-[200px] rounded-lg disabled:pointer-events-none disabled:opacity-50"
				>
					{#if $submitting || $delayed}
						<AnimatedSpinner className="w-6 h-6 mr-4" />
					{/if}
					Submit
				</Form.Button>
			</div>
			<Form.FieldErrors />
		</Form.Control>
		<Form.Description class="text-left text-xs text-muted-foreground"
			>No Spam. Just great designs every month.</Form.Description
		>
	</Form.Field>
</form>
