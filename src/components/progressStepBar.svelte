<script>
    import { steps, currentStep, unlockedStep } from "$lib/steps.js";
</script>

<div>
    <div class="outline-dashed outline-1 border-black relative" style="top: 25px; z-index: -1"></div>
    <div class="flex items-center justify-around">
        {#each $steps as step, index}
        <a href={$unlockedStep < index ? "" : step.href} class:cursor-not-allowed={index > $unlockedStep} class="flex flex-col items-center justify-center">
            <div
                class:bg-secondary-500={index == $currentStep}
                class:bg-primary-500={index <= $unlockedStep}
                class:bg-surface-400={index > $unlockedStep}
                class="rounded-full flex items-center justify-center step-circle p-4">
                {index + 1}
            </div>
            <div>{step.name}</div>
        </a>
        {/each}
    </div>
</div>

<style>
    .step-circle {
        width: 3rem;
        height: 3rem;
    }
</style>
