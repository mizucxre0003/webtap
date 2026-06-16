You are working inside the existing WebTap website codebase.

Your task is to fully redesign the website into a premium, monochrome digital agency website while preserving all working functionality, routes, forms, WhatsApp links, contact information, analytics, SEO metadata, and responsive behavior.

Do not create a separate demo or isolated page. Modify the actual existing website.

Before changing anything:

1. Inspect the current project structure, framework, dependencies, components, styles, assets, routing, forms, and integrations.
2. Identify reusable components and avoid unnecessary rewrites.
3. Run the existing project and review the current desktop and mobile layouts.
4. Preserve the current tech stack unless there is a strong technical reason not to.
5. Create a short implementation plan, then implement it.

PROJECT GOAL

Transform WebTap from a low-cost “website for everyone” service into a premium digital studio for serious businesses.

The website must communicate:

* strong strategic thinking;
* premium custom design;
* attention to detail;
* business-focused website development;
* trust and professionalism;
* higher perceived project value;
* experience working with established companies.

The visitor should think:

“This is a serious digital studio. Their work is probably expensive, but the result will be professional.”

The visitor must not think:

“This is a cheap landing-page service made with templates.”

VISUAL DIRECTION

Create a premium monochrome visual system.

Use:

* black;
* charcoal;
* graphite;
* warm dark gray;
* cold light gray;
* off-white;
* pure white only for important contrast.

Suggested palette:

--background-primary: #0A0A0A;
--background-secondary: #111111;
--background-elevated: #171717;
--surface-light: #E8E8E5;
--text-primary: #F5F5F2;
--text-secondary: #A3A3A3;
--text-dark: #111111;
--border-dark: rgba(255,255,255,0.12);
--border-light: rgba(0,0,0,0.12);

Do not use:

* purple;
* blue or violet gradients;
* colorful accent colors;
* cartoon illustrations;
* generic 3D characters;
* glossy 3D icons;
* excessive glassmorphism;
* neon effects;
* template-looking cards;
* large rounded “bubble” interfaces;
* decorative graphics that do not support the message.

The site should feel editorial, architectural, precise, minimal, and expensive.

Use contrast between dark and light sections rather than colorful accents.

TYPOGRAPHY

Use a strong modern sans-serif font available through the project or a suitable free web font.

Recommended direction:

* Manrope;
* Inter;
* Geist;
* Instrument Sans;
* DM Sans.

Use one primary typeface unless a second editorial display font clearly improves the result.

Typography requirements:

* very large hero headline;
* compact line height for large headings;
* medium or slightly tight letter spacing;
* clear type hierarchy;
* small uppercase section labels;
* restrained paragraph width;
* large section numbers;
* no tiny unreadable text;
* no excessive font-weight variety.

Desktop hero headline should feel impactful and occupy a large portion of the viewport.

Use responsive clamp() values for typography.

LAYOUT SYSTEM

Use a consistent grid.

Recommended:

* maximum content width: 1280–1440px;
* desktop horizontal padding: 48–72px;
* tablet padding: 32px;
* mobile padding: 18–24px;
* large vertical gaps between sections;
* clear 12-column desktop grid;
* consistent border and spacing logic.

Avoid filling every space with cards.

Premium design needs:

* whitespace;
* strong alignment;
* deliberate asymmetry;
* large visuals;
* restrained content;
* clear rhythm;
* fewer but stronger components.

BORDER RADIUS

Reduce excessive rounded corners.

Use:

* 0–4px for editorial surfaces;
* 8–12px for project screenshots;
* fully rounded pills only for small tags or compact controls.

Do not turn every section into a rounded card.

HEADER

Create a minimal sticky header.

Desktop:

* WebTap logo on the left;
* navigation in the center or right;
* one primary CTA;
* thin bottom border;
* transparent initially;
* subtle dark background with blur after scrolling.

Navigation:

* Кейсы
* Услуги
* Процесс
* О студии
* Контакты

