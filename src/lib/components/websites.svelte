<script lang="ts">
	import type { PostSelectSchema } from '$lib/server/schema';
	import { IconArrowUpRight, IconBookmark } from '@tabler/icons-svelte';
	import Button from './ui/button/button.svelte';

	export let posts: PostSelectSchema[];
</script>

<div class="mx-5 my-10 grid grid-cols-1 gap-x-3 gap-y-5 lg:grid-cols-3 xl:grid-cols-4">
	{#each posts as post}
		<div class="flex flex-col items-center justify-center gap-1">
			<a href={post.websiteUrl} target="_blank">
				<img src={post.imageUrl} alt={post.name} class="h-auto min-h-[150px] w-full lg:w-[400px]" />
			</a>
			<div class="flex w-full flex-row items-center justify-between gap-3 font-mono">
				<div class="flex flex-row gap-3 text-foreground">
					<h2 class="text-xs">
						<a href={post.websiteUrl} target="_blank">
							{post.name}
						</a>
					</h2>
					<p class="text-xs text-muted-foreground">{post.mainTag}</p>
				</div>
				<div class="flex flex-row gap-1">
					<Button variant="ghost" size="icon">
						<IconBookmark size="20" stroke="1.5" />
					</Button>
					<Button href={post.websiteUrl} target="_blank" variant="ghost" size="icon">
						<IconArrowUpRight size="20" stroke="1.5" />
					</Button>
				</div>
			</div>
		</div>
	{/each}
</div>
