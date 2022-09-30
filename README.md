## **GetOnlineSDK**
Unofficial SDK - Finnish Text's

- Tuetut kielet / Languages supported: Finnish

### Esimerkit - Examples
---------------

#### Valmistele SDK / Initialize SDK
```js
const GetOnline = require('./getOnline');

const getOnline = new GetOnline();
```

- Esimerkkiparametrit GetOnline-konstruktoriin / Example Parameters to GetOnline constructor
```js
const getOnline = new GetOnline({
    debug: true // true or false
});
```

#### Tulevat turnaukset / Upcoming tournaments
```js
getOnline.TulevatTurnaukset().then((res) => {
    console.log(res); // Palauttaa joukon tulevia turnauksia - Returns array of Upcoming tournaments
}).catch((err) => {
    console.log(err); // Tapahtui virhe - An error has occurred
})
```

- Taulukon sisältö tuloksesta / Contents of array from result
```js
[
  {
    turnauksenNimi: 'STRING',
    pelinNimi: 'STRING',
    alkaa: 'STRING',
    loppuu: 'STRING'
  },
  {
    turnauksenNimi: 'STRING',
    pelinNimi: 'STRING',
    alkaa: 'STRING',
    loppuu: 'STRING'
  }
]
```

#### Päättyneet turnaukset / Finished tournaments
```js
getOnline.MenneetTurnaukset().then((res) => {
    console.log(res); // Palauttaa joukon Päättyneitä turnauksia - Returns an array of Finished tournaments
}).catch((err) => {
    console.log(err); // Tapahtui virhe - An error has occurred
})
```

- Taulukon sisältö tuloksesta / Contents of array from result

```JS
[
  {
    turnauksenNimi: 'STRING',
    pelinNimi: 'STRING',
    alkoi: 'STRING',
    loppui: 'STRING'
  },
  {
    turnauksenNimi: 'STRING',
    pelinNimi: 'STRING',
    alkoi: 'STRING',
    loppui: 'STRING'
  }
]
```

## GetOnline by garde.fi

https://www.garde.fi/

