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

Strona główna ma edytowalne teksty, wektorowe logo w poprzednim, większym rozmiarze, responsywny układ, hasło częściowo schowane za sofą oraz wyraźniejsze animacje wejścia logo, hasła oraz dolnej nawigacji, uruchamiane po załadowaniu zdjęcia i fontów. Przełącznik dzień/noc zmienia zdjęcie hero oraz motyw podstron i panelu kontaktu. Przełącznik z ikonami słońca i księżyca jest w nagłówku, na lewo od CTA, bez widocznych napisów i opcji Auto. Domyślnie strona korzysta z motywu systemowego, a ręczny wybór jest zapamiętywany lokalnie. Bieżące tła dnia i nocy to obrazy dostarczone przez użytkownika, zapisane jako WebP w pełnej rozdzielczości. Kremowe CTA „Porozmawiajmy” otwiera panel kontaktu. Telefon: +48 884 021 024; Instagram: @primo.studiodesign. Link Facebooka i e-mail czekają na dane studia w `docs/contact.js`; do tego czasu są nieaktywne. Formularz po uzupełnieniu adresu przygotuje wiadomość w aplikacji pocztowej użytkownika; nie wysyła jej automatycznie. Podstrony pozostają przygotowanymi miejscami na treści.

Zdjęcie hero jest ilustracją koncepcji wygenerowaną do makiety, a nie potwierdzoną realizacją studia. Portfolio uzupełniamy wyłącznie prawdziwymi projektami klienta. Logo zostało ręcznie odtworzone na podstawie udostępnionych materiałów; oryginalne pliki marki mają pierwszeństwo, gdy będą dostępne.

Font DM Sans jest przechowywany lokalnie na licencji SIL OFL (`docs/assets/DM-Sans-OFL.txt`). `noindex` ogranicza indeksowanie podglądu, ale nie zapewnia prywatności. Repo i podgląd przeznaczone są na publiczne materiały projektu; nie zapisujemy danych dostępowych ani danych klientów.
