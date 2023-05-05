

| Operation    | An API übergeben         | API gibt zurück                                                                        |
| :----------- | :----------------------- | :------------------------------------------------------------------------------------- |
| Neuer parker | Kennzeichen | 200 falls erfolgreich, 400 falls Fehler (Kennzeichen schon in Parkhaus oder so n Shit) |
| Ausfahrt | Parkplatz Nr. oder Kennzeichen | API löscht Zeile für Parkplatz aus Tabelle, schreibt in History Tabelle, berechnet Preis und gibt zurück |