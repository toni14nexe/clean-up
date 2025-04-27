import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

export function useSortAndPagination(
  defaultPerPage = 12,
  defaultSortBy = 'newest'
) {
  const route = useRoute()
  const router = useRouter()

  const pagination = ref({
    page: Number(route.query.page) || 1,
    perPage: Number(route.query.perPage) || defaultPerPage,
    total: 0
  })

  const sortBy = ref<string>((route.query.sortBy as string) || defaultSortBy)

  watch(
    () => pagination.value.page,
    newPage => {
      router.replace({
        query: {
          ...route.query,
          page: newPage.toString()
        }
      })
    }
  )

  watch(
    () => sortBy.value,
    newSort => {
      pagination.value.page = 1
      router.replace({
        query: {
          ...route.query,
          page: '1',
          sortBy: newSort
        }
      })
    }
  )

  return { pagination, sortBy }
}
