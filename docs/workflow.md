# Workflow — branch i Pull Request

Zadanie wykonujemy tak, jak wygląda codzienna praca w zespole. Nie pisz kodu
bezpośrednio na `main` — cały kod ma trafić do repozytorium przez **branch**
i **Pull Request**. To pozwala nam zobaczyć, jak rozdzielasz pracę na mniejsze
zmiany, jak opisujesz commity i jak komunikujesz decyzje techniczne.

## 1. Tworzenie brancha

Utwórz branch zgodnie z poniższą konwencją — pozwala nam to od razu rozpoznać
charakter zmian:

| Prefix      | Kiedy używać                                            |
| ----------- | ------------------------------------------------------- |
| `feature/`  | Nowa funkcjonalność (np. komponent komentarzy)          |
| `fix/`      | Poprawka błędu                                          |
| `test/`     | Dodanie lub poprawienie testów                          |
| `docs/`     | Zmiany wyłącznie w dokumentacji                         |

**Przykładowe nazwy:**

```bash
git checkout -b feature/comments-section
git checkout -b test/comments-component
git checkout -b fix/comments-empty-state
```

Jeden branch = jedna logiczna zmiana. Jeżeli przy okazji znajdziesz literówkę
w README — nie mieszaj jej z commitem z komentarzami; zrób osobny branch
`docs/typo-in-readme`.

## 2. Commity

Stosujemy [Conventional Commits](https://www.conventionalcommits.org/).
Każdy commit to mały, logiczny krok — nie wrzucaj całego rozwiązania w jednym
`"final version"`.


Jeżeli pracujesz nad jednym kawałkiem funkcjonalności przez dłuższy czas,
rób wiele commitów — pokaż historię myślenia. Po zakończeniu pracy nad
branchem możesz (opcjonalnie) uporządkować historię stosując `git rebase`.


## 3. Przed wysłaniem PR-a

Upewnij się, że projekt się buduje, a kod przechodzi przez Twoje testy:

```bash
pnpm install
pnpm dev          # sprawdź ręcznie /photo/1 i /photo/2
pnpm build        # produkcyjny build musi przejść bez błędów
```

Jeżeli dodałeś testy — uruchom je:

```bash
pnpm test
```

## 4. Pull Request

Wypchnij branch i otwórz Pull Request z `twoj-fork:feature/comments-section` do
`upstream:main`. W opisie PR-a umieść:

1. **Co robi zmiana** — w 2–3 zdaniach, wysokopoziomowo.
2. **Dlaczego tak, a nie inaczej** — uzasadnienie kluczowych decyzji (np.
   dlaczego `useFetch`, a nie `$fetch`; dlaczego filtrujesz po stronie klienta;
   jak rozwiązujesz kwestię cache).
3. **Jak testować** — kroki do ręcznej weryfikacji (np. „Otwórz `/photo/1`,
   oczekuj 11 komentarzy").
4. **Screenshoty / nagranie** — mile widziane dla zmian UI.
5. **Znane ograniczenia / dalsze kroki** — co świadomie pominąłeś i co można
   rozwinąć.

**Szablon opisu PR-a:**

```markdown
## Opis

Krótki opis tego, co robi ten PR.

## Motywacja

Dlaczego te zmiany są potrzebne / w jakim kontekście powstały.

## Kluczowe decyzje techniczne

- Decyzja 1 — i dlaczego
- Decyzja 2 — i dlaczego

## Jak testować

1. `pnpm install && pnpm dev`
2. Przejdź do `/photo/1`
3. …

## Screenshots / nagrania

(opcjonalnie)

## Checklist

- [ ] Kod uruchamia się lokalnie
- [ ] `pnpm build` przechodzi
- [ ] Dodano / zaktualizowano testy
- [ ] Zaktualizowano README (jeżeli dotyczy)
```

## 5. Na co będziemy patrzeć

- **Jakość commitów** — czy historia czyta się jak opis procesu myślowego.
- **Wielkość i atomowość zmian** — jeden PR powinien robić jedną rzecz.
- **Opis PR-a** — czy potrafisz uzasadnić wybór techniczny w piśmie.
- **Reakcja na review** — jeżeli zostawimy komentarze, oczekujemy odpowiedzi:
  poprawka, kontrargument lub pytanie doprecyzowujące. Nie ignoruj wątków.
- **Porządek w branchu** — brak śmieciowych plików, debuggerów, zakomentowanego
  kodu, `console.log`.
