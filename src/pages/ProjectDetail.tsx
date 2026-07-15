import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Code2,
  Copy,
  Check,
  ChevronDown,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  FileText,
  Github,
  Star,
} from 'lucide-react'

/* ───────────────────────── types ───────────────────────── */

interface Step {
  title: string
  time: string
  code: string
  explanation: string
}

interface KeyConcept {
  name: string
  description: string
}

interface FAQItem {
  q: string
  a: string
}

interface GitHubProject {
  name: string
  stars: string
  description: string
}

interface Extension {
  level: number
  text: string
  skill: string
}

interface ProjectDetailData {
  slug: string
  emoji: string
  title: string
  level: number
  levelLabel: string
  levelColor: string
  time: string
  lines: string
  stack: string[]
  stackColor: string
  prerequisites: string[]
  description: string
  whyThisProject: string
  image: string
  resumeText: string
  resumeTags: string[]
  steps: Step[]
  keyConcepts: KeyConcept[]
  faq: FAQItem[]
  githubProjects: GitHubProject[]
  extensions: Extension[]
}

/* ─────────────────────── project data ─────────────────────── */

const projectDetails: Record<string, ProjectDetailData> = {
  'password-generator': {
    slug: 'password-generator',
    emoji: '\uD83D\uDD10',
    title: '\u4E2A\u4EBA\u5BC6\u7801\u751F\u6210\u5668',
    level: 0,
    levelLabel: 'Level 0',
    levelColor: 'from-[#7BA37E] to-[#5C8A5F]',
    time: '1-2\u5C0F\u65F6',
    lines: '~60\u884C',
    stack: ['Python (\u5185\u7F6E\u5E93: random, string)'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['\u53D8\u91CF\u548C\u8D4B\u503C', '\u51FD\u6570\u5B9A\u4E49\u548C\u8C03\u7528', '\u5B57\u7B26\u4E32\u62FC\u63A5', 'input()\u83B7\u53D6\u8F93\u5165'],
    description:
      '\u4E00\u4E2A\u53EF\u4EE5\u751F\u6210\u968F\u673A\u5F3A\u5BC6\u7801\u7684\u547D\u4EE4\u884C\u5C0F\u5DE5\u5177\u3002\u7528\u6237\u6307\u5B9A\u5BC6\u7801\u957F\u5EA6\u548C\u5305\u542B\u7684\u5B57\u7B26\u7C7B\u578B\uFF0C\u7A0B\u5E8F\u751F\u6210\u5E76\u8F93\u51FA\u5B89\u5168\u5BC6\u7801\u3002\u9644\u5E26\u5BC6\u7801\u5F3A\u5EA6\u68C0\u6D4B\u529F\u80FD\u3002',
    whyThisProject:
      '\u96F6\u5916\u90E8\u4F9D\u8D56\uFF0C\u5B89\u88C5Python\u5C31\u80FD\u8DD1\u3002\u6D89\u53CA\u968F\u673A\u6570\u3001\u5B57\u7B26\u4E32\u5904\u7406\u3001\u7528\u6237\u8F93\u5165\u9A8C\u8BC1\u7B49\u591A\u4E2A\u57FA\u7840\u77E5\u8BC6\u70B9\u3002\u5B9E\u7528\u4EF7\u503C\u9AD8\u2014\u2014\u6BCF\u4E2A\u4EBA\u90FD\u9700\u8981\u5BC6\u7801\u3002\u4EE3\u7801\u77ED\u4F46\u529F\u80FD\u5B8C\u6574\uFF0C1\u5C0F\u65F6\u5185\u80FD\u770B\u5230\u6210\u679C\u3002',
    image: '/project-password.jpg',
    resumeText:
      '\u4F7F\u7528Python\u5185\u7F6erandom/string\u6A21\u5757\u5B9E\u73B0\u5F3A\u5BC6\u7801\u751F\u6210\u7B97\u6CD5\uFF1B\u652F\u6301\u81EA\u5B9A\u4E49\u5BC6\u7801\u957F\u5EA6\u548C\u5B57\u7B26\u7C7B\u578B\uFF08\u5927\u5199/\u5C0F\u5199/\u6570\u5B57/\u7B26\u53F7\uFF09\uFF1B\u5B9E\u73B0\u5BC6\u7801\u5F3A\u5EA6\u8BC4\u4F30\u529F\u80FD\uFF0C\u57FA\u4E8E\u957F\u5EA6\u548C\u5B57\u7B26\u591A\u6837\u6027\u8FDB\u884C\u5206\u7EA7\u8BC4\u5206\u3002',
    resumeTags: ['Python\u57FA\u7840', '\u5B57\u7B26\u4E32\u5904\u7406', '\u7528\u6237\u4EA4\u4E92\u8BBE\u8BA1'],
    steps: [
      {
        title: '\u5BFC\u5165\u6A21\u5757\uFF0C\u5B9A\u4E49\u5B57\u7B26\u96C6\u5408',
        time: '15\u5206\u949F',
        code: `import random\nimport string\n\n# \u5B9A\u4E49\u56DB\u79CD\u5B57\u7B26\u96C6\nlowercase = string.ascii_lowercase\nuppercase = string.ascii_uppercase\ndigits = string.digits\nsymbols = string.punctuation`,
        explanation:
          '\u5BFC\u5165random\u548Cstring\u4E24\u4E2A\u5185\u7F6E\u6A21\u5757\u3002string\u6A21\u5757\u63D0\u4F9B\u4E86\u9884\u8BBE\u7684\u5B57\u7B26\u96C6\u5408\uFF0C\u907F\u514D\u624B\u5199a-z\u3001A-Z\u7B49\u3002',
      },
      {
        title: '\u5B9E\u73B0\u5BC6\u7801\u751F\u6210\u51FD\u6570',
        time: '20\u5206\u949F',
        code: `def generate_password(length=12, use_upper=True, use_digits=True, use_symbols=True):\n    chars = lowercase\n    if use_upper:   chars += uppercase\n    if use_digits:  chars += digits\n    if use_symbols: chars += symbols\n    \n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password`,
        explanation:
          '\u6839\u636E\u7528\u6237\u7684\u9009\u62E9\u62FC\u63A5\u5B57\u7B26\u96C6\uFF0C\u7136\u540E\u7528random.choice\u4ECE\u5B57\u7B26\u96C6\u4E2D\u968F\u673A\u9009\u53D6\u6307\u5B9A\u6570\u91CF\u7684\u5B57\u7B26\uFF0C\u6700\u540E\u62FC\u63A5\u6210\u5B57\u7B26\u4E32\u3002',
      },
      {
        title: '\u5B9E\u73B0\u5F3A\u5EA6\u68C0\u6D4B\u51FD\u6570',
        time: '20\u5206\u949F',
        code: `def check_strength(password):\n    score = 0\n    if len(password) >= 8:  score += 1\n    if len(password) >= 12: score += 1\n    if any(c.isupper() for c in password): score += 1\n    if any(c.isdigit() for c in password): score += 1\n    if any(c in symbols for c in password): score += 1\n    \n    if score <= 2: return "\u5F31"\n    if score <= 3: return "\u4E2D"\n    return "\u5F3A"`,
        explanation:
          '\u4ECE\u957F\u5EA6\u3001\u5927\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7B26\u53F7\u56DB\u4E2A\u7EF4\u5EA6\u8BC4\u5206\uFF0C\u6839\u636E\u603B\u5206\u8FD4\u56DE\u5F31/\u4E2D/\u5F3A\u7684\u8BC4\u7EA7\u3002',
      },
      {
        title: '\u4E3B\u83DC\u5355\u5FAA\u73AF',
        time: '15\u5206\u949F',
        code: `def main():\n    while True:\n        print("\\n=== \u5BC6\u7801\u751F\u6210\u5668 ===")\n        print("1. \u751F\u6210\u5BC6\u7801")\n        print("2. \u68C0\u6D4B\u5BC6\u7801\u5F3A\u5EA6")\n        print("3. \u9000\u51FA")\n        choice = input("\u8BF7\u9009\u62E9: ")\n        \n        if choice == "1":\n            length = int(input("\u5BC6\u7801\u957F\u5EA6: ") or "12")\n            pwd = generate_password(length)\n            print(f"\u751F\u6210\u5BC6\u7801: {pwd}")\n            print(f"\u5F3A\u5EA6: {check_strength(pwd)}")\n        elif choice == "2":\n            pwd = input("\u8F93\u5165\u5BC6\u7801: ")\n            print(f"\u5F3A\u5EA6: {check_strength(pwd)}")\n        else:\n            break\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '\u7528while True\u521B\u5EFA\u5FAA\u73AF\u83DC\u5355\uFF0C\u6839\u636E\u7528\u6237\u9009\u62E9\u8C03\u7528\u4E0D\u540C\u529F\u80FD\u3002input()\u83B7\u53D6\u7528\u6237\u8F93\u5165\uFF0Cif-elif\u5904\u7406\u4E0D\u540C\u9009\u9879\u3002',
      },
    ],
    keyConcepts: [
      { name: 'random\u6A21\u5757', description: 'Python\u5185\u7F6E\u968F\u673A\u6570\u751F\u6210\u6A21\u5757\uFF0Crandom.choice()\u4ECE\u5E8F\u5217\u4E2D\u968F\u673A\u9009\u53D6\u4E00\u4E2A\u5143\u7D20' },
      { name: 'string\u6A21\u5757', description: '\u63D0\u4F9B\u9884\u8BBE\u5B57\u7B26\u4E32\u5E38\u91CF\uFF1Aascii_lowercase, ascii_uppercase, digits, punctuation' },
      { name: '\u5217\u8868\u63A8\u5BFC\u5F0F', description: "''.join(random.choice(chars) for _ in range(length)) \u662F\u4E00\u79CD\u7B80\u6D01\u7684\u5FAA\u73AF\u5199\u6CD5" },
      { name: '\u51FD\u6570\u9ED8\u8BA4\u53C2\u6570', description: 'def generate_password(length=12, ...) \u8BA9\u53C2\u6570\u6709\u9ED8\u8BA4\u503C\uFF0C\u8C03\u7528\u65F6\u53EF\u4EE5\u7701\u7565' },
    ],
    faq: [
      { q: "NameError: name 'string' is not defined", a: '\u5FD8\u8BB0import string\u3002\u68C0\u67E5\u6587\u4EF6\u5F00\u5934\u662F\u5426\u6709\u5BFC\u5165\u8BED\u53E5\u3002' },
      { q: '\u751F\u6210\u7684\u5BC6\u7801\u5168\u662F\u5C0F\u5199', a: '\u7528\u6237\u53C2\u6570\u4F20\u9519\u3002\u68C0\u67E5\u51FD\u6570\u8C03\u7528\u65F6\u7684\u53C2\u6570\u503C\u662F\u5426\u4E3ATrue\u3002' },
      { q: '\u8F93\u5165\u957F\u5EA6\u65F6\u62A5\u9519\u9000\u51FA', a: '\u6CA1\u6709\u5904\u7406\u975E\u6570\u5B57\u8F93\u5165\u3002\u7528try/except\u5305\u88F9int()\u8F6C\u6362\u3002' },
    ],
    githubProjects: [
      { name: 'otter365/password-generator', stars: '~10', description: '\u6781\u7B80\u7248\u672C\uFF0C\u9002\u5408\u5BF9\u7167\u5B66\u4E60\u57FA\u7840\u903B\u8F91' },
      { name: 'Abeshdas/Password-Generator-GUI', stars: '~5', description: '\u7528Tkinter\u505A\u4E86\u56FE\u5F62\u754C\u9762\uFF0C\u5C55\u793A\u5982\u4F55\u4ECECLI\u5347\u7EA7\u5230GUI' },
    ],
    extensions: [
      { level: 1, text: '\u652F\u6301\u751F\u6210N\u4E2A\u5BC6\u7801\u7684\u6279\u91CF\u6A21\u5F0F', skill: '\u5FAA\u73AF+\u5217\u8868' },
      { level: 2, text: '\u5C06\u751F\u6210\u7684\u5BC6\u7801\u4FDD\u5B58\u5230txt\u6587\u4EF6', skill: '\u6587\u4EF6\u8BFB\u5199' },
      { level: 2, text: '\u7ED9\u7A0B\u5E8F\u52A0\u989C\u8272\u8F93\u51FA\uFF08colorama\u5E93\uFF09', skill: '\u7B2C\u4E09\u65B9\u5E93\u4F7F\u7528' },
      { level: 3, text: '\u7528Tkinter\u505A\u6210\u56FE\u5F62\u754C\u9762', skill: 'GUI\u7F16\u7A0B\u5165\u95E8' },
      { level: 4, text: '\u652F\u6301\u6613\u8BB0\u5BC6\u7801\u6A21\u5F0F\uFF08\u968F\u673A\u5355\u8BCD\u7EC4\u5408\uFF09', skill: '\u8BFB\u53D6\u6587\u4EF6+\u5355\u8BCD\u5217\u8868' },
    ],
  },
  'weather-cli': {
    slug: 'weather-cli',
    emoji: '\uD83C\uDF24\uFE0F',
    title: '\u547D\u4EE4\u884C\u5929\u6C14\u67E5\u8BE2\u5DE5\u5177',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-3\u5C0F\u65F6',
    lines: '~80\u884C',
    stack: ['Python + requests\u5E93 + wttr.in API'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['\u51FD\u6570', '\u5B57\u7B26\u4E32\u683C\u5F0F\u5316', '\u5B57\u5178\u8BBF\u95EE', 'pip\u5B89\u88C5\u5305'],
    description:
      '\u4E00\u4E2A\u547D\u4EE4\u884C\u5929\u6C14\u67E5\u8BE2\u5DE5\u5177\u3002\u7528\u6237\u8F93\u5165\u57CE\u5E02\u540D\uFF0C\u7A0B\u5E8F\u8C03\u7528\u514D\u8D39\u7684\u5929\u6C14API\u83B7\u53D6\u5B9E\u65F6\u5929\u6C14\u6570\u636E\uFF0C\u683C\u5F0F\u5316\u540E\u5728\u7EC8\u7AEF\u5C55\u793A\u3002',
    whyThisProject:
      '\u7B2C\u4E00\u6B21\u63A5\u89E6API\u6982\u5FF5\u2014\u2014\u8FD9\u662F\u73B0\u4EE3\u7F16\u7A0B\u6700\u6838\u5FC3\u7684\u6280\u80FD\u4E4B\u4E00\u3002\u5B66\u4F1A\u5B89\u88C5\u7B2C\u4E09\u65B9\u5E93\uFF08requests\uFF09\uFF0C\u5B66\u4F1A\u9605\u8BFBAPI\u6587\u6863\uFF0C\u7406\u89E3\u8BF7\u6C42-\u54CD\u5E94\u6A21\u578B\u3002',
    image: '/project-weather.jpg',
    resumeText:
      '\u8C03\u7528wttr.in\u5F00\u653E\u5929\u6C14API\uFF0C\u5B9E\u73B0\u57CE\u5E02\u5929\u6C14\u5B9E\u65F6\u67E5\u8BE2\u529F\u80FD\uFF1B\u4F7F\u7528requests\u5E93\u5904\u7406HTTP\u8BF7\u6C42\uFF0C\u5B9E\u73B0\u7F51\u7EDC\u5F02\u5E38\u6355\u83B7\u4E0E\u91CD\u8BD5\u673A\u5236\uFF1B\u8BBE\u8BA1\u6570\u636E\u89E3\u6790\u5C42\uFF0C\u5C06API\u539F\u59CB\u54CD\u5E94\u683C\u5F0F\u5316\u4E3A\u7ED3\u6784\u5316\u5929\u6C14\u4FE1\u606F\u3002',
    resumeTags: ['REST API\u8C03\u7528', 'HTTP\u534F\u8BAE\u57FA\u7840', '\u6570\u636E\u89E3\u6790'],
    steps: [
      {
        title: '\u5B89\u88C5requests\u5E93',
        time: '10\u5206\u949F',
        code: '# \u5728\u7EC8\u7AEF\u8FD0\u884C\npip install requests',
        explanation:
          'requests\u662FPython\u6700\u6D41\u884C\u7684HTTP\u5E93\uFF0C\u8BA9API\u8C03\u7528\u53D8\u5F97\u7B80\u5355\u3002',
      },
      {
        title: '\u53D1\u9001\u7B2C\u4E00\u4E2AAPI\u8BF7\u6C42',
        time: '20\u5206\u949F',
        code: `import requests\n\ndef get_weather(city):\n    url = f"https://wttr.in/{city}?format=%C|%t|%h"\n    try:\n        response = requests.get(url, timeout=5)\n        response.raise_for_status()\n        return response.text\n    except requests.RequestException as e:\n        return f"\u8BF7\u6C42\u5931\u8D25: {e}"`,
        explanation:
          '\u4F7F\u7528requests.get()\u53D1\u9001HTTP GET\u8BF7\u6C42\u3002timeout\u53C2\u6570\u9632\u6B62\u8BF7\u6C42\u5361\u4F4F\u3002raise_for_status()\u68C0\u67E5HTTP\u9519\u8BEF\u7801\u3002',
      },
      {
        title: '\u89E3\u6790\u548C\u683C\u5F0F\u5316\u6570\u636E',
        time: '30\u5206\u949F',
        code: `def parse_weather(raw_text):\n    parts = raw_text.strip().split("|")\n    if len(parts) >= 3:\n        return {\n            "condition": parts[0],\n            "temperature": parts[1],\n            "humidity": parts[2]\n        }\n    return None\n\ndef display_weather(data, city):\n    if data is None:\n        print("\u65E0\u6CD5\u89E3\u6790\u5929\u6C14\u6570\u636E")\n        return\n    print(f"\\n\uD83C\uDF0D {city} \u7684\u5F53\u524D\u5929\u6C14:")\n    print(f"  \u5929\u6C14\u72B6\u51B5: {data['condition']}")\n    print(f"  \u6E29\u5EA6: {data['temperature']}")\n    print(f"  \u6E7F\u5EA6: {data['humidity']}")`,
        explanation:
          '\u5C06API\u8FD4\u56DE\u7684\u7BA1\u9053\u5206\u9694\u6587\u672C\u89E3\u6790\u4E3A\u5B57\u5178\uFF0C\u7136\u540E\u7528\u683C\u5F0F\u5316\u8F93\u51FA\u5C55\u793A\u3002',
      },
      {
        title: '\u4E3B\u7A0B\u5E8F\u6574\u5408',
        time: '20\u5206\u949F',
        code: `def main():\n    print("=== \u547D\u4EE4\u884C\u5929\u6C14\u67E5\u8BE2 ===")\n    while True:\n        city = input("\\n\u8BF7\u8F93\u5165\u57CE\u5E02\u540D (\u6216\u8F93\u5165'\u9000\u51FA'): ").strip()\n        if city in ["\u9000\u51FA", "quit", "q"]:\n            break\n        if not city:\n            print("\u57CE\u5E02\u540D\u4E0D\u80FD\u4E3A\u7A7A")\n            continue\n        \n        raw = get_weather(city)\n        if raw.startswith("\u8BF7\u6C42\u5931\u8D25"):\n            print(raw)\n        else:\n            data = parse_weather(raw)\n            display_weather(data, city)\n\nif __name__ == "__main__":\n    main()`,
        explanation:
          '\u6574\u5408\u6240\u6709\u529F\u80FD\uFF0C\u6DFB\u52A0\u8F93\u5165\u9A8C\u8BC1\u548C\u5FAA\u73AF\u83DC\u5355\u3002\u7528.strip()\u53BB\u9664\u9996\u5C3E\u7A7A\u683C\uFF0C\u9632\u6B62\u7A7A\u8F93\u5165\u3002',
      },
    ],
    keyConcepts: [
      { name: 'API', description: '\u5E94\u7528\u7A0B\u5E8F\u63A5\u53E3\uFF0C\u901A\u8FC7URL\u5411\u670D\u52A1\u5668\u8BF7\u6C42\u6570\u636E\u7684\u6807\u51C6\u65B9\u5F0F' },
      { name: 'HTTP GET\u8BF7\u6C42', description: '\u4ECE\u670D\u52A1\u5668\u83B7\u53D6\u6570\u636E\u7684\u65B9\u6CD5\uFF0Crequests.get(url)\u662F\u6700\u7B80\u5355\u7684\u8C03\u7528\u65B9\u5F0F' },
      { name: '\u5F02\u5E38\u5904\u7406', description: '\u7528try/except\u6355\u83B7\u7F51\u7EDC\u8D85\u65F6\u3001\u8FDE\u63A5\u9519\u8BEF\u7B49\u95EE\u9898\uFF0C\u8BA9\u7A0B\u5E8F\u4E0D\u4F1A\u5D29\u6E83' },
      { name: '\u5B57\u5178\u8BBF\u95EE', description: "data['condition'] \u4ECE\u5B57\u5178\u4E2D\u53D6\u503C\uFF0C\u662F\u6700\u57FA\u7840\u7684\u6570\u636E\u7ED3\u6784\u64CD\u4F5C" },
    ],
    faq: [
      { q: "ModuleNotFoundError: No module named 'requests'", a: '\u6CA1\u5B89\u88C5requests\u5E93\u3002\u8FD0\u884C pip install requests\u3002' },
      { q: '\u8FD4\u56DE\u4E71\u7801\u6216\u7A7A\u5185\u5BB9', a: '\u57CE\u5E02\u540D\u62FC\u5199\u9519\u8BEF\u6216\u5305\u542B\u7279\u6B8A\u5B57\u7B26\u3002\u68C0\u67E5\u62FC\u5199\uFF0C\u5C1D\u8BD5\u82F1\u6587\u57CE\u5E02\u540D\u3002' },
      { q: '\u7A0B\u5E8F\u5361\u5F88\u4E45\u6CA1\u53CD\u5E94', a: '\u7F51\u7EDC\u8FDE\u63A5\u95EE\u9898\u3002\u7ED9requests.get()\u52A0timeout\u53C2\u6570\u3002' },
    ],
    githubProjects: [
      { name: 'ayushmandas29/weather-cli', stars: '~15', description: '\u975E\u5E38\u597D\u7684\u5B66\u4E60\u53C2\u8003\uFF0C\u9879\u76EE\u7ED3\u6784\u6E05\u6670\uFF0C\u6709requirements.txt\u548C\u5B8C\u6574README' },
      { name: 'tomi3-11/Python-beginner-CLI-projects', stars: '~50', description: '\u5305\u542B60+\u4E2ACLI\u9879\u76EE\u793A\u4F8B\uFF0C\u53EF\u4EE5\u770B\u5230\u540C\u4E00\u7C7B\u9879\u76EE\u7684\u591A\u79CD\u5B9E\u73B0\u65B9\u5F0F' },
    ],
    extensions: [
      { level: 1, text: '\u652F\u6301\u67E5\u8BE2\u672A\u67653\u5929\u5929\u6C14\u9884\u62A5', skill: 'API\u591A\u53C2\u6570\u8C03\u7528' },
      { level: 2, text: '\u7ED9\u8F93\u51FA\u52A0\u989C\u8272\u548Cemoji\u7F8E\u5316', skill: '\u7EC8\u7AEFUI\u7F8E\u5316' },
      { level: 2, text: '\u4FDD\u5B58\u67E5\u8BE2\u5386\u53F2\u5230\u672C\u5730\u6587\u4EF6', skill: '\u6587\u4EF6\u8BFB\u5199+\u6570\u636E\u6301\u4E45\u5316' },
      { level: 3, text: '\u6539\u7528OpenWeatherMap API\uFF08\u9700\u6CE8\u518C\u83B7\u53D6API Key\uFF09', skill: 'API\u8BA4\u8BC1\u673A\u5236' },
      { level: 4, text: '\u6DFB\u52A0\u81EA\u52A8\u5B9A\u4F4D\uFF08\u6839\u636EIP\u83B7\u53D6\u5F53\u524D\u57CE\u5E02\uFF09', skill: '\u66F4\u591AAPI\u7684\u94FE\u5F0F\u8C03\u7528' },
    ],
  },
  'file-renamer': {
    slug: 'file-renamer',
    emoji: '\uD83D\uDCC1',
    title: '\u6587\u4EF6\u6279\u91CF\u91CD\u547D\u540D\u5DE5\u5177',
    level: 1,
    levelLabel: 'Level 1',
    levelColor: 'from-[#E88B2E] to-[#B55A00]',
    time: '2-4\u5C0F\u65F6',
    lines: '~100\u884C',
    stack: ['Python + os/pathlib + re\u6B63\u5219'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['\u6587\u4EF6\u8DEF\u5F84\u6982\u5FF5', '\u5FAA\u73AF', '\u5B57\u7B26\u4E32\u64CD\u4F5C', '\u6B63\u5219\u8868\u8FBE\u5F0F\u57FA\u7840'],
    description:
      '\u5B9E\u7528\u7684\u6587\u4EF6\u6279\u91CF\u91CD\u547D\u540D\u5DE5\u5177\u3002\u53EF\u4EE5\u4E00\u6B21\u6027\u5C06\u6587\u4EF6\u5939\u4E2D\u7684\u6240\u6709\u6587\u4EF6\u6309\u89C4\u5219\u91CD\u547D\u540D\u2014\u2014\u52A0\u524D\u7F00\u3001\u6309\u5E8F\u53F7\u3001\u66FF\u6362\u6587\u5B57\u7B49\u3002',
    whyThisProject:
      '\u6781\u5F3A\u7684\u5B9E\u7528\u6027\u2014\u2014\u6BCF\u4E2A\u4EBA\u90FD\u4F1A\u9047\u5230\u6279\u91CF\u5904\u7406\u6587\u4EF6\u7684\u573A\u666F\u3002\u6DF1\u5165\u7406\u89E3\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C\uFF0C\u5F15\u5165\u6B63\u5219\u8868\u8FBE\u5F0F\u2014\u2014\u6587\u672C\u5904\u7406\u7684\u5229\u5668\u3002',
    image: '/project-rename.jpg',
    resumeText:
      '\u4F7F\u7528pathlib\u6A21\u5757\u5B9E\u73B0\u8DE8\u5E73\u53F0\u7684\u6587\u4EF6\u6279\u91CF\u91CD\u547D\u540D\u64CD\u4F5C\uFF1B\u652F\u6301\u524D\u7F00\u6DFB\u52A0\u3001\u5E8F\u53F7\u683C\u5F0F\u5316\u3001\u5B57\u7B26\u4E32\u66FF\u6362\u4E09\u79CD\u91CD\u547D\u540D\u6A21\u5F0F\uFF1B\u8BBE\u8BA1\u9884\u89C8\u786E\u8BA4\u673A\u5236\uFF0C\u9632\u6B62\u8BEF\u64CD\u4F5C\u3002',
    resumeTags: ['\u6587\u4EF6\u7CFB\u7EDF\u64CD\u4F5C', '\u8DEF\u5F84\u5904\u7406', '\u81EA\u52A8\u5316\u811A\u672C'],
    steps: [
      {
        title: '\u5217\u51FA\u6587\u4EF6\u5939\u4E2D\u7684\u6587\u4EF6',
        time: '15\u5206\u949F',
        code: `import os\nfrom pathlib import Path\n\ndef list_files(folder_path):\n    path = Path(folder_path)\n    if not path.exists():\n        print("\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!")\n        return []\n    \n    files = [f for f in path.iterdir() if f.is_file()]\n    return files`,
        explanation:
          '\u4F7F\u7528pathlib.Path\u5904\u7406\u6587\u4EF6\u8DEF\u5F84\uFF0Citerdir()\u904D\u5386\u76EE\u5F55\uFF0Cis_file()\u8FC7\u6EE4\u53EA\u4FDD\u7559\u6587\u4EF6\uFF08\u6392\u9664\u5B50\u6587\u4EF6\u5939\uFF09\u3002',
      },
      {
        title: '\u5B9E\u73B0\u91CD\u547D\u540D\u51FD\u6570',
        time: '30\u5206\u949F',
        code: `def add_prefix(files, prefix):\n    for f in files:\n        new_name = prefix + f.name\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")\n\ndef rename_with_index(files, prefix="file"):\n    for index, f in enumerate(files, start=1):\n        ext = f.suffix\n        new_name = f"{prefix}_{index:03d}{ext}"\n        new_path = f.parent / new_name\n        f.rename(new_path)\n        print(f"{f.name} -> {new_name}")`,
        explanation:
          'f.parent\u83B7\u53D6\u7236\u76EE\u5F55\uFF0Cf.suffix\u83B7\u53D6\u6269\u5C55\u540D\u3002{index:03d}\u683C\u5F0F\u5316\u4E3A001, 002\u7B49\u4E09\u4F4D\u6570\u5B57\u3002',
      },
      {
        title: '\u5B9E\u73B0\u66FF\u6362\u529F\u80FD\u548C\u9884\u89C8\u6A21\u5F0F',
        time: '30\u5206\u949F',
        code: `def replace_in_name(files, old, new):\n    for f in files:\n        if old in f.name:\n            new_name = f.name.replace(old, new)\n            new_path = f.parent / new_name\n            f.rename(new_path)\n            print(f"{f.name} -> {new_name}")\n\ndef preview_changes(files, operation, **kwargs):\n    print("\\n=== \u9884\u89C8\u6A21\u5F0F ===")\n    print("\u4EE5\u4E0B\u6587\u4EF6\u5C06\u88AB\u91CD\u547D\u540D:")\n    for f in files:\n        if operation == "prefix":\n            new_name = kwargs["prefix"] + f.name\n        print(f"  {f.name}  ->  {new_name}")\n    \n    confirm = input("\\n\u786E\u8BA4\u6267\u884C? (y/n): ").lower()\n    return confirm == 'y'`,
        explanation:
          '\u9884\u89C8\u6A21\u5F0F\u5148\u5C55\u793A\u5C06\u8981\u8FDB\u884C\u7684\u4FEE\u6539\uFF0C\u8BA9\u7528\u6237\u786E\u8BA4\u540E\u518D\u6267\u884C\u3002\u8FD9\u662F\u9632\u6B62\u8BEF\u64CD\u4F5C\u7684\u91CD\u8981\u8BBE\u8BA1\u3002',
      },
      {
        title: '\u4E3B\u83DC\u5355',
        time: '15\u5206\u949F',
        code: `def main():\n    print("=== \u6587\u4EF6\u6279\u91CF\u91CD\u547D\u540D\u5DE5\u5177 ===")\n    folder = input("\u8BF7\u8F93\u5165\u6587\u4EF6\u5939\u8DEF\u5F84: ")\n    files = list_files(folder)\n    \n    if not files:\n        print("\u6CA1\u6709\u627E\u5230\u6587\u4EF6")\n        return\n    \n    print(f"\\n\u627E\u5230 {len(files)} \u4E2A\u6587\u4EF6")\n    print("\\n1. \u6DFB\u52A0\u524D\u7F00\\n2. \u6309\u5E8F\u53F7\u91CD\u547D\u540D\\n3. \u66FF\u6362\u6587\u4EF6\u540D\u4E2D\u7684\u6587\u5B57")\n    \n    choice = input("\u8BF7\u9009\u62E9\u64CD\u4F5C: ")\n    if choice == "1":\n        prefix = input("\u8F93\u5165\u524D\u7F00: ")\n        if preview_changes(files, "prefix", prefix=prefix):\n            add_prefix(list_files(folder), prefix)\n    # ... \u5176\u4ED6\u9009\u9879`,
        explanation:
          '\u6574\u5408\u6240\u6709\u529F\u80FD\uFF0C\u6DFB\u52A0\u6587\u4EF6\u5B58\u5728\u68C0\u67E5\u548C\u9884\u89C8\u786E\u8BA4\u6D41\u7A0B\u3002\u6CE8\u610F\u91CD\u65B0\u83B7\u53D6\u6587\u4EF6\u5217\u8868\u56E0\u4E3A\u8DEF\u5F84\u5BF9\u8C61\u5728\u91CD\u547D\u540D\u540E\u4F1A\u5931\u6548\u3002',
      },
    ],
    keyConcepts: [
      { name: 'pathlib.Path', description: '\u9762\u5411\u5BF9\u8C61\u7684\u6587\u4EF6\u8DEF\u5F84\u5904\u7406\uFF0C\u6BD4os.path\u66F4\u76F4\u89C2\u3002\u652F\u6301/\u8FD0\u7B97\u7B26\u62FC\u63A5\u8DEF\u5F84\u3002' },
      { name: '\u6587\u4EF6\u91CD\u547D\u540D', description: 'path.rename(new_path)\u662F\u539F\u5B50\u64CD\u4F5C\uFF0C\u76F4\u63A5\u4FEE\u6539\u6587\u4EF6\u7CFB\u7EDF\u3002' },
      { name: '\u5217\u8868\u63A8\u5BFC\u5F0F', description: '[f for f in path.iterdir() if f.is_file()] \u7B80\u6D01\u7684\u8FC7\u6EE4\u8BED\u6CD5\u3002' },
      { name: '\u5B57\u7B26\u4E32\u683C\u5F0F\u5316', description: "f'{prefix}_{index:03d}' \u4E2D\u7684:03d\u8868\u793A3\u4F4D\u96F6\u586B\u5145\u6570\u5B57\u3002" },
    ],
    faq: [
      { q: 'FileNotFoundError', a: '\u6587\u4EF6\u5939\u8DEF\u5F84\u9519\u8BEF\u3002\u7528Path()\u5904\u7406\u8DEF\u5F84\uFF0C\u652F\u6301/\u8DE8\u5E73\u53F0\u3002' },
      { q: '\u91CD\u547D\u540D\u540E\u6587\u4EF6\u540D\u51B2\u7A81', a: '\u4E24\u4E2A\u6587\u4EF6\u91CD\u547D\u540D\u540E\u53EF\u80FD\u540C\u540D\u3002\u5148\u68C0\u67E5\u76EE\u6807\u6587\u4EF6\u540D\u662F\u5426\u5DF2\u5B58\u5728\u3002' },
      { q: '\u9690\u85CF\u6587\u4EF6\u88AB\u4FEE\u6539', a: '\u6CA1\u6709\u8FC7\u6EE4\u9690\u85CF\u6587\u4EF6\u3002\u52A0\u6761\u4EF6 not f.name.startswith(\'.\')\u3002' },
    ],
    githubProjects: [
      { name: 'tomi3-11/Python-beginner-CLI-projects', stars: '~50', description: '\u5305\u542B\u6587\u4EF6\u64CD\u4F5C\u7C7B\u9879\u76EE\uFF0C\u53EF\u4EE5\u5B66\u4E60\u4E0D\u540C\u7684\u6587\u4EF6\u5904\u7406\u6A21\u5F0F' },
    ],
    extensions: [
      { level: 1, text: '\u652F\u6301\u9012\u5F52\u5904\u7406\u5B50\u6587\u4EF6\u5939', skill: '\u9012\u5F52/\u6808\u904D\u5386\u76EE\u5F55\u6811' },
      { level: 2, text: '\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u5339\u914D\u6587\u4EF6\u540D\u6A21\u5F0F', skill: 're\u6A21\u5757\u4F7F\u7528' },
      { level: 2, text: '\u652F\u6301\u64A4\u9500\u64CD\u4F5C\uFF08\u8BB0\u5F55\u539F\u59CB\u6587\u4EF6\u540D\uFF09', skill: '\u65E5\u5FD7/\u72B6\u6001\u7BA1\u7406' },
      { level: 3, text: '\u6309\u6587\u4EF6\u4FEE\u6539\u65E5\u671F\u91CD\u547D\u540D', skill: 'os.path.getmtime()' },
      { level: 4, text: '\u7528Tkinter\u505A\u56FE\u5F62\u754C\u9762\uFF08\u62D6\u62FD\u6587\u4EF6\u5939\uFF09', skill: 'GUI+\u6587\u4EF6\u64CD\u4F5C\u7ED3\u5408' },
    ],
  },
  'github-profile': {
    slug: 'github-profile',
    emoji: '\uD83D\uDD0D',
    title: 'GitHub\u7528\u6237\u8D44\u6599\u67E5\u8BE2\u7AD9',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '3-5\u5C0F\u65F6',
    lines: '~150\u884C',
    stack: ['HTML5 + CSS3 + JavaScript + Fetch API'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['HTML\u57FA\u7840\u6807\u7B7E', 'CSS\u9009\u62E9\u5668', 'JS\u53D8\u91CF\u548C\u51FD\u6570', 'DOM\u64CD\u4F5C'],
    description:
      '\u7EAF\u524D\u7AEF\u7684\u7F51\u9875\u5E94\u7528\u3002\u7528\u6237\u8F93\u5165GitHub\u7528\u6237\u540D\uFF0C\u9875\u9762\u8C03\u7528GitHub\u5F00\u653EAPI\u83B7\u53D6\u516C\u5F00\u8D44\u6599\uFF0C\u4EE5\u7F8E\u89C2\u7684\u5361\u7247\u5F62\u5F0F\u5C55\u793A\u3002',
    whyThisProject:
      '\u7B2C\u4E00\u6B21\u505A\u51FA\u770B\u5F97\u89C1\u6478\u5F97\u7740\u7684\u7F51\u9875\u5E94\u7528\u3002\u7B2C\u4E00\u6B21\u5728\u524D\u7AEF\u8C03\u7528API\u3002\u53EF\u4EE5\u90E8\u7F72\u5230GitHub Pages\u2014\u2014\u771F\u6B63\u4E0A\u7EBF\u4E00\u4E2A\u7F51\u7AD9\u3002\u9762\u8BD5\u5B98\u53EF\u4EE5\u76F4\u63A5\u6253\u5F00\u94FE\u63A5\u770B\u6548\u679C\u3002',
    image: '/project-github.jpg',
    resumeText:
      '\u7EAF\u524D\u7AEF\u5B9E\u73B0GitHub\u7528\u6237\u8D44\u6599\u5B9E\u65F6\u67E5\u8BE2\u4E0E\u5C55\u793A\uFF0C\u8C03\u7528GitHub REST API\u83B7\u53D6\u516C\u5F00\u6570\u636E\uFF1B\u4F7F\u7528\u539F\u751FFetch API\u914D\u5408async/await\u5B9E\u73B0\u5F02\u6B65\u6570\u636E\u83B7\u53D6\u4E0E\u9519\u8BEF\u5904\u7406\uFF1B\u8BBE\u8BA1\u54CD\u5E94\u5F0F\u5361\u7247\u5E03\u5C40\uFF0C\u9002\u914D\u684C\u9762\u7AEF\u548C\u79FB\u52A8\u7AEF\u6D4F\u89C8\u3002',
    resumeTags: ['DOM\u64CD\u4F5C', 'Fetch API', '\u5F02\u6B65\u7F16\u7A0B', '\u54CD\u5E94\u5F0F\u5E03\u5C40'],
    steps: [
      {
        title: 'HTML\u7ED3\u6784',
        time: '30\u5206\u949F',
        code: `<div class="search-box">\n  <input type="text" id="username" placeholder="\u8F93\u5165GitHub\u7528\u6237\u540D...">\n  <button onclick="searchUser()">\u67E5\u8BE2</button>\n</div>\n<div id="profile" class="profile-card" style="display:none;">\n  <img id="avatar" src="" alt="\u5934\u50CF">\n  <h2 id="name"></h2>\n  <p id="bio"></p>\n  <div class="stats">\n    <span>\u4ED3\u5E93: <b id="repos"></b></span>\n    <span>\u7C89\u4E1D: <b id="followers"></b></span>\n  </div>\n  <a id="link" href="#" target="_blank">\u67E5\u770BGitHub\u4E3B\u9875</a>\n</div>`,
        explanation:
          '\u6784\u5EFA\u57FA\u672C\u7684HTML\u9AA8\u67B6\u3002input\u83B7\u53D6\u7528\u6237\u8F93\u5165\uFF0Cbutton\u89E6\u53D1\u641C\u7D22\uFF0Cprofile-card\u5C55\u793A\u7ED3\u679C\u3002',
      },
      {
        title: 'CSS\u6837\u5F0F',
        time: '45\u5206\u949F',
        code: `/* \u6838\u5FC3\u6837\u5F0F */\n.profile-card {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.profile-card img {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;\n}\n.stats {\n  display: flex;\n  gap: 24px;\n}`,
        explanation:
          '\u7528flexbox\u5E03\u5C40\uFF0Cborder-radius\u505A\u5706\u89D2\uFF0Cbox-shadow\u6DFB\u52A0\u9634\u5F71\u3002\u767D\u8272\u5361\u7247\u5728\u7070\u8272\u80CC\u666F\u4E0A\u7A81\u51FA\u3002',
      },
      {
        title: 'JavaScript API\u8C03\u7528',
        time: '45\u5206\u949F',
        code: `const API_URL = 'https://api.github.com/users/';\n\nasync function searchUser() {\n    const username = document.getElementById('username').value.trim();\n    if (!username) { showError('\u8BF7\u8F93\u5165\u7528\u6237\u540D'); return; }\n    \n    try {\n        const response = await fetch(API_URL + username);\n        if (response.status === 404) throw new Error('\u7528\u6237\u4E0D\u5B58\u5728');\n        if (!response.ok) throw new Error('\u8BF7\u6C42\u5931\u8D25');\n        \n        const data = await response.json();\n        displayProfile(data);\n    } catch (err) {\n        showError(err.message);\n    }\n}\n\nfunction displayProfile(data) {\n    document.getElementById('avatar').src = data.avatar_url;\n    document.getElementById('name').textContent = data.name || data.login;\n    document.getElementById('bio').textContent = data.bio || '\u6682\u65E0\u7B80\u4ECB';\n    document.getElementById('repos').textContent = data.public_repos;\n    document.getElementById('followers').textContent = data.followers;\n    document.getElementById('link').href = data.html_url;\n    document.getElementById('profile').style.display = 'block';\n}`,
        explanation:
          "\u4F7F\u7528Fetch API\u53D1\u9001\u5F02\u6B65\u8BF7\u6C42\uFF0Casync/await\u8BA9\u5F02\u6B65\u4EE3\u7801\u66F4\u6613\u8BFB\u3002getElementById\u83B7\u53D6DOM\u5143\u7D20\uFF0C\u76F4\u63A5\u4FEE\u6539\u5C5E\u6027\u548C\u5185\u5BB9\u3002",
      },
    ],
    keyConcepts: [
      { name: 'DOM\u64CD\u4F5C', description: "document.getElementById()\u83B7\u53D6\u5143\u7D20\uFF0C\u4FEE\u6539textContent/src/href\u7B49\u5C5E\u6027\u3002" },
      { name: 'Fetch API', description: '\u73B0\u4EE3JS\u7684\u6807\u51C6HTTP\u8BF7\u6C42\u65B9\u5F0F\uFF0C\u8FD4\u56DEPromise\uFF0C\u914D\u5408async/await\u4F7F\u7528\u3002' },
      { name: 'async/await', description: '\u5904\u7406\u5F02\u6B65\u64CD\u4F5C\u7684\u8BED\u6CD5\u7CD6\uFF0C\u8BA9\u5F02\u6B65\u4EE3\u7801\u770B\u8D77\u6765\u50CF\u540C\u6B65\u7684\uFF0C\u66F4\u6613\u8BFB\u3002' },
      { name: 'JSON\u89E3\u6790', description: 'response.json()\u81EA\u52A8\u5C06API\u8FD4\u56DE\u7684JSON\u5B57\u7B26\u4E32\u8F6C\u4E3AJS\u5BF9\u8C61\u3002' },
      { name: '\u9519\u8BEF\u5904\u7406', description: 'response.ok\u68C0\u67E5HTTP\u72B6\u6001\uFF0Ctry/catch\u6355\u83B7\u7F51\u7EDC\u5F02\u5E38\u3002' },
    ],
    faq: [
      { q: '\u9875\u9762\u7A7A\u767D\uFF0C\u4EC0\u4E48\u90FD\u6CA1\u663E\u793A', a: 'JS\u4EE3\u7801\u6709\u8BED\u6CD5\u9519\u8BEF\u3002\u6253\u5F00\u6D4F\u89C8\u5668F12\u63A7\u5236\u53F0\u770B\u62A5\u9519\u4FE1\u606F\u3002' },
      { q: 'API\u8BF7\u6C42\u5931\u8D25\uFF0C\u62A5CORS\u9519\u8BEF', a: 'GitHub API\u652F\u6301\u8DE8\u57DF\uFF0C\u901A\u5E38\u662F\u7F51\u7EDC\u95EE\u9898\u3002\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u3002' },
      { q: '\u5934\u50CF\u663E\u793A\u4E0D\u51FA\u6765', a: 'avatar_url\u4E3A\u7A7A\u6216img\u6807\u7B7Esrc\u8BBE\u7F6E\u9519\u8BEF\u3002\u68C0\u67E5API\u8FD4\u56DE\u7684\u6570\u636E\u7ED3\u6784\u3002' },
      { q: '\u6837\u5F0F\u6CA1\u751F\u6548', a: 'CSS\u6587\u4EF6\u8DEF\u5F84\u9519\u8BEF\u6216\u6CA1\u88AB\u5F15\u5165\u3002\u68C0\u67E5<link>\u6807\u7B7E\u7684href\u8DEF\u5F84\u3002' },
    ],
    githubProjects: [
      { name: '\u672C\u9879\u76EE\u672C\u8EAB\u5C31\u662F\u6700\u597D\u7684\u8D77\u70B9', stars: '\u4F60\u7684', description: '\u5B8C\u6210\u540E\u53EF\u76F4\u63A5\u4F5C\u4E3AGitHub\u4ED3\u5E93\u5C55\u793A' },
    ],
    extensions: [
      { level: 1, text: '\u5C55\u793A\u7528\u6237\u7684\u6700\u8FD1\u4ED3\u5E93\u5217\u8868', skill: 'API\u5D4C\u5957\u8C03\u7528' },
      { level: 2, text: '\u6DFB\u52A0\u641C\u7D22\u5386\u53F2\uFF08localStorage\u4FDD\u5B58\uFF09', skill: '\u6D4F\u89C8\u5668\u672C\u5730\u5B58\u50A8' },
      { level: 2, text: '\u6697\u8272\u6A21\u5F0F\u5207\u6362', skill: 'CSS\u53D8\u91CF+\u4E3B\u9898\u5207\u6362' },
      { level: 3, text: '\u5C55\u793A\u7528\u6237\u7684\u8D21\u732E\u70ED\u529B\u56FE', skill: '\u56FE\u7247\u5D4C\u5165+\u6570\u636E\u5904\u7406' },
      { level: 4, text: '\u652F\u6301\u5BF9\u6BD4\u4E24\u4E2A\u7528\u6237\u7684\u6570\u636E', skill: '\u590D\u6742UI\u5E03\u5C40' },
    ],
  },
  'todo-app': {
    slug: 'todo-app',
    emoji: '\u2705',
    title: '\u5F85\u529E\u4E8B\u9879\u7BA1\u7406\u7F51\u9875',
    level: 2,
    levelLabel: 'Level 2',
    levelColor: 'from-[#C07BA0] to-[#9B5A7D]',
    time: '4-6\u5C0F\u65F6',
    lines: '~200\u884C',
    stack: ['HTML5 + CSS3 + JavaScript + LocalStorage'],
    stackColor: 'bg-[#FDF3E8] text-[#B55A00]',
    prerequisites: ['DOM\u64CD\u4F5C', '\u4E8B\u4EF6\u76D1\u542C', '\u6570\u7EC4\u64CD\u4F5C', 'JSON\u57FA\u7840'],
    description:
      '\u529F\u80FD\u5B8C\u6574\u7684\u5F85\u529E\u4E8B\u9879(TODO)\u7BA1\u7406\u7F51\u9875\u5E94\u7528\u3002\u53EF\u4EE5\u6DFB\u52A0\u4EFB\u52A1\u3001\u6807\u8BB0\u5B8C\u6210\u3001\u5220\u9664\u4EFB\u52A1\u3001\u7B5B\u9009\u67E5\u770B\uFF0C\u6570\u636E\u4FDD\u5B58\u5728\u6D4F\u89C8\u5668\u672C\u5730\u3002',
    whyThisProject:
      '\u7B2C\u4E00\u6B21\u5B9E\u73B0\u5B8C\u6574\u7684CRUD\uFF08\u589E\u5220\u6539\u67E5\uFF09\u64CD\u4F5C\u3002\u7B2C\u4E00\u6B21\u4F7F\u7528\u6D4F\u89C8\u5668\u672C\u5730\u5B58\u50A8\uFF08LocalStorage\uFF09\u3002\u662F\u6240\u6709\u73B0\u4EE3Web\u5E94\u7528\u7684\u6700\u5C0F\u539F\u578B\u3002',
    image: '/project-todo.jpg',
    resumeText:
      '\u5B9E\u73B0\u5B8C\u6574\u7684\u4EFB\u52A1\u589E\u5220\u6539\u67E5(CRUD)\u529F\u80FD\uFF0C\u652F\u6301\u4EFB\u52A1\u5B8C\u6210\u72B6\u6001\u5207\u6362\u4E0E\u7B5B\u9009\u67E5\u770B\uFF1B\u4F7F\u7528LocalStorage\u5B9E\u73B0\u6D4F\u89C8\u5668\u7AEF\u6570\u636E\u6301\u4E45\u5316\uFF0C\u5237\u65B0\u9875\u9762\u6570\u636E\u4E0D\u4E22\u5931\uFF1B\u8BBE\u8BA1\u6E10\u53D8\u80CC\u666F+\u5361\u7247\u5F0F\u5E03\u5C40\uFF0C\u652F\u6301\u5168\u90E8/\u8FDB\u884C\u4E2D/\u5DF2\u5B8C\u6210\u4E09\u79CD\u7B5B\u9009\u89C6\u56FE\u3002',
    resumeTags: ['DOM\u64CD\u4F5C', '\u4E8B\u4EF6\u9A71\u52A8\u7F16\u7A0B', 'LocalStorage', 'CRUD\u8BBE\u8BA1'],
    steps: [
      {
        title: 'HTML\u7ED3\u6784',
        time: '30\u5206\u949F',
        code: `<div class="container">\n  <h1>\u2705 \u5F85\u529E\u4E8B\u9879</h1>\n  <div class="input-area">\n    <input type="text" id="taskInput" placeholder="\u6DFB\u52A0\u65B0\u4EFB\u52A1...">\n    <button onclick="addTask()">+</button>\n  </div>\n  <div class="filters">\n    <button class="filter-btn active" onclick="setFilter('all')">\u5168\u90E8</button>\n    <button class="filter-btn" onclick="setFilter('active')">\u8FDB\u884C\u4E2D</button>\n    <button class="filter-btn" onclick="setFilter('completed')">\u5DF2\u5B8C\u6210</button>\n  </div>\n  <ul id="taskList"></ul>\n  <div class="stats" id="stats"></div>\n</div>`,
        explanation:
          '\u6784\u5EFA\u5B8C\u6574HTML\u9AA8\u67B6\uFF1A\u8F93\u5165\u533A\u57DF\u3001\u7B5B\u9009\u6309\u94AE\u3001\u4EFB\u52A1\u5217\u8868\u3001\u7EDF\u8BA1\u533A\u57DF\u3002',
      },
      {
        title: 'CSS\u6837\u5F0F\uFF08\u6838\u5FC3\uFF09',
        time: '45\u5206\u949F',
        code: `/* \u6838\u5FC3\u6837\u5F0F */\n#taskList li {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  border-bottom: 1px solid #f0f0f0;\n  gap: 10px;\n}\n#taskList li span.completed {\n  text-decoration: line-through;\n  color: #999;\n}\n.filter-btn.active {\n  background: #667eea;\n  color: white;\n}\n.delete-btn {\n  background: none;\n  border: none;\n  color: #ff6b6b;\n  cursor: pointer;\n}`,
        explanation:
          '\u7528flexbox\u6392\u5217\u4EFB\u52A1\u9879\uFF0C.completed\u7C7B\u6DFB\u52A0\u5220\u9664\u7EBF\u6548\u679C\uFF0C.active\u7C7B\u9AD8\u4EAE\u5F53\u524D\u7B5B\u9009\u6309\u94AE\u3002',
      },
      {
        title: 'JavaScript\u6838\u5FC3\u903B\u8F91',
        time: '90\u5206\u949F',
        code: `let tasks = [];\nlet currentFilter = 'all';\n\nfunction loadTasks() {\n  const saved = localStorage.getItem('todo_tasks');\n  if (saved) tasks = JSON.parse(saved);\n  render();\n}\nfunction saveTasks() {\n  localStorage.setItem('todo_tasks', JSON.stringify(tasks));\n}\n\nfunction addTask() {\n  const input = document.getElementById('taskInput');\n  const text = input.value.trim();\n  if (!text) return;\n  tasks.push({ id: Date.now(), text, completed: false });\n  input.value = '';\n  saveTasks(); render();\n}\n\nfunction toggleTask(id) {\n  const task = tasks.find(t => t.id === id);\n  if (task) { task.completed = !task.completed; saveTasks(); render(); }\n}\n\nfunction deleteTask(id) {\n  tasks = tasks.filter(t => t.id !== id); saveTasks(); render(); }\n\nfunction render() {\n  const list = document.getElementById('taskList');\n  list.innerHTML = '';\n  let filtered = tasks;\n  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);\n  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);\n  \n  filtered.forEach(task => {\n    const li = document.createElement('li');\n    li.innerHTML = \`<input type="checkbox" \${task.completed ? 'checked' : ''} onchange="toggleTask(\${task.id})">\n      <span class="\${task.completed ? 'completed' : ''}">\${task.text}</span>\n      <button class="delete-btn" onclick="deleteTask(\${task.id})">\uD83D\uDDD1\uFE0F</button>\`;\n    list.appendChild(li);\n  });\n  document.getElementById('stats').textContent = \`\u5171 \${tasks.length} \u4E2A\u4EFB\u52A1\uFF0C\u5DF2\u5B8C\u6210 \${tasks.filter(t => t.completed).length} \u4E2A\`;\n}`,
        explanation:
          '\u8FD9\u662F\u6838\u5FC3CRUD\u903B\u8F91\uFF1AloadTasks\u4ECElocalStorage\u8BFB\u53D6\uFF0CsaveTasks\u4FDD\u5B58\uFF0Cadd/toggle/delete\u4FEE\u6539\u6570\u636E\u540E\u8C03\u7528render\u5237\u65B0UI\u3002render\u6839\u636EcurrentFilter\u8FC7\u6EE4\u5E76\u91CD\u65B0\u6E32\u67D3\u5217\u8868\u3002',
      },
    ],
    keyConcepts: [
      { name: 'CRUD', description: '\u589E(addTask) / \u67E5(render) / \u6539(toggleTask) / \u5220(deleteTask) \u2014 \u6240\u6709\u5E94\u7528\u7684\u57FA\u7840\u64CD\u4F5C\u6A21\u5F0F\u3002' },
      { name: 'LocalStorage', description: '\u6D4F\u89C8\u5668\u5185\u7F6E\u7684\u952E\u503C\u5BF9\u5B58\u50A8\uFF0ClocalStorage.setItem/getItem\u5B9E\u73B0\u6570\u636E\u6301\u4E45\u5316\u3002' },
      { name: 'JSON\u5E8F\u5217\u5316', description: 'JSON.stringify\u5C06JS\u5BF9\u8C61\u8F6C\u4E3A\u5B57\u7B26\u4E32\u5B58\u50A8\uFF0CJSON.parse\u8F6C\u56DE\u5BF9\u8C61\u3002' },
      { name: '\u6570\u7EC4\u65B9\u6CD5', description: 'push\u6DFB\u52A0\u3001filter\u8FC7\u6EE4\u3001find\u67E5\u627E\u3001forEach\u904D\u5386 \u2014 \u6700\u5E38\u7528\u7684\u9AD8\u9636\u51FD\u6570\u3002' },
      { name: '\u4E8B\u4EF6\u76D1\u542C', description: 'onclick/onchange\u76F4\u63A5\u7ED1\u5B9A\uFF0CaddEventListener\u66F4\u7075\u6D3B\u3002\u4E8B\u4EF6\u9A71\u52A8\u662F\u524D\u7AEF\u7684\u6838\u5FC3\u6A21\u5F0F\u3002' },
    ],
    faq: [
      { q: '\u5237\u65B0\u540E\u4EFB\u52A1\u4E22\u5931', a: '\u6CA1\u6709\u8C03\u7528saveTasks()\u6216loadTasks()\u3002\u786E\u4FDD\u6BCF\u4E2A\u4FEE\u6539\u64CD\u4F5C\u540E\u4FDD\u5B58\uFF0C\u9875\u9762\u52A0\u8F7D\u65F6\u8BFB\u53D6\u3002' },
      { q: 'localStorage\u62A5\u9519', a: '\u67D0\u4E9B\u6D4F\u89C8\u5668\u9690\u79C1\u6A21\u5F0F\u4E0B\u7981\u7528\u3002\u7528try/catch\u5305\u88F9localStorage\u64CD\u4F5C\u3002' },
      { q: '\u5220\u9664wrong\u7684\u4EFB\u52A1', a: 'ID\u5339\u914D\u9519\u8BEF\u3002\u786E\u8BA4filter(t => t.id !== id)\u903B\u8F91\u6B63\u786E\u3002' },
      { q: '\u56DE\u8F66\u6CA1\u53CD\u5E94', a: '\u4E8B\u4EF6\u76D1\u542C\u6CA1\u6709\u6B63\u786E\u7ED1\u5B9A\u3002\u68C0\u67E5addEventListener\u662F\u5426\u5728DOM\u52A0\u8F7D\u540E\u6267\u884C\u3002' },
    ],
    githubProjects: [
      { name: '\u672C\u9879\u76EE\u5B8C\u6210\u540E\u5EFA\u8BAE\u4F5C\u4E3A\u72EC\u7ACB\u4ED3\u5E93\u7EF4\u62A4', stars: '\u4F60\u7684', description: '\u8FD9\u662F\u524D\u7AEF\u9762\u8BD5\u6700\u5E38\u95EE\u7684\u9879\u76EE\u7C7B\u578B\u4E4B\u4E00' },
    ],
    extensions: [
      { level: 1, text: '\u6DFB\u52A0\u4EFB\u52A1\u7F16\u8F91\u529F\u80FD\uFF08\u53CC\u51FB\u4FEE\u6539\uFF09', skill: '\u590D\u6742DOM\u64CD\u4F5C' },
      { level: 2, text: '\u4EFB\u52A1\u62D6\u62FD\u6392\u5E8F', skill: 'HTML5 Drag and Drop API' },
      { level: 2, text: '\u6DFB\u52A0\u4EFB\u52A1\u4F18\u5148\u7EA7\uFF08\u9AD8/\u4E2D/\u4F4E\uFF09+ \u6309\u4F18\u5148\u7EA7\u6392\u5E8F', skill: '\u6570\u636E\u7ED3\u6784+\u6392\u5E8F' },
      { level: 3, text: '\u6DFB\u52A0\u4EFB\u52A1\u622A\u6B62\u65E5\u671F\uFF0C\u663E\u793A\u662F\u5426\u903E\u671F', skill: 'Date\u5BF9\u8C61\u5904\u7406' },
      { level: 4, text: '\u7528React/Vue\u91CD\u5199\u6574\u4E2A\u9879\u76EE', skill: '\u524D\u7AEF\u6846\u67B6\u5165\u95E8' },
    ],
  },
}

/* ──────────────────── helpers ──────────────────── */

const slugs = Object.keys(projectDetails)

function getPrevSlug(current: string): string | null {
  const idx = slugs.indexOf(current)
  return idx > 0 ? slugs[idx - 1] : null
}

function getNextSlug(current: string): string | null {
  const idx = slugs.indexOf(current)
  return idx < slugs.length - 1 ? slugs[idx + 1] : null
}

/* ──────────────── syntax highlighter ──────────────── */

function highlightCode(code: string): string {
  // Simple syntax highlighting for Python/JS
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments (must be first)
  html = html.replace(
    /(#.*$)/gm,
    '<span class="text-[#8A8A8A]">$1</span>',
  )

  // Strings
  html = html.replace(
    /(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g,
    '<span class="text-[#E88B2E]">$1</span>',
  )

  // Keywords
  const keywords = [
    'import',
    'from',
    'def',
    'return',
    'if',
    'else',
    'elif',
    'for',
    'in',
    'while',
    'True',
    'False',
    'None',
    'try',
    'except',
    'async',
    'await',
    'const',
    'let',
    'var',
    'function',
    'class',
    'new',
    'this',
  ]
  const kwPattern = new RegExp(
    `\\b(${keywords.join('|')})\\b`,
    'g',
  )
  html = html.replace(kwPattern, '<span class="text-[#7BA37E]">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="text-[#F27B4C]">$1</span>')

  // Functions
  html = html.replace(
    /(\w+)(?=\()/g,
    '<span class="text-[#C07BA0]">$1</span>',
  )

  return html
}

/* ──────────────────── component ──────────────────── */

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const project = slug ? projectDetails[slug] : undefined

  const copyResume = useCallback(() => {
    if (!project) return
    navigator.clipboard.writeText(project.resumeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [project])

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpenStep(0)
    setOpenFaq(null)
    setCopied(false)
  }, [slug])

  /* ── not found ── */
  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HelpCircle className="mx-auto h-16 w-16 text-[#E5E0D5] mb-4" />
          <h1 className="font-display text-3xl font-bold text-[#2A2A2A] mb-4">
            项目未找到
          </h1>
          <p className="text-[#8A8A8A] mb-8">
            抱歉，我们找不到你访问的项目。请检查链接是否正确。
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回项目列表
          </Link>
        </motion.div>
      </div>
    )
  }

  const prevSlug = getPrevSlug(slug!)
  const nextSlug = getNextSlug(slug!)

  return (
    <div className="bg-[#F4EFE6]">
      {/* ── Hero Section ── */}
      <section className="pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-xs text-[#8A8A8A]"
          >
            <Link to="/" className="hover:text-[#E88B2E] transition-colors">
              首页
            </Link>
            {' > '}
            <Link
              to="/projects"
              className="hover:text-[#E88B2E] transition-colors"
            >
              项目库
            </Link>
            {' > '}
            <span className="text-[#4A4A4A]">{project.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div>
              {/* Level Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
              >
                <span
                  className={`inline-block rounded-full bg-gradient-to-r ${project.levelColor} px-4 py-1 text-xs font-semibold text-white mb-4`}
                >
                  {project.levelLabel}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="font-display text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4"
              >
                <span className="mr-3">{project.emoji}</span>
                {project.title}
              </motion.h1>

              {/* Meta Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF3E8] px-3 py-1 text-xs text-[#B55A00]">
                  <Clock className="h-3.5 w-3.5" />
                  {project.time}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF3E8] px-3 py-1 text-xs text-[#B55A00]">
                  <Code2 className="h-3.5 w-3.5" />
                  {project.lines}
                </span>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${project.stackColor}`}
                  >
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#4A4A4A] text-base leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>

              {/* Why This Project */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-xl bg-[#FDF3E8] p-5 mb-6"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-[#E88B2E] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-[#2A2A2A] mb-1">
                      为什么选这个项目
                    </h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      {project.whyThisProject}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#steps"
                  className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg hover:opacity-90"
                >
                  开始跟着做
                </a>
                {project.githubProjects.length > 0 && (
                  <a
                    href={`https://github.com/${project.githubProjects[0].name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#4A4A4A] border border-[#E5E0D5] bg-white transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    查看GitHub示例
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg bg-[#2A2A2A]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 md:h-80 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.4,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
                className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-md px-4 py-2 text-sm font-medium text-[#2A2A2A]"
              >
                <span className="text-[#E88B2E] font-bold">{project.lines}</span>{' '}
                行代码
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.4,
                  ease: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
                }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-md px-4 py-2 text-sm font-medium text-[#2A2A2A]"
              >
                <Clock className="inline h-3.5 w-3.5 text-[#E88B2E] mr-1" />
                {project.time}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Prerequisites Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              前置知识检查清单
            </h2>
            <div className="space-y-3">
              {project.prerequisites.map((pre, i) => (
                <motion.div
                  key={pre}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F0E9]">
                    <svg
                      className="h-3.5 w-3.5 text-[#7BA37E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-[#4A4A4A]">{pre}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Steps Section ── */}
      <section id="steps" className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl font-bold text-[#2A2A2A] mb-6">
              分步实现指南
            </h2>

            <div className="space-y-4">
              {project.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-xl border border-[#E5E0D5] bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenStep(openStep === i ? null : i)
                    }
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#FDF9F3]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#E88B2E] to-[#B55A00] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-[#2A2A2A]">
                        {step.title}
                      </h3>
                      <span className="text-xs text-[#8A8A8A]">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {step.time}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-[#8A8A8A] transition-transform duration-300 ${
                        openStep === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openStep === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#E5E0D5] p-5">
                          {/* Code Block */}
                          <div className="relative mb-4 rounded-lg bg-[#2A2A2A] p-4 overflow-x-auto">
                            <pre
                              className="font-mono text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: highlightCode(step.code),
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                navigator.clipboard.writeText(step.code)
                              }}
                              className="absolute right-3 top-3 rounded-md bg-white/10 p-1.5 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                              title="复制代码"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                          {/* Explanation */}
                          <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {step.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Concepts Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              涉及的关键概念
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {project.keyConcepts.map((concept, i) => (
                    <motion.tr
                      key={concept.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className={
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                      }
                    >
                      <td className="py-3 px-4 font-mono text-sm font-bold text-[#2A2A2A] whitespace-nowrap">
                        {concept.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#4A4A4A]">
                        {concept.description}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              常见错误排错
            </h2>
            <div className="space-y-3">
              {project.faq.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-lg border border-[#E5E0D5] overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === i ? null : i)
                    }
                    className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#FDF9F3]"
                  >
                    <HelpCircle className="h-5 w-5 shrink-0 text-[#E88B2E]" />
                    <span className="flex-1 text-sm font-semibold text-[#2A2A2A]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#8A8A8A] transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#E5E0D5] px-4 py-4 flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 shrink-0 text-[#7BA37E] mt-0.5" />
                          <p className="text-sm text-[#4A4A4A] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Resume Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl bg-[#E8F0E9] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-[#7BA37E]" />
              <h2 className="font-display text-xl font-semibold text-[#2A2A2A]">
                简历写法建议
              </h2>
            </div>
            <div className="rounded-lg bg-white border border-[#E5E0D5] p-5 mb-4">
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                {project.resumeText}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.resumeTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[#E8F0E9] px-3 py-1 text-xs font-medium text-[#5C8A5F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={copyResume}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E88B2E] to-[#B55A00] transition-all duration-300 hover:shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  复制到剪贴板
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── GitHub Projects Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              关联的GitHub项目
            </h2>
            <div className="space-y-3">
              {project.githubProjects.map((gp, i) => (
                <motion.a
                  key={gp.name}
                  href={`https://github.com/${gp.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 rounded-lg border border-[#E5E0D5] p-4 transition-all duration-200 hover:border-[#E88B2E] hover:shadow-md"
                >
                  <Github className="h-6 w-6 shrink-0 text-[#8A8A8A]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#2A2A2A] truncate">
                        {gp.name}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[#FDF3E8] px-2 py-0.5 text-xs text-[#B55A00]">
                        <Star className="mr-1 h-3 w-3" />
                        {gp.stars}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">
                      {gp.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#8A8A8A]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Extension Challenges Section ── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-[#E5E0D5] bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-[#2A2A2A] mb-4">
              扩展挑战（由易到难）
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E0D5]">
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A] w-24">
                      难度
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A]">
                      挑战
                    </th>
                    <th className="py-2 px-3 text-left text-xs font-semibold text-[#8A8A8A]">
                      你将学到
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.extensions.map((ext, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className={`${
                        i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'
                      } transition-colors hover:bg-[#FDF9F3]`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < ext.level
                                  ? 'text-[#E88B2E] fill-[#E88B2E]'
                                  : 'text-[#E5E0D5]'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-sm text-[#2A2A2A]">
                        {ext.text}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center rounded-full bg-[#E8F0E9] px-2.5 py-0.5 text-xs text-[#5C8A5F]">
                          {ext.skill}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom Navigation ── */}
      <section className="py-8 pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevSlug ? (
              <Link
                to={`/projects/${prevSlug}`}
                className="flex items-center gap-2 rounded-full border border-[#E5E0D5] bg-white px-5 py-2.5 text-sm text-[#4A4A4A] transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>
                  {projectDetails[prevSlug].emoji}{' '}
                  {projectDetails[prevSlug].title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            <Link
              to="/projects"
              className="text-sm text-[#8A8A8A] hover:text-[#E88B2E] transition-colors"
            >
              返回项目列表
            </Link>
            {nextSlug ? (
              <Link
                to={`/projects/${nextSlug}`}
                className="flex items-center gap-2 rounded-full border border-[#E5E0D5] bg-white px-5 py-2.5 text-sm text-[#4A4A4A] transition-all duration-300 hover:border-[#E88B2E] hover:text-[#E88B2E]"
              >
                <span>
                  {projectDetails[nextSlug].emoji}{' '}
                  {projectDetails[nextSlug].title}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
