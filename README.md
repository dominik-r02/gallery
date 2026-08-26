# Zadanie rekrutacyjne — Senior Frontend Developer

Baza do zadania rekrutacyjnego na stanowisko **Senior Frontend Developer**.
Aplikacja prezentuje zdjęcia z możliwością powiększenia oraz wyświetla
informacje o autorze zdjęcia pobrane z serwisu [picsum.photos](https://picsum.photos).

## Treść zadania

Twoim zadaniem jest:

1. **Pobranie komentarzy** dla bieżącego zdjęcia z endpointu `/api/comments.json`.
2. **Wyświetlenie ich** na stronie `/photo/[id]` w przemyślany sposób (lista, karty, grupowanie — wybór należy do Ciebie).
3. **Zadbanie o UX**: stany ładowania, obsługa błędów, puste stany.
4. **Testowanie**: w wyniku pracy nad zadaniem, dobrą praktyką będzie stworzenie testów.

> Prośba o niekorzystanie z AI do wygenerowania rozwiązań. Chcemy zobaczyć Twoje umiejętności i podejście do problemu.

## Wymagania techniczne

- Vue 3
- Nuxt 4
- pnpm

## Struktura aplikacji

- `/` — strona główna z instrukcją zadania
- `/photo/1` — zdjęcie nr 1
- `/photo/2` — zdjęcie nr 2

## API

### Zdjęcia i metadane

- Zdjęcie: `https://picsum.photos/id/{id}/{width}/{height}`
- Metadane: `https://picsum.photos/id/{id}/info`

### Komentarze

Plik statyczny: `/api/comments.json`

```json
{
  "id": "4866",
  "photoId": "1",
  "author": "Marta Lewandowska",
  "avatar": "https://i.pravatar.cc/100?img=5",
  "content": "Wow, klimat tego miejsca jest niepowtarzalny.",
  "createdAt": "2026-08-16T14:45:30Z"
}
```

Plik zawiera 11 komentarzy dla zdjęcia nr 1 oraz 3 komentarze dla zdjęcia nr 2.



## Dokumentacja

Szczegółowe instrukcje w katalogu [`docs/`](./docs):

- [Setup i uruchomienie](./docs/setup.md) — jak sklonować, zainstalować i odpalić projekt.
- [Workflow: branch i Pull Request](./docs/workflow.md) — jak oddać zadanie (konwencja branchy, commitów, opis PR-a).

Powodzenia! 🛠