CTA:

“Обсудить проект”

Remove unnecessary duplicate buttons.

On mobile:

* compact header;
* accessible menu;
* smooth open and close animation;
* correct focus management;
* body scroll lock while menu is open.

HERO SECTION

Replace the current low-cost hero presentation completely.

Do not show the starting price in the hero.

Do not show “от 49 990 ₸”, monthly maintenance, deadlines, or a list of basic features above the fold.

Create a premium hero with this structure:

Small label:
“WEB DESIGN & DEVELOPMENT — KAZAKHSTAN”

Main headline:
“Создаём сайты, которым доверяют серьёзный бизнес”

Alternative headline:
“Цифровой образ бизнеса, который работает на его репутацию”

Supporting text:
“Проектируем и разрабатываем сайты для компаний, которым недостаточно просто присутствовать в интернете. Стратегия, дизайн и разработка в одной команде.”

Primary CTA:
“Обсудить проект”

Secondary CTA:
“Смотреть работы”

Add a restrained credibility line:
“Стратегия · UX/UI-дизайн · Разработка · Запуск”

Visual direction for the hero:

* no cartoon artwork;
* no generic laptop mockup floating in space;
* use a large abstract monochrome composition;
* or use a high-quality website project mockup;
* or use typography, grid lines, subtle noise, and motion as the main visual;
* introduce the WebTap brand through composition rather than bright color.

Hero should be close to full viewport height on desktop.

Add subtle scroll indication.

POSITIONING

Remove the current emphasis on:

* cheap launch;
* any business;
* beauty masters;
* cafes;
* small shops;
* “website in five days”;
* maintenance for 4,990 ₸;
* generic WhatsApp button as the primary value.

Position WebTap around business outcomes:

* stronger company image;
* trust;
* clear presentation of services;
* conversion;
* competitive differentiation;
* digital credibility;
* scalable website foundation.

Do not promise guaranteed leads or guaranteed revenue.

NEW PAGE STRUCTURE

Rebuild the homepage using this order:

1. Header
2. Premium hero
3. Selected work / case studies
4. Short positioning statement
5. Services
6. Why WebTap
7. Working process
8. Featured industries or clients
9. Pricing approach
10. Final CTA
11. Footer

SECTION 1: SELECTED WORK

Portfolio must become the strongest section after the hero.

Title:
“Избранные проекты”

Subtitle:
“Сайты, в которых визуальная система, структура и разработка работают на одну бизнес-задачу.”

Create 3–4 large project cards.

Each project card must contain:

* project name;
* industry;
* year;
* short business task;
* large website screenshot or tasteful placeholder;
* link or button “Смотреть проект”;
* optional results only if real data exists.

Do not invent fake clients, testimonials, statistics, awards, or revenue results.

If real projects are not present in the repository, create clearly labeled placeholders such as:

* “Проект будет добавлен”
* “Концепт”
* “В разработке”

Do not present fictional work as real client work.

Use varied project layouts:

* one full-width project;
* two-column project pair;
* another full-width project.

Use grayscale screenshots by default with subtle transition to full contrast or slightly warmer tones on hover.

SECTION 2: POSITIONING STATEMENT

Create a large editorial statement section.

Example:

“Сайт — это не набор блоков. Это первое впечатление о компании ещё до звонка, встречи или коммерческого предложения.”

Use large typography and minimal supporting copy.

Add one small supporting paragraph:

“Мы соединяем позиционирование, структуру, визуальный язык и разработку, чтобы цифровой образ компании соответствовал уровню её бизнеса.”

SECTION 3: SERVICES

Replace the large generic feature list with four premium service rows.

Services:

01 — Корпоративные сайты
“Для компаний, которым важно системно представить услуги, экспертизу, проекты и преимущества.”

02 — Продающие лендинги
“Для запуска нового направления, продукта или рекламной кампании.”

