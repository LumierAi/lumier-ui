Wyciągnij wszystkie teksty z tego pliku i następnie dodaj je do pliku `i18n/locales/pl.ts` oraz `i18n/locales/en.ts`
Zagnieżdzaj teksty w odpowiednie miejsca bazując na podobnym scope. Np kiedy coś jest w Navbar, to dodaj do Navbar.
{
navbar: {
dashboard: 'Dashboard',
courses: 'Kursy',
knowledgeBlocks: 'Bloki wiedzy',
settings: 'Ustawienia',
},
}

Jeżeli wyciągasz teksty z template z .vue, to użyj $ut(key) do tłumaczenia.

example:

zmieniam plik login.vue

```
<template>
  <div>
    {{ $ut('login.title') }}
  </div>
</template>
```

Wyciąga się do formatu:

```
login: {
  title: 'Login',
}
```

Jeżeli to plik .ts lub wewnątrz <script setup> w .vue
to użyj useUiT(key) do tłumaczenia
useUiT zwraca odrazu przetłumaczony tekst
NIGDY nie używaj tego jako
const t = useUiT()
t(key)

Funkcja wyglada tak:
function useUiT(key: I18nUiMessages): string
example:

```
    openSuccessSnackbar(useUiT('courses.generateSuccess'))
```
