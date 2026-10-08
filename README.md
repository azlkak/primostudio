# Primo Studio

Projekt strony studia architektury wnętrz. Wybrany kierunek: pełnoekranowa okładka z hasłem **„Twój rytm życia. Twoje wnętrze.”**, ciepłe zdjęcie, kremowe logo i odnośniki do podstron.

## Gdzie pracujemy

- `docs/` — strona publikowana przez GitHub Pages: HTML, style, zdjęcie hero, wektorowe logo i fonty.
- `design/brand/` — materiały marki, gładkie logo SVG i eksporty PNG.
- `design/makiety/` — dotychczasowe propozycje, w tym wybrany wariant A.
- `design/prezentacje/` — prezentacje PDF do przeglądu z klientem.
- `documentation/` — ustalenia UX/UI i prompty do makiet.

## Podgląd

Lokalnie: `python3 -m http.server 8000 --directory docs`, następnie otwórz `http://localhost:8000`.

Na GitHubie: Settings → Pages → Deploy from a branch → `main` → `/docs` → Save. Po pierwszej publikacji każda zmiana wysłana na `main` automatycznie aktualizuje stronę. Podgląd: `https://azlkak.github.io/primostudio/`.

## Stan projektu

Strona główna ma edytowalne teksty, wektorowe logo, responsywny układ i krótkie pojawienie się logo. Podstrony są przygotowanymi miejscami na treści. Kontakt prowadzi do oficjalnego profilu Instagram; nie ma jeszcze formularza rezerwacji ani wysyłania wiadomości.

Zdjęcie hero jest ilustracją koncepcji wygenerowaną do makiety, a nie potwierdzoną realizacją studia. Portfolio uzupełniamy wyłącznie prawdziwymi projektami klienta. Logo zostało ręcznie odtworzone na podstawie udostępnionych materiałów; oryginalne pliki marki mają pierwszeństwo, gdy będą dostępne.

Font DM Sans jest przechowywany lokalnie na licencji SIL OFL (`docs/assets/DM-Sans-OFL.txt`). `noindex` ogranicza indeksowanie podglądu, ale nie zapewnia prywatności. Repo i podgląd przeznaczone są na publiczne materiały projektu; nie zapisujemy danych dostępowych ani danych klientów.