03 — UX/UI-дизайн
“Проектирование интерфейсов, дизайн-систем и адаптивных пользовательских сценариев.”

04 — Разработка и запуск
“Адаптивная сборка, интеграции, аналитика, базовая SEO-подготовка и технический запуск.”

Use horizontal rows with large numbering, thin borders, and interactive hover states.

Do not use colorful icons.

SECTION 4: WHY WEBTAP

Create a restrained section explaining the studio’s approach.

Possible points:

* Начинаем с задачи бизнеса
* Не используем один шаблон для всех
* Показываем логику решений
* Проектируем сразу под мобильные устройства
* Доводим проект до рабочего запуска
* Остаёмся на связи после публикации

Use either:

* a clean two-column layout;
* or one large statement plus a structured list.

Avoid six identical rounded cards.

SECTION 5: PROCESS

Create a premium process timeline.

Steps:

01 — Погружение
Изучаем бизнес, аудиторию, конкурентов и задачу проекта.

02 — Структура
Формируем сценарий страницы, приоритеты контента и путь пользователя.

03 — Дизайн
Создаём визуальную концепцию и адаптивные макеты.

04 — Разработка
Собираем интерфейс, настраиваем формы, интеграции и аналитику.

05 — Запуск
Проверяем сайт, подключаем домен, индексацию и передаём готовый проект.

Do not make the process look like a basic checklist.

Use scroll-driven progress, sticky text, or a well-designed editorial timeline, but keep performance and accessibility strong.

SECTION 6: INDUSTRIES

Do not show cartoon characters for industries.

Use text-based industry categories or large monochrome photography only if high-quality licensed assets already exist.

Recommended industries:

* Строительство и недвижимость
* Производство
* B2B и профессиональные услуги
* Клиники и медицинские проекты
* Образование
* Сервисы и технологические компании

Title:
“Работаем с бизнесом, где доверие к компании влияет на решение клиента”

Do not claim deep specialization in an industry unless supported by actual projects.

SECTION 7: PRICING

Do not use “от 49 990 ₸” as the main commercial anchor.

Replace the existing cheap pricing block with a consultation-based approach.

Suggested heading:
“Стоимость зависит от задачи, а не от количества экранов”

Suggested text:
“После короткого брифа мы оцениваем структуру, объём дизайна, разработку и необходимые интеграции. Вы получаете понятный состав работ, сроки и фиксированную стоимость проекта.”

CTA:
“Получить оценку проекта”

Optionally show formats instead of low starting prices:

* Лендинг
* Корпоративный сайт
* Индивидуальный digital-проект

Do not invent new exact prices unless they already exist in the business requirements.

Keep the old price values somewhere in configuration only if the owner still needs them, but do not prominently display them on the redesigned homepage.

SECTION 8: FINAL CTA

Create a strong full-width final CTA.

Dark or light contrast section.

Headline:
“Давайте сделаем сайт, который соответствует уровню вашего бизнеса”

Text:
“Расскажите о задаче. Мы изучим проект и предложим подходящий формат работы.”

Buttons:

* “Обсудить проект”
* “Написать в WhatsApp”

Keep the form concise:

* Имя
* Телефон или WhatsApp
* Компания
* Коротко о задаче

Do not ask the user to choose a cheap budget tier at the first touch.

Preserve form validation, submission behavior, error states, loading states, and success states.

FOOTER

Create a minimal premium footer.

Include:

* WebTap logo;
* short positioning;
* email;
* WhatsApp;
* Telegram;
* Instagram;
* navigation;
* current year;
* legal links if they already exist.

Use strong alignment, a thin border, and restrained typography.

IMAGES AND ASSETS

Remove all current cartoon-style niche illustrations and purple 3D graphics from visible sections.

Do not delete source files until verifying they are unused.

Prefer:

1. real project screenshots;
2. monochrome website mockups;
3. abstract grid compositions;
4. subtle architectural or material photography;
5. typographic visual compositions.

