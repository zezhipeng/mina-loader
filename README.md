### 一个微信小程序的编译器



#### webpack.config
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.mina$/,
        loader: 'mina-loader',
        options: {
          path: path.resolve(__dirname, 'dist'),
          dist: './dist'
        }
      }
    ]
  }
}
```

#### 使用方式

#### 最简单的姿势

```
require('./pages/index/index.mina')
```
在 app.js 中项目中引入之后会在根目录的 dist 文件夹下生成三份文件分别为 
```
/pages/index/index.wxml
/pages/index/index.wxss
/pages/index/index.js

```


#### 默认语言

现在默认的 template 语言为 pug，style 语言为 stylus

#### 高亮设置

将高亮设置为 vuecomponent 即可


