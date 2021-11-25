# vue-template-reuse-compiler

This package allowed you to reuse template fragment in SFC, such as

```vue
<template>
	<!-- defined a avatar template -->
	<template v-tpl="avatar" v-tpl-data="localUser">
		<img class="avatar" :src="localUser.avatar_url" />
		<span class="name">name: {{ localUser.name }}</spam>
	</template>

	<!-- use avatar template -->
	<template v-tpl-use="avatar" v-tpl-bind="{avatar_url:'test1.png', name: 'tony'}"></template>

	<template v-tpl-use="avatar" v-tpl-bind="user2"></template>

	<template v-tpl-use="avatar" v-tpl-bind="{avatar_url:'test3.png', name: 'amy'}"></template>
</template>

<script>
export default {
  data: function () {
    return {
      user2: {
        name: "jenny",
        avatar_url: "test2.png",
      }
    };
  },
};
</script>
```

a detailed example: [Example](./example)

Actually, you can use [pug](https://pugjs.org/language/mixins.html) or jsx to achieve.

## How to use

```
yarn add vue-template-reuse-compiler -D
```

if you use vue-cli, edit your vue.config.js:

```
const getCompiler = require('vue-template-reuse-compiler')
module.exports = {
  ...
  chainWebpack: (config) => {
	...
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = getCompiler();

        return options;
      });
  },
};
```

if you used a special compiler instead of `vue-template-compiler`, you can do this:

```
const yourCompiler = require('your-compiler')
const getCompiler = require('vue-template-reuse-compiler')
module.exports = {
  ...
  chainWebpack: (config) => {
	...
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = getCompiler(yourCompiler);

        return options;
      });
  },
};
```
