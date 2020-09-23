### Minimalize Modern React Boilerplate (Easy To Customize)

**Berikut** adalah **React Boilerplate** yang sudah siap pakai untuk **Production** atau **Development** yang sudah terintegrasi dengan beberapa tools **Front-End** populer khususnya untuk **React Developer** dan bisa di **customisasi** sesuai dengan selera masing - masing bagi siapa saja yang mau menggunakannya, dikarenakan dari masing - masing orang mungkin ingin mempunyai standar **customisasi** nya sendiri sesuai dengan keinginannya masing - masing, **demo mini project** menggunakan [**React CSA Boilerplate**](https://ngintip-ongkir.herokuapp.com).

<img src="https://i.imgur.com/SZrhPak.png" width="1024" height="500" alt="logo-react" style="position:relative; margin: auto; padding:10px">

<img src="https://i.imgur.com/QGF0JH2.png" width="1024" height="200" alt="logo-react" style="position:relative; margin: auto; padding:10px">

#### Run Application

- Development Mode - **npm run s**
- Production Build - **npm run b**
- Production Build & Analyzer Bundle - **npm run ba**
- Testing React Component - **npm run t**

#### Features

- [x] Support REACT HMR & CSS HMR
- [x] Support Proggresive Web Apps (PWA) For Production
- [x] Support SASS Preprocessor CSS
- [x] Support Dynamic Import & Code Splitting
- [x] Support Linting JavaScript & CSS
- [x] Support .env File
- [x] Support Manual Proxy Like CRA
- [x] Support GraphQL
- [x] Support Friendly Error
- [x] Support Styled Components & Another CSS Library In JS
- [x] Support Unit Test Jest & Enzyme
- [x] And More

#### Build Include Technology

- React
- Webpack
- Babel
- Workbox
- Eslint
- Prettier
- Stylelint
- Postcss
- Jest
- Enzyme
- Any More

#### TIPS (Menyajikan file content yang di compress)

- install **express-static-gzip**
- kemudian tambahkan `code` seperti ini di **Back-End Server** anda.

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(process.cwd(), 'client/build')))

  app.use(
    '*',
    staticGzip(resolve(process.cwd(), 'client/build/static/js'), {
      enableBrotli: true
    })
  )

  app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'client/build/index.html'))
  })
}
```

- atau dengan menambahkan [custom content header middleware ](https://pastebin.com/8zwPjiSH) **(optional)**

### Author

- **[Restu Wahyu Saputra](https://github.com/restuwahyu13)**

### LICENSE

- **[MIT](https://github.com/restuwahyu13/react-boilerplate/blob/master/LICENSE.md)**
