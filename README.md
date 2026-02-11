# weekly-hot-remotion-template

Remotion 模板项目，用于制作「GitHub 一周热点」视频。

当前包含两套画面：
- `HotTopic102`：封面风格画面（参考图还原）
- `WeeklyHotTemplate`：可复用模板（引言 -> 各库介绍 -> 结尾）

## Tech Stack

- [Remotion](https://www.remotion.dev/)
- React 18
- TypeScript

## Quick Start

```bash
npm install
npm run dev
```

打开 Remotion Studio 后可选择：
- `HotTopic102`
- `WeeklyHotTemplate`

## Render

渲染封面：

```bash
npx remotion render src/index.ts HotTopic102 out/hot-topic-102.mp4
```

渲染模板：

```bash
npx remotion render src/index.ts WeeklyHotTemplate out/weekly-hot-template.mp4
```

## Project Structure

```text
src/
  Root.tsx                        # Composition 注册入口
  index.ts                        # registerRoot
  data/
    mockWeeklyHot.ts              # 模拟数据与类型定义
  scenes/
    HotTopic102.tsx               # 封面场景
    WeeklyHotTemplate.tsx         # 模板场景（引言+多库介绍+结尾）
```

## Data-Driven Template

模板核心数据位于：
- `src/data/mockWeeklyHot.ts`

主要字段：
- `issueTitle`: 期数标题
- `period`: 时间范围
- `introTitle`: 引言标题
- `introBody`: 引言正文
- `libraries[]`: 库条目列表

每个 `libraries` 条目包含：
- `id`: 唯一标识
- `name`: 库名称
- `rank`: 排名
- `repo`: 仓库地址文本
- `short`: 简介
- `highlights`: 3 条亮点（模板当前按 3 条设计）
- `weeklyStars`: 本周新增 star（模拟数据）
- `color`: 当前库主题色

> 修改 `libraries` 的数量后，`WeeklyHotTemplate` 的总时长会自动按条目数计算。

## Timing (default)

- 引言：4 秒
- 单个库介绍：5 秒
- 结尾：2 秒

时间常量定义于：
- `src/scenes/WeeklyHotTemplate.tsx`

## Commands

```bash
npm run dev      # 打开 Remotion Studio
npm run check    # TypeScript 类型检查
npm run render   # 使用 package.json 中预设命令渲染 HotTopic102
```

## Notes

- 模板已使用 `useCurrentFrame()` / `spring()` / `interpolate()` 驱动动画。
- 未使用 CSS transition，保证 Remotion 渲染一致性。
- 当前库数据为演示 mock，后续可替换为真实榜单数据。
