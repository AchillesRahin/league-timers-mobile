# league-timers-mobile

Can skip below if you just need to set up the app but I'll give a brief explanation of app here

Pretty self explanatory but a simple league timers app made in react mobile so it's easy to deploy and test in both 
iphone and android. Also since I don't own an android and don't have a mac I had only a couple choices for frameworks
to pick between. Anyways key features are search this will call either the microservice server I will deploy or the
serverless AWS Lamda function I created. These will return values in the format given by the test response called
"testSpectateResponse.json". Using this we create the 5 rows each with a champ picture + the summoner spells used by 
the player. Right now the images are fetched from the internet I might change this in future but include('./picname')
cannot use variables so at the moment don't plan on hardcoding as it's very prone to error over so many champs/spells
and will have to update every time Riot releases a new champ. 

So features currently there
Search bar: can search for player (test player is "achilles great")
returns jsonarray of 5 players on the enemy team with the spells they're using + cooldowns + whether they are using inspiration
(as a note inspiration will reduce cooldown by a %)
Currently displays all 5 enemies and they're wrapped around a clickable object. 
Backend: completed both in aws lamda + small web server. Probably will go with lamda solution unless I decide to include a 
database+caching but considering spectate data is only useful for 30 mins caching is probably not needed outside of the
app itself. 

Features need to add
- on click should display a countdown of the time remaining
- (optional) be able to drag a row on longPress so user can order the enemy summoners as they please
- home screen + navbar for home+info+actualapp+(optional)setusername










----------------------------------------------------------------------------

HOW TO SET UP THE APP

to run app need a couple packages that are easily attainable by node if you don't already have

install node

run following - this command will install expo command globally
npm install -g expo-cli

clone the repository

cd into the repository then run the below command. This should create the node_modules
npm install

from here we are ready to get started on using the app but first we need to install the expo client app to our phone.
Go to app store and install the expo client this will allow you to easily test your code even on your phone. 


Once you finish installing the expo client on your mobile device type the command below to start
npm start

a new window will open now go to your camera on your phone and point it towards the QR code and it should give you an option to open the app
now try out the app!


Currently the app simply has an example api response which was taken from the microservice I made. I plan on either using AWS Lamda
to have a serverless way to get data from the riot api or using a microservice hosted on AWS. 
The reason this is necessary rather than simply calling the riot api from our app is because we would need to save the api key somehow
in the app itself in order to fetch data. This will leave our api key exposed and this is not allowed as per riot policy nor is it safe
so instead we will use a proxy with one of the above methods. 

the TODO right now is primarily in the frontend code.
