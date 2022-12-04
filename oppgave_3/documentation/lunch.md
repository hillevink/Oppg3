##Lunches 
###api/demo (forside)
*[GET] [200] --> Hente inn data for hele året. Uker, dager og ansatte. Kunne søke etter en person. Kunne hente inn data for en gitt periode.
*[POST] [400] [201] [405] --> Sende data for hele året til databasen.

##Weeks
###api/weeks (/weeks)
*[GET] [200] --> Hente inn alle ukene i året.
###api/weeks/[id] (/weeks/[id])
*[GET] [200] --> Hente inn en enkelt uke og vise hvem som har ansvaret for de enkelte dagene.
*[PUT] [201] --> Override hvem som har ansvaret for en lunsj

<!-- ##Days
###api/days (/days)
*[GET] [200] -> Hente inn data for en gitt periode (evt gjøre på fremsiden). -->

##Employees
###api/employees (/employees)
*[GET] [200] --> Hente inn data om alle ansatte.
*[POST] [400] [201] [405] --> Skal kunne legge til nye ansatte med nødvendig data.
###api/employees/[id] (/employees/[id])
*[GET] [200] --> Hente inn data om en gitt person og vise hvilke dager de jobber.
*[PUT] [201] --> Skal kunne endre/oppdatere navn på brukeren. (Dette skal så vises i lunsjlisten)


201 ⇒ Created
200 ⇒ Ok
400 ⇒ Bad Request
404 ⇒ Not Found
409 ⇒ Conflict
500 ⇒ Internal Server Error