# OMDb Movie Search App

Bu layihə React və Vite istifadə edilərək hazırlanmış film axtarış tətbiqidir. Tətbiq istifadəçilərə filmləri axtarmaq, nəticələri dinamik olaraq filterləmək və səhifələmək imkanı verir.

## Xüsusiyyətlər

* **Axtarış və Debounce:** İstifadəçi daxil etdiyi sorğulara əsasən filmlərin axtarışı (Debounce mexanizmi ilə optimallaşdırılıb).
* **Custom Hook:** Məlumatların çəkilməsi və idarə olunması üçün `useFetchMovies` xüsusi hook-u.
* **Səhifələmə (Pagination):** Axtarış nəticələrinin 8-li səhifələr şəklində nümayiş etdirilməsi.
* **Sorğunun Ləğvi (Cleanup):** `useEffect` daxilində `AbortController` mexanizmi ilə lazımsız sorğuların təmizlənməsi.

## Texnologiyalar

* React
* Vite
* JavaScript (ES6+)
* CSS3
