import { reactive } from 'vue'

export interface Comment {
  id: number
  author: string
  content: string
  time: string
}

export interface Post {
  id: number
  author: string
  avatar: string
  company: string
  role: string
  title: string
  content: string
  time: string
  likes: number
  liked: boolean
  comments: Comment[]
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: '林涛', avatar: '林',
    company: '字节跳动', role: '前端开发',
    title: '字节跳动前端面经：从一面到 HR 面的完整复盘',
    content: '整体流程三周完成。一面侧重 JS 基础和算法，二面问项目经验加系统设计，三面是主管面聊技术视野。重点准备：React Fiber 原理、打包工具对比、跨端方案选型。算法考了中等难度的链表和二叉树。',
    time: '2小时前', likes: 34, liked: false,
    comments: [
      { id: 1, author: '王芳', content: '感谢分享！请问一面算法题具体是哪道？', time: '1小时前' },
      { id: 2, author: '林涛', content: '一道链表反转变体，另一道是二叉树的层序遍历', time: '30分钟前' },
    ],
  },
  {
    id: 2,
    author: '赵敏', avatar: '赵',
    company: '阿里巴巴', role: '产品经理',
    title: '阿里产品岗面试：需求分析 & 数据分析双杀',
    content: '阿里的产品面试非常注重数据思维。核心题：给你一个电商首页，如何用数据驱动改版？建议提前准备 2-3 个自己主导的项目案例，量化成果是关键。另外 STAR 法则在行为面中非常有效。',
    time: '5小时前', likes: 28, liked: false,
    comments: [
      { id: 3, author: '陈静', content: 'STAR 法则具体怎么套？能举个例子吗', time: '3小时前' },
    ],
  },
  {
    id: 3,
    author: '李华', avatar: '李',
    company: '腾讯', role: '后端开发',
    title: '腾讯后端开发面经：分布式与数据库是核心',
    content: '一面基础（网络+操作系统），二面深挖项目中的分布式设计，三面聊大流量场景。Go 语言问得很细，goroutine 调度和 channel 底层都涉及了。数据库问到了索引优化和分库分表方案。',
    time: '昨天', likes: 41, liked: false,
    comments: [],
  },
  {
    id: 4,
    author: '何雨', avatar: '何',
    company: '美团', role: '数据分析师',
    title: '美团数据分析师面试：SQL + 业务洞察',
    content: '美团面试节奏很快，一天内走完三轮。SQL 窗口函数必考，还现场出了一道业务分析题：给定外卖订单数据，分析用户流失原因并给出策略。建议多练习实际业务场景的拆解逻辑。',
    time: '昨天', likes: 19, liked: false,
    comments: [],
  },
  {
    id: 5,
    author: '杨帆', avatar: '杨',
    company: '拼多多', role: '前端开发',
    title: '拼多多前端面试：性能优化和工程化',
    content: '拼多多对性能优化这块问得很深入，从网络层到渲染层全覆盖。还问到了自研组件库的设计思路和 mono repo 的落地经验。算法题偏简单，但工程化问题占比很高。',
    time: '2天前', likes: 15, liked: false,
    comments: [
      { id: 4, author: '吴鑫', content: 'mono repo 具体问了哪些点？', time: '1天前' },
      { id: 5, author: '杨帆', content: '主要问了包管理、版本发布策略和 CI/CD 配置', time: '1天前' },
    ],
  },
  {
    id: 6,
    author: '黄磊', avatar: '黄',
    company: '小红书', role: '前端开发',
    title: '小红书前端面试：React Native 和跨端经验',
    content: '小红书前端团队用 RN 较多，面试重点在 RN 性能优化、原生通信原理。Web 端问到了 Next.js SSR 和流式渲染。整体难度中等偏上，面试官很专业。',
    time: '3天前', likes: 22, liked: false,
    comments: [],
  },
]

export const companyOptions = ['字节跳动', '阿里巴巴', '腾讯', '美团', '拼多多', '小红书', '百度', '京东', '快手', '网易']

let nextId = 7

export const store = reactive({
  posts: initialPosts as Post[],

  getPost(id: number): Post | undefined {
    return this.posts.find(p => p.id === id)
  },

  toggleLike(postId: number) {
    const post = this.posts.find(p => p.id === postId)
    if (!post) return
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
  },

  addComment(postId: number, content: string) {
    const post = this.posts.find(p => p.id === postId)
    if (!post || !content.trim()) return
    post.comments.push({
      id: Date.now(),
      author: '张明',
      content: content.trim(),
      time: '刚刚',
    })
  },

  createPost(data: { company: string; role: string; title: string; content: string }) {
    this.posts.unshift({
      id: nextId++,
      author: '张明',
      avatar: '张',
      company: data.company || '通用',
      role: data.role || '未指定',
      title: data.title,
      content: data.content,
      time: '刚刚',
      likes: 0,
      liked: false,
      comments: [],
    })
  },
})
