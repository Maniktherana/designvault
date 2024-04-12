<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import AnimatedSpinner from '$lib/components/animated-spinner.svelte';

	import { formSchema, type FormSchema } from './schema';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, submitting, delayed } = form;
</script>

<form
	method="POST"
	use:enhance
	class="flex w-full max-w-screen-sm flex-col items-center justify-center gap-2 font-mono"
>
	<Form.Field {form} name="email" class="flex w-full max-w-[500px] flex-col">
		<Form.Control let:attrs>
			<Form.Label class="text-left">Email</Form.Label>
			<div class="flex w-full flex-col items-center justify-center gap-3">
				<Input
					{...attrs}
					bind:value={$formData.email}
					autofocus={false}
					class="w-full rounded-lg text-[16px] focus-visible:ring-1 focus-visible:ring-muted-foreground"
				/>
				<Form.Button
					variant="default"
					disabled={$submitting || $delayed}
					aria-disabled={$submitting || $delayed}
					class="w-full rounded-lg bg-muted-foreground text-black hover:bg-muted-foreground/70 disabled:pointer-events-none disabled:opacity-50"
				>
					{#if $submitting || $delayed}
						<AnimatedSpinner className="w-6 h-6 mr-4" />
					{/if}
					Submit
				</Form.Button>
			</div>
			<Form.FieldErrors class="text-left" />
		</Form.Control>
		<Form.Description class="text-center text-xs text-muted-foreground"
			>No Spam. Just great designs.</Form.Description
		>
	</Form.Field>
</form>
