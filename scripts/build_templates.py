#!/usr/bin/env python3
"""Build template-contents.json from source files."""
import json
import os

# Project definitions with their file contents
PROJECTS = {}

# ── Project: todo-app ──
PROJECTS['todo-app'] = {
    "fullCode": {
        "index.html": '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>待办事项</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✅ 待办事项</h1>
    <div class="input-area">
      <input type="text" id="taskInput" placeholder="添加新任务...">
      <button onclick="addTask()">+</button>
    </div>
    <div class="filters">
      <button class="filter-btn active" onclick="setFilter('all')">全部</button>
      <button class="filter-btn" onclick="setFilter('active')">进行中</button>
      <button class="filter-btn" onclick="setFilter('completed')">已完成</button>
    </div>
    <ul id="taskList"></ul>
    <div class="stats" id="stats"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
''',
        "style.css": '''* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}
.container {
  width: 100%; max-width: 480px;
  background: white; border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
h1 { color: #2d3748; margin-bottom: 20px; font-size: 24px; text-align: center; }
.input-area { display: flex; gap: 8px; margin-bottom: 16px; }
.input-area input {
  flex: 1; padding: 12px 16px; border: 2px solid #e2e8f0;
  border-radius: 8px; font-size: 16px; outline: none;
}
.input-area input:focus { border-color: #667eea; }
.input-area button {
  width: 44px; height: 44px; background: #667eea;
  color: white; border: none; border-radius: 8px;
  font-size: 24px; cursor: pointer;
}
.filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filter-btn {
  flex: 1; padding: 8px 12px; border: 1px solid #e2e8f0;
  background: white; border-radius: 6px; cursor: pointer;
  font-size: 14px; color: #718096;
}
.filter-btn.active { background: #667eea; color: white; border-color: #667eea; }
#taskList { list-style: none; }
#taskList li {
  display: flex; align-items: center;
  padding: 12px; border-bottom: 1px solid #f0f0f0; gap: 10px;
}
#taskList li input[type="checkbox"] {
  width: 20px; height: 20px; cursor: pointer; accent-color: #667eea;
}
#taskList li span { flex: 1; font-size: 15px; color: #2d3748; }
#taskList li span.completed { text-decoration: line-through; color: #a0aec0; }
.delete-btn {
  background: none; border: none; font-size: 18px;
  cursor: pointer; padding: 4px 8px; border-radius: 4px;
}
.delete-btn:hover { background: #fed7d7; }
.stats {
  text-align: center; color: #718096; font-size: 14px;
  margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;
}
.empty-state { text-align: center; color: #a0aec0; padding: 40px; }
''',
        "script.js": '''let tasks = [];
let currentFilter = 'all';

function loadTasks() {
  const saved = localStorage.getItem('todo_tasks');
  if (saved) { try { tasks = JSON.parse(saved); } catch { tasks = []; } }
  render();
}
function saveTasks() { localStorage.setItem('todo_tasks', JSON.stringify(tasks)); }

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text: text, completed: false });
  input.value = '';
  saveTasks(); render();
}
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) { task.completed = !task.completed; saveTasks(); render(); }
}
function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); saveTasks(); render(); }

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  render();
}

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);
  if (filtered.length === 0) {
    list.innerHTML = '<li class="empty-state">暂无任务 🎉</li>';
  } else {
    filtered.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>`;
      list.appendChild(li);
    });
  }
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById('stats').textContent = `共 ${tasks.length} 个任务，已完成 ${completed} 个`;
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

loadTasks();
''',
        "README.md": '''# ✅ 待办事项管理网页

> Level 2 项目 — 完整的 CRUD 应用

## 功能

- ✅ 添加新任务
- ✅ 标记完成/未完成
- ✅ 删除任务
- ✅ 筛选查看：全部 / 进行中 / 已完成
- ✅ 数据持久化（刷新页面不丢失）

## 如何运行

**无需安装任何软件！**

直接用浏览器打开 index.html 文件即可。

## 项目结构

```
todo-app/
├── index.html
├── style.css
└── script.js
```
'''
    },
    "skeleton": {
        "index.html": '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>待办事项</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- TODO: 构建 HTML 结构：输入框、筛选按钮、任务列表 -->
  <h1>✅ 待办事项</h1>
  <p>骨架模板，请回到 CodeFirst 查看详细实现步骤。</p>
  <script src="script.js"></script>
</body>
</html>
''',
        "style.css": '''/* ═══════════════════════════════════════════ */
/*  待办事项管理网页 — 样式                     */
/* ═══════════════════════════════════════════ */

/* TODO: 在此编写样式 */
/* 参考网页上的 Step-by-Step 指南 */

''',
        "script.js": '''// ═══════════════════════════════════════════════
//  待办事项管理 — 核心逻辑
// ═══════════════════════════════════════════════
//  TODO: 在此实现代码
//  参考网页上的 Step-by-Step 指南
// ═══════════════════════════════════════════════

''',
        "README.md": '''# ✅ 待办事项管理网页

> 骨架模板。请访问 CodeFirst 查看完整指南。

## 项目结构

- `index.html` — 网页结构
- `style.css` — 网页样式
- `script.js` — 核心逻辑
'''
    }
}

# ── Project: movie-scraper ──
PROJECTS['movie-scraper'] = {
    "fullCode": {
        "config.py": '''# config.py - 项目配置
BASE_URL = "https://movie.douban.com/top250"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
START = 0
PER_PAGE = 25
TOTAL_PAGES = 10
''',
        "utils.py": '''# utils.py - 工具函数
import csv
import re

def clean_text(text: str) -> str:
    return text.strip().replace('\\n', '').replace('\\xa0', '')

def extract_year(info: str) -> int:
    match = re.search(r'(\\d{4})', info)
    return int(match.group(1)) if match else 0

def save_to_csv(movies: list, filename: str = "movies.csv"):
    if not movies:
        print("没有数据可保存"); return
    keys = movies[0].keys()
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(movies)
    print(f"已保存 {len(movies)} 条数据到 {filename}")
''',
        "scraper.py": '''# scraper.py - 爬取逻辑
import requests
from bs4 import BeautifulSoup
from config import BASE_URL, HEADERS, START, PER_PAGE, TOTAL_PAGES
from utils import clean_text, extract_year

def fetch_page(start: int) -> str:
    url = f"{BASE_URL}?start={start}"
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"请求失败: {e}"); return ""

def parse_movies(html: str) -> list:
    soup = BeautifulSoup(html, 'html.parser')
    items = soup.find_all('div', class_='item')
    movies = []
    for item in items:
        title = clean_text(item.find('span', class_='title').text)
        rating = item.find('span', class_='rating_num').text
        rating_num = item.find('div', class_='star').find_all('span')[-1].text
        link = item.find('div', class_='hd').find('a')['href']
        info = item.find('p', class_='').text if item.find('p', class_='') else ""
        movies.append({
            'title': title, 'rating': float(rating),
            'rating_num': rating_num, 'year': extract_year(info), 'link': link
        })
    return movies

def scrape_all() -> list:
    all_movies = []
    for page in range(TOTAL_PAGES):
        start = START + page * PER_PAGE
        print(f"正在爬取第 {page + 1}/{TOTAL_PAGES} 页...")
        html = fetch_page(start)
        if html:
            movies = parse_movies(html)
            all_movies.extend(movies)
    print(f"\\n共爬取 {len(all_movies)} 部电影")
    return all_movies
''',
        "analyzer.py": '''# analyzer.py - 数据分析
import pandas as pd

def analyze(movies: list) -> dict:
    df = pd.DataFrame(movies)
    stats = {
        'total': len(df),
        'avg_rating': df['rating'].mean().round(2),
        'max_rating': df['rating'].max(),
        'min_rating': df['rating'].min(),
        'top_movie': df.loc[df['rating'].idxmax(), 'title'],
    }
    top10 = df.nlargest(10, 'rating')[['title', 'rating']].to_dict('records')
    rating_dist = df['rating'].value_counts().sort_index().to_dict()
    year_counts = df[df['year'] > 0]['year'].value_counts().sort_index()
    return {'stats': stats, 'top10': top10, 'rating_dist': rating_dist, 'year_counts': year_counts.to_dict()}

def print_report(result: dict):
    s = result['stats']
    print("\\n" + "="*40)
    print("📊 数据分析报告")
    print("="*40)
    print(f"总计电影: {s['total']} 部")
    print(f"平均评分: {s['avg_rating']} 分")
    print(f"最高评分: {s['max_rating']} 分 —《{s['top_movie']}》")
    print(f"最低评分: {s['min_rating']} 分")
    print("\\n🏆 Top 10 电影:")
    for i, m in enumerate(result['top10'], 1):
        print(f"  {i}. {m['title']} — {m['rating']}分")
    print("="*40)
''',
        "visualizer.py": '''# visualizer.py - 图表生成
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

def plot_rating_dist(dist: dict):
    plt.figure(figsize=(10, 5))
    plt.bar(dist.keys(), dist.values(), color='#E88B2E', edgecolor='#B55A00')
    plt.xlabel('评分', fontsize=12)
    plt.ylabel('电影数量', fontsize=12)
    plt.title('豆瓣Top250 评分分布', fontsize=14)
    plt.tight_layout()
    plt.savefig('rating_dist.png', dpi=150)
    plt.close()
    print("已保存评分分布图: rating_dist.png")

def plot_top10(top10: list):
    titles = [m['title'][:10] + '...' if len(m['title']) > 10 else m['title'] for m in top10]
    ratings = [m['rating'] for m in top10]
    plt.figure(figsize=(10, 6))
    colors = plt.cm.YlOrRd([0.3 + 0.07 * i for i in range(10)])
    plt.barh(range(10), ratings, color=colors)
    plt.yticks(range(10), titles)
    plt.xlabel('评分', fontsize=12)
    plt.title('豆瓣Top250 评分Top10', fontsize=14)
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig('top10.png', dpi=150)
    plt.close()
    print("已保存Top10图表: top10.png")

def plot_year_trend(years: dict):
    plt.figure(figsize=(12, 5))
    x = sorted(years.keys()); y = [years[k] for k in x]
    plt.plot(x, y, marker='o', color='#4A90D9', linewidth=2)
    plt.xlabel('年份', fontsize=12)
    plt.ylabel('电影数量', fontsize=12)
    plt.title('豆瓣Top250 年份分布趋势', fontsize=14)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('year_trend.png', dpi=150)
    plt.close()
    print("已保存年份趋势图: year_trend.png")
''',
        "main.py": '''# main.py - 程序入口
from scraper import scrape_all
from analyzer import analyze, print_report
from visualizer import plot_rating_dist, plot_top10, plot_year_trend
from utils import save_to_csv

def main():
    print("🕷️ 豆瓣电影Top250数据抓取与分析")
    print("-" * 40)
    movies = scrape_all()
    if not movies:
        print("爬取失败，请检查网络连接"); return
    save_to_csv(movies)
    result = analyze(movies)
    print_report(result)
    print("\\n📈 正在生成图表...")
    plot_rating_dist(result['rating_dist'])
    plot_top10(result['top10'])
    plot_year_trend(result['year_counts'])
    print("\\n✅ 全部完成！")
    print("输出文件: movies.csv, rating_dist.png, top10.png, year_trend.png")

if __name__ == "__main__":
    main()
''',
        "requirements.txt": '''requests>=2.28.0
beautifulsoup4>=4.11.0
pandas>=1.5.0
matplotlib>=3.6.0
lxml>=4.9.0
''',
        "README.md": '''# 🕷️ 豆瓣电影数据抓取与分析

> Level 3 项目 — 完整的数据处理流水线

## 环境配置

```bash
pip install requests beautifulsoup4 pandas matplotlib lxml
```

## 运行

```bash
python main.py
```

## 项目结构

```
movie-scraper/
├── config.py       # 配置
├── utils.py        # 工具函数
├── scraper.py      # 爬取逻辑
├── analyzer.py     # 数据分析
├── visualizer.py   # 图表生成
├── main.py         # 入口
└── requirements.txt
```
'''
    },
    "skeleton": {
        "config.py": "# TODO: Step 1 - 定义 BASE_URL、HEADERS、分页参数\n\n",
        "utils.py": "# TODO: Step 2 - 实现 clean_text()、extract_year()、save_to_csv()\n\n",
        "scraper.py": "# TODO: Steps 3-5 - 实现 fetch_page()、parse_movies()、scrape_all()\n\n",
        "analyzer.py": "# TODO: Steps 6-7 - 实现 analyze()、print_report()\n\n",
        "visualizer.py": "# TODO: Steps 8-10 - 实现 plot_rating_dist()、plot_top10()、plot_year_trend()\n\n",
        "main.py": "# TODO: Step 11 - 编写 main() 串联全流程\n\n",
        "requirements.txt": '''requests>=2.28.0
beautifulsoup4>=4.11.0
pandas>=1.5.0
matplotlib>=3.6.0
lxml>=4.9.0
''',
        "README.md": '''# 🕷️ 豆瓣电影数据抓取与分析

> 骨架模板。请访问 CodeFirst 查看完整指南。

```bash
pip install requests beautifulsoup4 pandas matplotlib lxml
```
'''
    }
}

# ── Project: markdown-notes ──
PROJECTS['markdown-notes'] = {
    "fullCode": {
        "index.html": '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Markdown 笔记</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>📝 我的笔记</h2>
        <button id="newBtn">+ 新建</button>
      </div>
      <input type="text" id="searchInput" placeholder="🔍 搜索笔记...">
      <div id="tagFilters"></div>
      <ul id="noteList"></ul>
    </aside>
    <main class="editor-area">
      <input type="text" id="titleInput" placeholder="笔记标题">
      <div class="split-pane">
        <textarea id="editor" placeholder="在此输入 Markdown..."></textarea>
        <div id="preview"></div>
      </div>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>
''',
        "style.css": '''* { margin: 0; padding: 0; box-sizing: border-box; }
.app {
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.sidebar {
  width: 280px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.sidebar-header h2 { font-size: 18px; color: #333; }
#newBtn {
  background: #E88B2E; color: white; border: none;
  padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 14px;
}
#newBtn:hover { background: #d47a1e; }
#searchInput {
  padding: 8px 12px; border: 1px solid #ddd;
  border-radius: 6px; margin-bottom: 12px; font-size: 14px;
}
#noteList { list-style: none; overflow-y: auto; flex: 1; }
.note-item {
  padding: 10px 12px; border-radius: 8px;
  cursor: pointer; margin-bottom: 4px; transition: background 0.15s;
}
.note-item:hover { background: #e8e8e8; }
.note-item.active { background: #E88B2E; color: white; }
.editor-area { flex: 1; display: flex; flex-direction: column; }
#titleInput {
  padding: 12px 20px; font-size: 20px; font-weight: bold;
  border: none; border-bottom: 1px solid #eee; outline: none;
}
.split-pane { display: flex; flex: 1; overflow: hidden; }
#editor {
  flex: 1; padding: 20px; border: none; border-right: 1px solid #eee;
  font-family: 'Courier New', monospace; font-size: 14px;
  line-height: 1.8; resize: none; outline: none;
}
#preview {
  flex: 1; padding: 20px; overflow-y: auto; line-height: 1.8;
}
#preview h1, #preview h2, #preview h3 { margin: 16px 0 8px; }
#preview p { margin: 8px 0; }
#preview code {
  background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-size: 14px;
}
#preview pre code { display: block; padding: 12px; overflow-x: auto; }
#preview ul, #preview ol { margin: 8px 0; padding-left: 24px; }
#preview blockquote {
  border-left: 4px solid #ddd; padding-left: 12px;
  color: #666; margin: 8px 0;
}
''',
        "app.js": '''let notes = [];
let activeNoteId = null;

const STORAGE_KEY = 'markdown_notes';

function loadNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

marked.setOptions({ breaks: true, gfm: true });

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const titleInput = document.getElementById('titleInput');
const noteList = document.getElementById('noteList');
const searchInput = document.getElementById('searchInput');
const newBtn = document.getElementById('newBtn');

function init() {
  notes = loadNotes();
  if (notes.length === 0) { createNote(); }
  activeNoteId = notes[0].id;
  renderNoteList();
  loadActiveNote();
  setupEventListeners();
}

function createNote() {
  const note = {
    id: Date.now(), title: '未命名笔记',
    content: '# 新笔记\\n\\n开始写作...',
    tag: '未分类', updatedAt: new Date().toISOString()
  };
  notes.unshift(note);
  activeNoteId = note.id;
  saveNotes();
  renderNoteList();
  loadActiveNote();
}

function saveCurrentNote() {
  const note = notes.find(n => n.id === activeNoteId);
  if (note) {
    note.title = titleInput.value || '未命名';
    note.content = editor.value;
    note.updatedAt = new Date().toISOString();
    saveNotes();
    renderNoteList();
  }
}

function deleteNote(id) {
  if (!confirm('确定删除此笔记？')) return;
  notes = notes.filter(n => n.id !== id);
  if (notes.length === 0) createNote();
  if (activeNoteId === id) activeNoteId = notes[0].id;
  saveNotes();
  renderNoteList();
  loadActiveNote();
}

function switchNote(id) {
  saveCurrentNote();
  activeNoteId = id;
  renderNoteList();
  loadActiveNote();
}

function loadActiveNote() {
  const note = notes.find(n => n.id === activeNoteId);
  if (!note) return;
  titleInput.value = note.title;
  editor.value = note.content;
  renderPreview();
}

function renderPreview() {
  preview.innerHTML = marked.parse(editor.value);
}

function renderNoteList() {
  let filtered = notes;
  const q = searchInput.value.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  }
  noteList.innerHTML = '';
  filtered.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note-item' + (note.id === activeNoteId ? ' active' : '');
    li.innerHTML = `<div class="note-title">${note.title}</div>
      <div class="note-meta" style="font-size:12px;color:#999;margin-top:4px;">
        ${new Date(note.updatedAt).toLocaleString('zh-CN')}
      </div>`;
    li.onclick = () => switchNote(note.id);
    noteList.appendChild(li);
  });
}

function setupEventListeners() {
  editor.addEventListener('input', () => { renderPreview(); saveCurrentNote(); });
  titleInput.addEventListener('input', saveCurrentNote);
  searchInput.addEventListener('input', renderNoteList);
  newBtn.addEventListener('click', createNote);
}

init();
''',
        "README.md": '''# 📝 Markdown 笔记 Web 应用

> Level 3 项目 — 完整的前端应用

## 功能

- 📝 创建/编辑/删除 Markdown 笔记
- 👁️ 左右分栏实时预览
- 🔍 全文搜索
- 💾 LocalStorage 数据持久化

## 如何运行

**无需安装任何软件！**

marked.js 通过 CDN 自动加载。直接用浏览器打开 index.html 即可。

## 项目结构

```
markdown-notes/
├── index.html   # 网页入口
├── style.css    # 全局样式
└── app.js       # 应用主逻辑
```
'''
    },
    "skeleton": {
        "index.html": '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Markdown 笔记</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
  <!-- TODO: 构建左右分栏的网页骨架 -->
  <h1>📝 Markdown 笔记</h1>
  <p>骨架模板，请回到 CodeFirst 查看详细实现步骤。</p>
  <script src="app.js"></script>
</body>
</html>
''',
        "style.css": '''/* TODO: 使用 Flexbox 实现左右分栏布局，设计侧边栏和编辑区样式 */

''',
        "app.js": '''// TODO: 实现状态管理、CRUD操作、搜索筛选、实时预览等核心逻辑

''',
        "README.md": '''# 📝 Markdown 笔记 Web 应用

> 骨架模板。请访问 CodeFirst 查看完整指南。

- marked.js 通过 CDN 引入，无需手动下载
- 纯前端应用，浏览器打开 index.html 即可运行
'''
    }
}

# ── Project: site-monitor ──
PROJECTS['site-monitor'] = {
    "fullCode": {
        "sites.json": '''{
  "sites": [
    { "name": "GitHub", "url": "https://github.com", "expected_status": 200 },
    { "name": "百度", "url": "https://www.baidu.com", "expected_status": 200 }
  ],
  "timeout": 10,
  "interval": 300,
  "log_file": "history.log"
}''',
        "config.py": '''# config.py - 配置管理
import json

def load_config(path: str = "sites.json") -> dict:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ 配置文件不存在: {path}")
        return { "sites": [], "timeout": 10, "interval": 300 }
    except json.JSONDecodeError:
        print(f"❌ JSON格式错误: {path}")
        return { "sites": [], "timeout": 10, "interval": 300 }

def validate_config(config: dict) -> bool:
    if not config.get("sites"):
        print("⚠️ 监控列表为空，请检查sites.json")
        return False
    for site in config["sites"]:
        if "url" not in site:
            print(f"⚠️ {site.get('name', '?')} 缺少url字段")
            return False
    return True
''',
        "monitor.py": '''# monitor.py - 核心监控逻辑
import asyncio
import time
import requests

async def check_site(session, site: dict, timeout: int) -> dict:
    url = site["url"]
    name = site.get("name", url)
    expected = site.get("expected_status", 200)
    result = {
        "name": name, "url": url, "status": None,
        "response_time": 0, "expected": expected,
        "ok": False, "error": None
    }
    start = time.time()
    try:
        loop = asyncio.get_event_loop()
        response = await asyncio.wait_for(
            loop.run_in_executor(None, lambda: requests.get(url, timeout=timeout)),
            timeout=timeout + 5
        )
        result["status"] = response.status_code
        result["ok"] = (response.status_code == expected)
    except asyncio.TimeoutError:
        result["error"] = "请求超时"
    except requests.RequestException as e:
        result["error"] = str(e)
    finally:
        result["response_time"] = round((time.time() - start) * 1000, 2)
    return result

async def check_all(config: dict) -> list:
    sites = config["sites"]
    timeout = config.get("timeout", 10)
    tasks = [check_site(None, site, timeout) for site in sites]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return [r if isinstance(r, dict) else {
        "name": "?", "url": "?", "status": None,
        "ok": False, "error": str(r), "response_time": 0
    } for r in results]
''',
        "reporter.py": '''# reporter.py - 报告生成
from datetime import datetime

GREEN = "\\033[32m"
RED = "\\033[31m"
YELLOW = "\\033[33m"
RESET = "\\033[0m"
BOLD = "\\033[1m"

def format_result(r: dict) -> str:
    name = r["name"]
    status = r["status"]
    ms = r["response_time"]
    ok = r["ok"]
    error = r["error"]
    if ok:
        return f"{GREEN}✓{RESET} {BOLD}{name}{RESET} — {status} ({ms}ms)"
    elif error:
        return f"{YELLOW}◆{RESET} {BOLD}{name}{RESET} — {error}"
    else:
        return f"{RED}✗{RESET} {BOLD}{name}{RESET} — {status} (期望{r['expected']}) ({ms}ms)"

def print_report(results: list):
    print(f"\\n{BOLD}🌐 网站状态监控报告{RESET}")
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 50)
    ok_count = sum(1 for r in results if r["ok"])
    fail_count = len(results) - ok_count
    for r in results:
        print(format_result(r))
    print("-" * 50)
    print(f"总计: {len(results)} | {GREEN}正常{ok_count}{RESET} | {RED}异常{fail_count}{RESET}\\n")

def save_log(results: list, log_file: str):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(log_file, 'a', encoding='utf-8') as f:
        f.write(f"\\n[{timestamp}]\\n")
        for r in results:
            status_str = "OK" if r["ok"] else (f"ERROR:{r['error']}" if r['error'] else f"FAIL:{r['status']}")
            f.write(f"  {r['name']}: {status_str} ({r['response_time']}ms)\\n")
    print(f"📄 日志已保存: {log_file}")
''',
        "main.py": '''# main.py - 程序入口
import asyncio
import sys
import time
from config import load_config, validate_config
from monitor import check_all
from reporter import print_report, save_log

def main():
    config_path = sys.argv[1] if len(sys.argv) > 1 else "sites.json"
    loop_mode = "--loop" in sys.argv
    config = load_config(config_path)
    if not validate_config(config):
        return
    sites = config["sites"]
    interval = config.get("interval", 300)
    log_file = config.get("log_file", "history.log")
    print(f"📋 监控目标: {len(sites)} 个网站")
    for s in sites:
        print(f"   • {s['name']}: {s['url']}")
    print(f"⏱️  超时: {config.get('timeout', 10)}s | 间隔: {interval}s")
    if loop_mode:
        print(f"🔄 定时模式: 每 {interval} 秒检查一次\\n")
    while True:
        results = asyncio.run(check_all(config))
        print_report(results)
        save_log(results, log_file)
        if not loop_mode:
            break
        print(f"⏳ {interval}秒后再次检查...\\n")
        time.sleep(interval)

if __name__ == "__main__":
    main()
''',
        "requirements.txt": '''requests>=2.28.0
''',
        "README.md": '''# 🌐 网站状态监控工具

> Level 3 项目 — DevOps/SRE 入门

## 功能

- 批量检查多个网站的 HTTP 状态码和响应时间
- 彩色终端报告
- 保存检查历史到日志文件
- 支持定时循环检查

## 环境配置

```bash
pip install requests
```

## 运行

```bash
# 单次检查
python main.py

# 定时循环检查
python main.py --loop
```

## 项目结构

```
site-monitor/
├── sites.json      # 网站列表配置
├── config.py       # 配置读取和验证
├── monitor.py      # 异步HTTP检测
├── reporter.py     # 彩色报告+日志
├── main.py         # 入口
└── requirements.txt
```
'''
    },
    "skeleton": {
        "sites.json": '''{
  "sites": [
    { "name": "示例", "url": "https://example.com", "expected_status": 200 }
  ],
  "timeout": 10,
  "interval": 300,
  "log_file": "history.log"
}''',
        "config.py": "# TODO: Step 1-2 - 实现 load_config() 和 validate_config()\n\n",
        "monitor.py": "# TODO: Steps 3-4 - 实现 check_site() 和 check_all()\n\n",
        "reporter.py": "# TODO: Steps 5-7 - 实现 format_result()、print_report()、save_log()\n\n",
        "main.py": "# TODO: Step 8 - 编写 main() 函数\n\n",
        "requirements.txt": "requests>=2.28.0\n",
        "README.md": "# 🌐 网站状态监控工具\n\n> 骨架模板。请访问 CodeFirst 查看完整指南。\n\n```bash\npip install requests\n```\n"
    }
}

# ── Save ──
output_path = '/mnt/agents/output/app/src/data/template-contents.json'

# Load existing and merge
with open(output_path, 'r', encoding='utf-8') as f:
    existing = json.load(f)

existing.update(PROJECTS)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print(f"Saved {len(existing)} projects to {output_path}")
print("Projects:", list(existing.keys()))
