<script lang="ts">
  import Icon from "fa-svelte";
  import { ButtonIcon } from "../interfaces/atoms";

  export let mapping: ButtonIcon;
</script>

<style>
  .button {
    @apply flex items-center content-end justify-center w-12 h-12 p-1 border-2 rounded-xl;
  }
</style>

{#if mapping.design.disabled}
  <div class="button bg-light-100 border-light-300 text-light-300">
    <Icon icon={mapping.design.icon} />
  </div>
{:else if mapping.design.type == 'primary'}
  <div
    class="text-white cursor-pointer button border-secondary bg-secondary hover:border-secondary-lighter hover:bg-secondary-lighter">
    <Icon icon={mapping.design.icon} />
  </div>
{:else if mapping.design.type == 'secondary'}
  <div
    class="cursor-pointer button border-secondary text-secondary hover:border-secondary-lighter hover:text-secondary-lighter">
    <Icon icon={mapping.design.icon} />
  </div>
{:else if mapping.design.type == 'light'}
  <div
    class="cursor-pointer button border-light-400 text-light-400 hover:border-secondary-lighter hover:text-secondary-lighter">
    <Icon icon={mapping.design.icon} />
  </div>
{:else if mapping.design.type == 'light-danger'}
  <div
    class="cursor-pointer button border-light-300 text-light-300 hover:bg-danger hover:border-danger hover:text-white">
    <Icon icon={mapping.design.icon} />
  </div>
{/if}
