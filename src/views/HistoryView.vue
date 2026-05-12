<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppHeader from '@/components/ui/AppHeader.vue'
import ListRow from '@/components/ui/ListRow.vue'
import IconButton from '@/components/ui/IconButton.vue'
import FilterIcon from '@/components/icons/FilterIcon.vue'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import PenIcon from '@/components/icons/PenIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'

const router = useRouter()

const history = [
  { id: '1', title: '前端开发工程师 · 中级', subtitle: '5月8日 · 8 分钟 · 结构化面试', score: 80, icon: CodeIcon },
  { id: '2', title: '产品经理 · 初级', subtitle: '5月6日 · 15 分钟 · 案例分析', score: 76, icon: PenIcon },
  { id: '3', title: '前端开发工程师 · 高级', subtitle: '5月3日 · 30 分钟 · 技术问答', score: 72, icon: CodeIcon },
  { id: '4', title: '数据分析师 · 中级', subtitle: '4月28日 · 20 分钟 · 结构化面试', score: 88, icon: BarChartIcon },
]

function goToFeedback() {
  router.push('/feedback')
}
</script>

<template>
  <AppLayout>
    <AppHeader greeting="面试记录" title="历史回顾">
      <template #action>
        <IconButton aria-label="筛选">
          <FilterIcon />
        </IconButton>
      </template>
    </AppHeader>

    <section class="pad" data-od-id="history-list">
      <ListRow
        v-for="item in history"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :score="item.score"
        @click="goToFeedback"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
      </ListRow>
    </section>
  </AppLayout>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}
</style>
