const path = require(`path`); // подключаем native utility module из Ноды

// объект конфигурации webPack
module.exports = {
  mode: `development`, // режим сборки
  entry: { // точка входа приложения
    bundle: `./src/main.js`
  },
  output: { // настройка выходного файла
    filename: `[name].js`, // название файла, которые соберет вебпак
    path: path.join(__dirname, `public`) // string
  },
  devtool: `source-map`, // включаем соурс-мапы
  module: { // для обработки файлов подключаем babel-loader
    rules: [{
      test: /\.js$/, // проверка типов файлов для обработки лоадером
      loader: `babel-loader`, // название лоадера
      exclude: path.join(__dirname, `node_modules`) // те файлы, которые лоадер не будет чекать
    }]
  },
  devServer: { // настройки дев-сервера
    contentBase: path.join(__dirname, `public`), // директория для поиска сборки
    publicPath: `http://localhost:8080/`, // веб адрес сборки
    hot: true, // автоматическая перезагрузка страницы
    compress: true // сжатие файла сборки
  }
};