If suitable portfolio images do not exist, create elegant neutral placeholders using CSS and layout rather than random stock images.

Do not load remote images from unreliable sources.

ANIMATION

Animations must feel expensive and restrained.

Use:

* subtle fade and translate reveals;
* text masking where appropriate;
* image scale from 1.03 to 1;
* thin line expansion;
* smooth hover transitions;
* gentle header transition;
* staggered project metadata;
* tasteful cursor interactions only if they do not hurt usability.

Avoid:

* bouncing elements;
* spinning icons;
* floating shapes;
* constant looping animation;
* aggressive parallax;
* excessive blur;
* animation on every text block.

Respect prefers-reduced-motion.

PERFORMANCE

Keep the website fast.

Requirements:

* optimize images;
* use responsive image sizes;
* lazy-load below-the-fold media;
* avoid large animation libraries unless already installed and necessary;
* avoid layout shifts;
* keep client-side JavaScript minimal;
* preserve semantic HTML;
* maintain good Core Web Vitals;
* do not introduce unnecessary dependencies.

ACCESSIBILITY

Ensure:

* keyboard navigation;
* visible focus states;
* sufficient contrast;
* semantic headings;
* alt text;
* accessible form labels;
* correct button and link semantics;
* reduced-motion support;
* accessible mobile navigation.

RESPONSIVENESS

Test at minimum:

* 1440px;
* 1280px;
* 1024px;
* 768px;
* 390px;
* 360px.

The mobile design must not look like a compressed desktop page.

On mobile:

* reduce heading size intelligently;
* preserve spacing hierarchy;
* stack project content cleanly;
* keep CTA buttons easy to tap;
* avoid horizontal overflow;
* simplify motion;
* keep forms comfortable to use.

CONTENT RULES

Rewrite repetitive website copy.

Current messages about:

* WhatsApp in one tap;
* understanding the service in five seconds;
* prices being visible;
* all information in one place;

should not be repeated throughout the page.

Use shorter, more confident copy.

Avoid clichés such as:

* “индивидуальный подход”;
* “команда профессионалов”;
* “качество и надёжность”;
* “сайт, который продаёт 24/7”;
* “выведем ваш бизнес на новый уровень”;
* “уникальные решения для каждого клиента”.

Tone of voice:

* confident;
* calm;
* precise;
* business-focused;
* not arrogant;
* not overly technical;
* no hype;
* no fake promises.

COMPONENT SYSTEM

Create or update reusable components for:

* Container
* SectionHeader
* Button
* ProjectCard
* ServiceRow
* ProcessStep
* Header
* MobileMenu
* ContactForm
* Footer
* RevealAnimation

Create centralized design tokens for:

* colors;
* typography;
* spacing;
* borders;
* radii;
* transitions;
* container sizes.

Avoid repeated hardcoded values across components.

SEO

Preserve or improve:

* title;
* meta description;
* Open Graph tags;
* canonical URL;
* favicon;
* structured heading hierarchy;
* indexability;
* robots.txt;
* sitemap if already present.

Suggested title:
“WebTap — дизайн и разработка сайтов для бизнеса”

Suggested description:
“WebTap проектирует и разрабатывает современные сайты для компаний: стратегия, UX/UI-дизайн, адаптивная разработка и запуск.”

Do not keyword-stuff.

QUALITY CONTROL

After implementation:

1. Run linting.
2. Run type checking.
3. Run the production build.
4. Fix all errors and meaningful warnings.
5. Check all navigation links.
6. Check WhatsApp, Telegram, Instagram, email, and form behavior.
7. Check desktop and mobile views.
8. Check for horizontal overflow.
9. Check focus states and keyboard navigation.
10. Verify no purple or cartoon assets remain visible.
11. Verify the old low-cost positioning is no longer dominant.
12. Summarize the files changed and the main design decisions.

Do not stop after changing colors.

The final result must look like a complete redesign of positioning, hierarchy, typography, layout, content, components, and visual language.
