## Cloud Functions Notepad
taking notes because i'll have to redo this on my other computer probably.

first step was to create a project in firebase which seems to be pretty much
fully assimilated within GCP at this point but luckily i'm used to this interface.

something interesting was it wanted me to get started with building a specific
app for web, android, ios, and some other things i probably didin't care about. 
i ended up not choosing any of them but glossed over the ios one and it asked
for some developer configs that im supposed to get from my non-existant xcode
project. i wonder why these offerings exist and what they do, after all some of 
firebase's offerings like auth, serverless functions, and storage aren't like
exclusive to any of those platforms. maybe easier interface when dealing with 
them or more optimized build? dunno, couldn't get thru the whole ios thingy 
again due to the lack of some xcode project fields.

had to install firebase CLI with:
```
npm install -g firebase-tools
```

then created a new directory (this one) and inside ran
```
firebase login // similar to gcloud auth, probably pretty similar under the hood as well
firebase init
```

deploying is done with
```
$ firebase deploy
```

also found this example _really_ good [0], basically everything I'm trying to do.

also giving typescript another shot on this one. i may be making a terrible
mistake because im lazy and this is just for rapid prototyping, but i'll have
to learn it eventually anyway.

[0] https://github.com/fireship-io/196-sendgrid-email-cloud-functions/tree/master
