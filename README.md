# SonLamComputer

## Prerequisites for server
1. Install node js and npm
* https://nodejs.org/en/
2. Install git
* https://git-scm.com/
3. Install mongodb
* https://www.mongodb.com/
4. [For Windows users only] Update PATH_VARIABLE 
* https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/
5. Install Robo3T (GUI for handle mongodb server)
* https://robomongo.org/
6. Install Postman (for testing the API)
* https://www.getpostman.com/
7. Run mongodb
```
//For ubuntu
chmod +x run_mongo_db.sh
./run_mongo_db.sh
//For windows
mongod --dbpath ${PATH_TO_THIS_FOLDER}/db_data
```
8. Create user to for accessing to db
```
open new terminal or cmd 
mongo
use sonlamcomputer
db.createUser({ user: "admin", pwd: "123456", roles: [{ role: "readWrite", db: "sonlamcomputer" }]})
exit
```
9. Install dependency 
```
npm install
```
##Runing
```
npm start
```
##Testing
```
npm test
```