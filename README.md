# System rezerwacji pobytu

## Opis

Projekt na PSW, który umożliwia rezerwację pobytu w domkach letniskowych. System obsługuje zarówno gości, jak i właścicieli domków, oferując różne funkcjonalności dla obu grup użytkowników. Projekt wykorzystuje protokoły WebSocket i MQTT do komunikacji w czasie rzeczywistym.

## Funkcjonalności

### Dla gości (użytkowników):

- Rejestracja i logowanie.
- Rezerwacja z wyświetleniem ceny za pobyt.
- Podgląd aktualnych rezerwacji.
- Czat z właścicielem domku.
- Anulowanie rezerwacji.
- Powiadomienia o statusie rezerwacji.

### Dla właścicieli:

- Logowanie i dostęp do panelu zarządzania.
- Podgląd rezerwacji z możliwością ich zatwierdzenia.
- Ustawianie cen w danym sezonie (niski/średni/wysoki sezon).
- Czat z klientami.
- Powiadomienia o nowych rezerwacjach.

### WebSocket:

- Czat pomiędzy wynajmującym, a właścicielem
- Odświeżanie opinii o zakwaterowaniu w czasie rzeczywistym
- Odświeżanie kalendarza z zajętymi terminami w czasie rzeczywistym

### MQTT:

- Powiadomienia o zmianie statusu rezerwacji
- Powiadomienia dla właściciela o nowej rezerwacji
- Przesyłanie informacji o nowej rezerwacji do innej części aplikacji w celu wysłanie maila z potwierdzeniem

### SMTP:

- Wysyłanie maila z potwierdzeniem rezerwacji na adres mailowy podany przy rejestracji konta

## Użyte technologie

### Frontend:

- React
- Next.js
- Axios
- Socket.io-client
- MQTT.js
- SCSS

### Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- MQTT
- Nodemailer

## Autor

Jakub Pawiński 292628
