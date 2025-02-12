# Шаблон для быстрого стартра

## Требования для запуска в локальной среде:

- Node js 18.16.0 версии или выше
- Пакетный менеджер yarn. Установка: https://yarnpkg.com/getting-started/install

## Используемые команды:

Установка зависимостей:

```
yarn install
```

Запуск локального сервера:

```
yarn dev
```

Запуск билда:

```
yarn build
```

## Структура проекта

```
./
└── app
    ├── public # Папка с шаблонами и статичными фалами
    ├── src # Весь исходный код проекта
    │   ├── assets # Дополнительные статические ресурсы
    │   │   └── fonts
    │   │   └── style
    │   │   └── icons
    │   │   └── img
    │   ├── components # Все vue компоненты проекта (*)
    │   │   ├── component
    │   │   ├── component
    │   │   ├── ...
    │   │   ├── UI # Простые ui эелементы интерфейса: кнопки, карточки, шильдики и т.д.
    │   │   │   ├── v-button
    │   │   │   │   └── index.ts
    │   │   │   │   └── types.ts
    │   │   │   │   └── v-button.vue
    │   │   │   │   └── v-button.scss
    │   │   │   ├── v-input
    │   │   │   │   └── index.ts
    │   │   │   │   └── types.ts
    │   │   │   │   └── v-input.vue
    │   │   │   │   └── v-input.scss
    │   │   │   └── ...
    │   ├── composables # Папка с хуками приложения
    │   │   ├── useModal.ts
    │   │   └── ...
    │   ├── helpers # Папка с хелперами приложения
    │   ├── layouts # Папка с лайаутами приложения
    │   ├── router # Папка с маршрутами приложения
    │   ├── store # Папка с хранилищями приложения
    │   ├── services # Папка с api приложения
    │   ├── pages # Папка со страницами проекта
    │   │   ├── news
    │   │   │   └── index.ts
    │   │   │   └── types.ts
    │   │   │   └── news.vue
    │   │   │   └── news.scss
    │   │   └── ...
    │   ├── main.js
    └── └── App.vue
```

## Пример структуры компонентов

```
v-tabs # папка главного компонента
├── v-tab папка дочернего компонента
│  ├── index.ts # индексный файл дочернего компонента
│  ├── types.ts # типы дочернего компонента
│  ├── v-tab.vue # Код дочернего компонента
│  └── v-tab.scss # Стили дочернего компонента
├── v-tabs.scss # Стили главного комонента
├── index.ts # индексный файл главного компонента
├── types.ts # типы главного компонента
└── v-tabs.vue # Код главного компонента
```

## Пример кода компонентов

### types.vue

```
interface IIconProps {
  size?: string;
  name: string;
}

export default IIconProps;

```

### v-icon.vue

```
<template>
  <svg :height="size" :style="styles" :width="size" aria-hidden="true" class="icon">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IIconProps from '@ui/v-icon/types';

const props = withDefaults(defineProps<IIconProps>(), {
  size: '16'
});

const styles = computed(() => ({
  minWidth: `${props.size}px`,
  minHeight: `${props.size}px`
}));
</script>

<style lang="scss" scoped src="./v-icon.scss" />

```

### v-icon.scss

```
.icon {
  display: inline-block;
}

```
