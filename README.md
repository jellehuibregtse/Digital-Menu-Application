[![Board Status](https://dev.azure.com/425108/e1e6d86b-2cb6-45d6-abd6-c59065c50dc4/35bb9676-7d48-412a-a473-802c52cb1f12/_apis/work/boardbadge/322b9be2-8200-46b1-ae29-031fcbe98837)](https://dev.azure.com/425108/e1e6d86b-2cb6-45d6-abd6-c59065c50dc4/_boards/board/t/35bb9676-7d48-412a-a473-802c52cb1f12/Microsoft.EpicCategory)
# Digital Menu Application

## Case
The process in a restaurant is usually the same. Customers get seated, are hand over the menu, order drinks and food, consume the drinks and food and finally have dessert. A restaurant has a new idea to convert the above process to a digital experience. You will be developing the requested proof of concept in an agile fashion. Initially you'll focus on the MVP (the most important features) and then continue to flesh out the application. 

## Setup

### PostgreSQL
#### Windows
Go to [PostgreSQL website](https://www.postgresql.org/), download and install the `.exe`.

#### MacOS
##### Install
Install PostgreSQL using brew and start it as service.
``` 
brew update
brew install postgresql
brew services start postgresql
```
Next, create a database.
```
initdb /usr/local/var/postgres -E utf8
```
Then, access it through
```
psql -h localhost -d postgres
```
##### Remove
To remove PostgreSQL from your machine.
```
sudo /Library/PostgreSQL/<version>/uninstall-postgresql.app/Contents/MacOS/uninstall-postgresql
```
Make sure to also remove Postgres as user in System Preferences. The user should be under Users & Groups.

#### Setup
After having installed PostgreSQL, add the following to `application.properties`.
```
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=admin
```
