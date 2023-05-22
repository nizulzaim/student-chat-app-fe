<template>
  <div class="dv-datatable overflow-hidden shadow ring-1 ring-slate-700 ring-opacity-5 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-white">
        <tr>
          <slot name="head" />
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <slot />
      </tbody>
    </table>
    <slot name="footer" />
  </div>
</template>

<style lang="scss">
.dv-datatable {
  @apply overflow-hidden shadow ring-1 ring-slate-700 ring-opacity-5 md:rounded-lg;

  thead {
    tr {
      th {
        @apply px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase;
      }

      & th:first-child {
        @apply pl-6;
      }

      & th:last-child {
        @apply pr-6;
      }
    }
  }

  tbody {
    tr {
      td {
        @apply whitespace-nowrap px-3 py-4 text-sm text-gray-500;
      }

      & td:first-child {
        @apply pl-6;
      }
      & td:last-child {
        @apply pr-6;
      }
    }
  }
}
</style>