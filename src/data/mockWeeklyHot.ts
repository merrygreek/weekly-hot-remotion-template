export type LibraryHotItem = {
  id: string;
  name: string;
  rank: number;
  repo: string;
  short: string;
  highlights: [string, string, string];
  weeklyStars: number;
  color: string;
};

export type WeeklyHotTemplateProps = {
  issueTitle: string;
  period: string;
  introTitle: string;
  introBody: string;
  libraries: LibraryHotItem[];
};

export const mockWeeklyHotData: WeeklyHotTemplateProps = {
  issueTitle: 'GitHub 一周热点汇总 #102',
  period: '2025/1/25 - 2026/1/31',
  introTitle: '引言',
  introBody:
    '本期聚焦 AI 工程效率、视频自动化和文档理解。以下库均为模拟数据，仅用于模板排版和动画预览。',
  libraries: [
    {
      id: 'openclaw',
      name: 'openclaw',
      rank: 1,
      repo: 'github.com/example/openclaw',
      short: '一个面向自动化任务的轻量 Agent 运行时。',
      highlights: ['任务状态可追踪', '工具调用抽象统一', '支持本地与云端混合执行'],
      weeklyStars: 1820,
      color: '#5eead4',
    },
    {
      id: 'remotion',
      name: 'remotion',
      rank: 2,
      repo: 'github.com/remotion-dev/remotion',
      short: '使用 React 编写与渲染视频的完整框架。',
      highlights: ['组件化视频编排', 'TypeScript 友好', '可自动化批量渲染'],
      weeklyStars: 1542,
      color: '#f9a8d4',
    },
    {
      id: 'kimi-k2-5',
      name: 'kimi K2.5',
      rank: 3,
      repo: 'github.com/example/kimi-k2-5',
      short: '面向代码理解与长上下文处理的模型工具链。',
      highlights: ['高上下文容量', '更稳健的代码补全', '文档问答质量高'],
      weeklyStars: 1308,
      color: '#93c5fd',
    },
    {
      id: 'pageindex',
      name: 'PageIndex',
      rank: 4,
      repo: 'github.com/example/pageindex',
      short: '把网页内容构建成可检索的结构化索引。',
      highlights: ['抓取+分块一体化', '检索延迟低', '支持增量更新'],
      weeklyStars: 964,
      color: '#fde68a',
    },
    {
      id: 'langextract',
      name: 'langextract',
      rank: 5,
      repo: 'github.com/example/langextract',
      short: '从多语言文本中提取实体与结构化信息。',
      highlights: ['多语言支持', '规则与模型可混合', '输出 JSON 规范化'],
      weeklyStars: 886,
      color: '#c4b5fd',
    },
    {
      id: 'one-more-thing',
      name: 'one more thing',
      rank: 6,
      repo: 'github.com/example/one-more-thing',
      short: '一个灵活的工具箱仓库，适合快速验证创意。',
      highlights: ['样例丰富', '上手门槛低', '社区反馈活跃'],
      weeklyStars: 742,
      color: '#fdba74',
    },
  ],
};
