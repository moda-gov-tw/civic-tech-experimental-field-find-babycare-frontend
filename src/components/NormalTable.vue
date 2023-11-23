<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">幼兒姓名</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">申請人姓名</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">身份資格</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">報名時間</th>
                  <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">View</span>
                  </th> -->
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in formattedData" :key="item[0]">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item[1] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item[2] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item[3] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item[4] }}</td>
                  <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      View<span class="sr-only">, {{ item[1] }}</span>
                    </a>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const formattedData = computed(() => {
  const list = [];
  props.data.forEach(item => {
    const d = Object.entries(item).reduce((acc, [key, val]) => {
      acc.push(val);
      return acc;
    }, []);
    list.push(d);
  });
  return list;
});
</script>
