# Deploy beauty.webtap на Koyeb

Проект подготовлен к деплою через GitHub и Dockerfile.

## Локально

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`.

## Проверка production-сборки

```bash
npm run build
npm run preview
```

Готовая сборка создается в папке `dist`.

## Koyeb

1. Загрузите проект в GitHub.
2. В Koyeb создайте новый App.
3. Выберите GitHub repository.
4. Build method: `Dockerfile`.
5. Port: `8000`.
6. Health check path: `/`.
7. Deploy.

Docker-сборка:

- устанавливает зависимости через `npm install --include=dev`;
- собирает Vite-приложение;
- отдает `dist` через nginx;
- включает SPA fallback на `index.html`;
- кеширует статические ассеты.

## Переменные окружения

Для текущей версии переменные окружения не нужны.

## Что менять под клиента

- WhatsApp ссылка: `src/App.jsx`, константа `whatsappUrl`.
- Контакты и адрес: блок `Contacts` в `src/App.jsx`.
- Фото: `src/assets/images`.
- Темы дизайна: объект `designThemes` и CSS-классы в `src/styles.css`.
