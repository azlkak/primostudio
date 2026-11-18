# Portfolio v3 — pierwsza realizacja i historia Majdanu

Pierwsza karta istniejącego stosu otrzymuje nazwę Majdan, zdjęcie holu i natywny odnośnik do `majdan.html`. Kliknięcie powiększa zdjęcie i otwiera pełnoekranową historię bez przechodzenia przez ekran prototypu. Pozostałe trzy miejsca na realizacje pozostają placeholderami.

Projekt ma również samodzielny adres, dostępny po otwarciu linku w nowej karcie lub bez skryptu otwierającego. Powrót przywraca kartę i pozycję przewijania portfolio. Obsługiwane są Escape, historia przeglądarki i ograniczenie ruchu.

Cztery główne zdjęcia pochodzą z załączników użytkownika. Rozdziały: Rytuał wejścia, Choreografia codzienności, Zmysł materii, Prywatna cisza. Tekst i zdjęcia zmieniają się wraz z natywnym przewijaniem.

Następnie pojawia się siedem ciągłych opisów procesu. Nie ma listy nazw, zakładek ani strzałek poprzedni/następny. Obraz jest przypięty po prawej i zmienia się przy kolejnych opisach. Na telefonie przypięty obraz znajduje się nad opisami. Pierwszy obraz to plan dostarczony przez użytkownika. Pozostałe materiały wybrane z jego folderu Majdan; filmów nie użyto. Proces jest propozycją narracji studia; nie dopisujemy nieznanych wymagań konkretnego klienta, dat, metrażu ani budżetu.

Referencje użytkownika: https://pl.pinterest.com/pin/1107181889672451986/ oraz https://pl.pinterest.com/pin/1107181889672491318/. Pinterest częściowo zasłania filmy panelem logowania. Opieramy się także na opisanym przez użytkownika zachowaniu i dostarczonych zrzutach; nie kopiujemy tekstów ani identyfikacji Telha Clarke.

Publikacja: `docs/projekty.html`, `portfolio.js`, `portfolio-v2.css`, `project-open.js`, `majdan.html`, `majdan.css`, `majdan.js` i dziesięć plików `docs/assets/majdan-*.webp`. Oryginalny lokalny prototyp pozostaje w `design/majdan-motion-v2/`.

Aktualizacja płynności: powiększana kopia zdjęcia zostaje na ekranie do załadowania, zdekodowania i namalowania docelowej sceny oraz fontów. Znika dopiero po łagodnym przekazaniu obrazu; tekst i przyciemnienie pojawiają się osobno. Usunięto przejście przez przezroczystą ramkę.

Animacja procesu odpowiada ruchowi zaobserwowanemu bezpośrednio na https://telhaclarke.com.au/studio/ w sekcji Our vision: następny kadr odsłania się od dołu nad poprzednim, proporcjonalnie do przewijania, także przy cofaniu. Nie stosujemy zanikania i wymiany adresu pojedynczego obrazka. Zdjęcie zajmuje około 66% szerokości sekcji (kolumna tekstu około 34%, poza odstępem) oraz 85% wysokości ekranu. Na telefonie pozostaje nad opisem i jest wyższe niż poprzednio. Tryb ograniczonego ruchu zmienia kadry skokowo.
