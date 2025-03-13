<script setup lang="ts">
import type { Message } from 'ai'

const content = ref(`## Możliwości Markdown:

Markdown to lekki język znaczników, który pozwala na formatowanie tekstu za pomocą prostej składni. Jest szeroko stosowany do tworzenia treści w Internecie, w tym dokumentacji, plików README, komentarzy na platformach takich jak GitHub czy Reddit, a także prostych stron internetowych.

Oto przegląd możliwości Markdown z przykładami użycia w składni Markdown oraz ich wizualizacją:

**1. Nagłówki:**

*   **Składnia:**
    *   # Nagłówek 1
    *   ## Nagłówek 2
    *   ### Nagłówek 3
    *   #### Nagłówek 4
    *   ##### Nagłówek 5
    *   ###### Nagłówek 6
    *   Nagłówek alternatywny 1
        ====================
    *   Nagłówek alternatywny 2
        --------------------

*   **Wynik:**

    # Nagłówek 1
    ## Nagłówek 2
    ### Nagłówek 3
    #### Nagłówek 4
    ##### Nagłówek 5
    ###### Nagłówek 6
    Nagłówek alternatywny 1
    ====================
    Nagłówek alternatywny 2
    --------------------

**2. Tekst:**

*   **Wytłuszczenie:**
    *   **Składnia:** **Tekst wytłuszczony** lub __Tekst wytłuszczony__
    *   **Wynik:** **Tekst wytłuszczony**

*   **Kursywa:**
    *   **Składnia:** *Tekst kursywą* lub _Tekst kursywą_
    *   **Wynik:** *Tekst kursywą*

*   **Przekreślenie:**
    *   **Składnia:** ~~Tekst przekreślony~~
    *   **Wynik:** ~~Tekst przekreślony~~

*   **Podkreślenie (nie jest standardem w Markdown, może być wspierane przez niektóre implementacje HTML):**
    *   **Składnia (HTML):** <u>Tekst podkreślony</u>
    *   **Wynik (zależny od implementacji):** <u>Tekst podkreślony</u>

*   **Tekst dosłowny (inline code):**
    *   **Składnia:**  Kod 
    *   **Wynik:** Kod

**3. Listy:**

*   **Listy nieuporządkowane:**
    *   **Składnia:**
        *   * Element 1
        *   - Element 2
        *   + Element 3
    *   **Wynik:**
        *   Element 1
        *   Element 2
        *   Element 3

*   **Listy uporządkowane:**
    *   **Składnia:**
        *   1. Element A
        *   2. Element B
        *   3. Element C
    *   **Wynik:**
        1.  Element A
        2.  Element B
        3.  Element C

*   **Listy zagnieżdżone:**
    *   **Składnia:**
        *   * Poziom 1
            *   * Poziom 2a
            *   * Poziom 2b
        *   1. Kolejny poziom 1
            a. Kolejny poziom 2
    *   **Wynik:**
        *   Poziom 1
            *   Poziom 2a
            *   Poziom 2b
        1.  Kolejny poziom 1
            a. Kolejny poziom 2

**4. Linki:**

*   **Linki w tekście:**
    *   **Składnia:**  [Tekst linku](adres_url "Opcjonalny tytuł") 
    *   **Wynik:** [Tekst linku](adres_url "Opcjonalny tytuł") (po wyrenderowaniu będzie to klikalny link)

*   **Linki odnośnikowe:**
    *   **Składnia (definicja linku w dowolnym miejscu dokumentu):**
         [identyfikator]: adres_url "Opcjonalny tytuł" 
    *   **Składnia (użycie linku w tekście):**
         [Tekst linku][identyfikator] 
         [Inny tekst linku][]  (jeśli identyfikator jest taki sam jak tekst linku)
    *   **Wynik:** [Tekst linku][identyfikator] oraz [Inny tekst linku][] (po wyrenderowaniu będą to klikalne linki odwołujące się do zdefiniowanego adresu URL)

**5. Obrazy:**

*   **Składnia:**  ![Tekst alternatywny](ścieżka_do_obrazu "Opcjonalny tytuł") 
*   **Wynik:** ![Tekst alternatywny](ścieżka_do_obrazu "Opcjonalny tytuł") (po wyrenderowaniu w tym miejscu pojawi się obraz)

**6. Cytaty blokowe:**

*   **Składnia:** > To jest cytat blokowy.
    > Można dodawać więcej linii.
    >> Można też zagnieżdżać cytaty.
*   **Wynik:**

    > To jest cytat blokowy.
    > Można dodawać więcej linii.
    >> Można też zagnieżdżać cytaty.

**7. Linie poziome:**

*   **Składnia:** --- lub *** lub ___
*   **Wynik:**

    ---

**8. Bloki kodu:**

*   **Wcięcia (starsza metoda, mniej preferowana):**
    *   **Składnia:**
        
            To jest blok kodu
            z wieloma liniami.
        
    *   **Wynik:**

        
        To jest blok kodu
        z wieloma liniami.
        

*   **Ogrodzone bloki kodu (preferowana metoda):**
    *   **Składnia:**
        
        \\\język
        To jest blok kodu
        z podświetleniem składni (opcjonalnie).
        \\\
        
    *   **Przykład:**
        
        \\\python
        def hello():
            print("Hello, world!")
        \\\
        
    *   **Wynik (z podświetleniem składni, jeśli wspierane):**

        \\\python
        def hello():
            print("Hello, world!")
        \\\

**9. Tabele:**

*   **Składnia:**
    
    | Nagłówek 1 | Nagłówek 2 | Nagłówek 3 |
    |------------|------------|------------|
    | Dane 1.1   | Dane 1.2   | Dane 1.3   |
    | Dane 2.1   | Dane 2.2   | Dane 2.3   |
    
    
    | Lewo      | Środek     | Prawo     |
    | :---------- | :--------: | --------: |
    | Lewy tekst | Środkowy   | Prawy     |
    | Kolejny    | Inny tekst | Jeszcze jeden |
    
*   **Wynik:**

    | Nagłówek 1 | Nagłówek 2 | Nagłówek 3 |
    |------------|------------|------------|
    | Dane 1.1   | Dane 1.2   | Dane 1.3   |
    | Dane 2.1   | Dane 2.2   | Dane 2.3   |

    | Lewo      | Środek     | Prawo     |
    | :---------- | :--------: | --------: |
    | Lewy tekst | Środkowy   | Prawy     |
    | Kolejny    | Inny tekst | Jeszcze jeden |

**10. Znaki specjalne (ucieczka):**

*   **Składnia:** Użyj \ przed znakiem specjalnym Markdowna, aby go dosłownie wyświetlić.
*   **Przykład:** \*Tekst nie będzie kursywą\*
*   **Wynik:** \*Tekst nie będzie kursywą\*

**11. Wstawianie HTML (generalnie działa, ale zależy od implementacji Markdowna):**

*   Można wstawiać surowy kod HTML wewnątrz dokumentu Markdown.
*   **Przykład:** <div>To jest blok HTML</div>

**Podsumowanie możliwości:**

Markdown oferuje szeroki zakres opcji formatowania tekstu, od podstawowych nagłówków i stylów tekstu, po bardziej zaawansowane elementy, takie jak listy, linki, obrazy, bloki kodu i tabele. Jego prostota i czytelność sprawiają, że jest popularnym wyborem do tworzenia treści online. Warto pamiętać, że niektóre implementacje Markdowna mogą oferować dodatkowe rozszerzenia składni.`)

const message = ref<Message>({
  role: 'assistant',
  content: content.value,
  id: '1',
})
const userMessage = ref<Message>({
  role: 'user',
  content: 'Podaj miasto',
  id: '2',
})
</script>

<template>
  <div class="p-8">
      <YChatMessage :message="userMessage" />
    <YChatMessage :message="message" />
  </div>
</template>
