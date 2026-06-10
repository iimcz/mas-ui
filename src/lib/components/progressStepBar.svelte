<script module lang="ts">
    export interface ProgressStep {
        name: string;
        href: string;
    }
</script>

<script lang="ts">
    import { stringFormat } from "$lib/util/stringFormat";
    import Fa from "svelte-fa";
    import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
    import { page } from "$app/state";

    let {
        steps,
        currentStep,
        unlockedStep
    }: { steps: ProgressStep[]; currentStep: number; unlockedStep: number } = $props();

    let formattedLinks = $derived(
        steps.map((link) => {
            return {
                ...link,
                href: stringFormat(link.href, page.params)
            };
        })
    );
</script>

<div class="flex items-center justify-around">
    {#each formattedLinks as step, index}
        <a
            href={unlockedStep < index ? "" : step.href}
            class:cursor-not-allowed={index > unlockedStep}
            class="flex flex-col items-center justify-center gap-1"
        >
            <div
                class:bg-secondary-500={index == currentStep}
                class:bg-primary-500={index <= unlockedStep}
                class:bg-surface-400={index > unlockedStep}
                class="step-circle flex items-center justify-center rounded-full p-4"
            >
                {index + 1}
            </div>
            <div>{step.name}</div>
        </a>
        {#if index != steps.length - 1}
            <Fa class="mb-6" scale="2" icon={faChevronRight} />
        {/if}
    {/each}
</div>

<style scoped>
    .step-circle {
        width: 3rem;
        height: 3rem;
    }
</style>
