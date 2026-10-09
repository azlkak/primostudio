# Proces projektowania — formy v3

Rozwinięcie v2 po uwadze użytkownika: więcej różnych form, bez powtarzania sylwetek, powiązanych z designem wnętrz Primo.

## Wspólny język

Łączymy geometrię architektury z organicznymi liniami wyposażenia: łuk otworu, miękkie narożniki zabudowy, obrys kamienia, rzeźbiarską falę mebla. Spójność budują łagodne krzywizny, ciepła paleta i spokojne proporcje. Każda forma ma własną sylwetkę; nie powtarzamy jednego łuku lub owalu przy kilku etapach. Kadry mają różne proporcje, a tekst pozostaje przy wspólnej osi procesu.

## Siedem kadrów

| Miejsce | Forma | Powiązanie z designem |
| --- | --- | --- |
| Otwarcie — duże zdjęcie | Symetryczny łuk z prostą podstawą | Otwór architektoniczny |
| Otwarcie — detal | Pozioma soczewka | Organiczny blat stolika |
| 01 Konsultacja | Pionowy prostokąt z miękkimi narożnikami | Spokojne obramowanie, zaokrąglona zabudowa |
| 02 Inwentaryzacja | Asymetryczny otoczak, nieco szerszy kadr | Naturalny kamień i materiały |
| 03 Koncepcja | Rzeźbiarska forma z jednym wklęsłym bokiem | Krzywizny sofy i proponowanej konsoli |
| 04 Projekt wykonawczy | Kwadrat z dużymi łukami w dwóch przeciwległych narożnikach | Geometria planu połączona z łagodnym detalem |
| 05 Nadzór | Wysoki portal z jednym dużym łukiem w narożniku | Architektura i wykończenie otworu |

Formy są wykonane w CSS i SVG, bez zmiany plików zdjęć. Zdjęcia i białe szkice pozostają te same co w v2. Ich źródła i prompty są w `design-v2.md`. Zachowujemy identyczne sylwetki na telefonie i w obu motywach, bez animowania kształtów. Czytelność treści zdjęcia ma pierwszeństwo przed dekoracją.

## Pliki

- `docs/proces.html` — układ.
- `docs/assets/process-sculpture-mask.svg` — wektor maski formy rzeźbiarskiej.
- `docs/process-v3.css` — kadry i proporcje.
- `design/archive/process-v2/proces.html` i zachowany `docs/process-v2.css` — poprzedni wariant.

## Uproszczenie i stopka — aktualizacja 9 października

- Usunięty widoczny podpis ilustracji oraz poziomy spis etapów. Pochodzenie zdjęć pozostaje udokumentowane w v2 i opisach alternatywnych.
- Nagłówki bez kropek na końcu. Nie dodajemy linków „Następny etap” ani podobnych odnośników pod opisami.
- Górne i dolne CTA „Porozmawiajmy” korzystają z tego samego panelu kontaktu co okładka. Na jasnym tle przycisk ma kontrastową barwę kakao; w nocy kremową.
- Odstępy etapów są ciaśniejsze: na komputerze 24 px nad i 44 px pod etapem, na telefonie 22 px nad i 26 px pod etapem. Wysokość wynika z treści i zdjęcia, bez sztucznej minimalnej wysokości sekcji.
- Lekka stopka na podstronie procesu: logo, nawigacja do czterech podstron, telefon i Instagram. Bez powtarzania dużego CTA. Link do postu o procesie usunięty ze stopki na prośbę użytkownika; źródło pozostaje w dokumentacji.
- Stopka zachowuje ciepłą paletę i cienkie podziały; na telefonie układa się w kolumnę. Logo reaguje na motyw dzień/noc.
