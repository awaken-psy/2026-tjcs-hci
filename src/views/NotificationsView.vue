<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppHeader from '@/components/ui/AppHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BellIcon from '@/components/icons/BellIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'

const router = useRouter()

interface Notification {
  id: number
  title: string
  body: string
  time: string
  unread: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    title: '面试提醒',
    body: '明天下午3:00有前端开发工程师面试，请提前10分钟进入面试间',
    time: '今天 14:30',
    unread: true,
  },
  {
    id: 2,
    title: '面试提醒',
    body: '后天上午10:00有数据分析师面试，已为你匹配2026年高频题库',
    time: '今天 09:15',
    unread: true,
  },
  {
    id: 3,
    title: '面试反馈',
    body: '5月8日产品经理面试报告已生成，综合得分78分，点击查看详情',
    time: '5月8日 16:20',
    unread: false,
  },
  {
    id: 4,
    title: '面试提醒',
    body: '5月6日下午2:00有前端开发工程师面试，面试官：王工',
    time: '5月5日 18:00',
    unread: false,
  },
  {
    id: 5,
    title: '系统通知',
    body: '题库已更新，新增50道2026年高频算法面试题，覆盖字节、阿里、腾讯最新真题',
    time: '5月4日 11:00',
    unread: false,
  },
  {
    id: 6,
    title: '面试提醒',
    body: '5月3日上午9:30有后端开发工程师面试，考察方向：系统设计 + Go语言基础',
    time: '5月2日 20:00',
    unread: false,
  },
]
</script>

<template>
  <ScreenView>
    <div class="pad" style="padding-top: 16px;">
      <BackButton @click="router.push('/home')" />

      <AppHeader title="消息通知">
        <template #action>
          <div class="icon-wrap">
            <BellIcon />
          </div>
        </template>
      </AppHeader>

      <div class="list">
        <EmptyState
          v-if="notifications.length === 0"
          title="暂无通知"
          description="面试提醒、反馈报告和系统通知会出现在这里"
        />
        <div
          v-else
          v-for="n in notifications"
          :key="n.id"
          class="noti-item"
          :class="{ unread: n.unread }"
        >
          <div class="noti-left">
            <div class="noti-dot" v-if="n.unread" />
            <div class="noti-icon">
              <ClockIcon />
            </div>
          </div>
          <div class="noti-body">
            <div class="noti-title-row">
              <span class="noti-title">{{ n.title }}</span>
              <span class="noti-time">{{ n.time }}</span>
            </div>
            <p class="noti-text">{{ n.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}

.icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--fg);
}

.icon-wrap svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
}

.list {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.noti-item {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid var(--border);
}

.noti-item:first-child {
  border-top: 0;
}

.noti-item.unread {
  background: var(--accent-soft);
  margin-inline: -20px;
  padding-inline: 20px;
  border-radius: 8px;
}

.noti-left {
  position: relative;
  flex-shrink: 0;
  padding-top: 2px;
}

.noti-dot {
  position: absolute;
  top: 0;
  left: -2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.noti-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--bg);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--muted);
}

.noti-icon svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.noti-body {
  flex: 1;
  min-width: 0;
}

.noti-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.noti-title {
  font-size: 14px;
  font-weight: 600;
}

.noti-time {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
}

.noti-text {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}
</style>
