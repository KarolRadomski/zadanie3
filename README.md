
# Zadanie 3: Mapy

Zadanie polegało na stworzeniu mapy na której będą wyświetlały się punkty odpowiadające urządzeniom. 

Urządzenia miały mieć możliwość edycji parametrów jak również ikon, położenia na mapie a także połączeń pomiędzy nimi.

Znaczniki na mapie zmieniają kolory zgodnie z założeniami.

## Uruchomienie projektu

W folderze projektu wykonać:

```bash
  npm install
```

Z uwagi na fakt, że React jako aplikacja działająca po stronie klienta nie może zapisywać danych konieczne było utworzenie serwera na potrzeby realizacji zadania. W tym celu wykorzystałem json-server.
https://www.npmjs.com/package/json-server

Przed uruchomieniem projektu należy go zainstalować:
```bash
  npm install -g json-server
```
Po instalacji można uruchomić serwer wydając w katalogu projektu polecenie:

```bash
  json-server --watch db.json -p 5000
```

Następnie w drugim oknie konsoli można uruchomić projekt:

```bash
  npm start
```
## Testowanie działania
Baza danych znajduje się w głównym katalogu projektu. Można spróbować zmieniać parametry urządzeń (status oraz signal) i zobaczyć zachowanie systemu.

#Możliwe wartości parametrów
status: {active, inactive, power off}
signal: <-26, -12> - sygnał poprawny
        poza w/w zakresem kolor urządzeń będzie inny

W przypadku podania wartości status na inną niż predefiniowane urządzenie przyjmie kolor czarny.

Po wejściu w tryb edytowania punkty można przesuwać i zmieniać ich dane.

Istnieje możliwość dodania nowego urządzenia.
