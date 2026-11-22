# React Router — Menu + CRUD + Auth

Один проект на Vite + React + TypeScript со всеми тремя заданиями.

## Запуск

Установка зависимостей фронтенда:

```bash
npm install
```

Бэкенды:

```bash
npm install --prefix backends/crud
npm install --prefix backends/auth
```

В трёх терминалах:

```bash
npm run backend:crud   # http://localhost:7070
npm run backend:auth   # http://localhost:7071
npm run dev            # http://localhost:5173
```

## Разделы

| Раздел | URL | API |
|--------|-----|-----|
| Меню | [/menu](http://localhost:5173/menu) | — |
| CRUD | [/crud](http://localhost:5173/crud) | `localhost:7070` |
| Authentication | [/auth](http://localhost:5173/auth) | `localhost:7071` |

Логин для Authentication: `vasya` / `vasya`.

Исходные материалы заданий остались в каталогах `menu/`, `crud/`, `authentication/`.
