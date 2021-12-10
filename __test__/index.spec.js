const { assert } = require("chai");
const render = require("./render");

const App = `
	<div id="app">
		<template v-tpl="person" v-tpl-data="localData">
			<span>{{ localData.user.name }}</span>
		</template>

		<template v-tpl-use="person" v-tpl-bind="{ user: {name:'tony'} }"></template>

		<template
			v-tpl-use="person"
			v-tpl-bind="{ user: { name: 'jerry' } }"
		></template>

		<template v-tpl-use="person" v-tpl-bind="{ user: {name: 'amy'} }"></template>

		<template v-tpl-use="cat" v-tpl-bind="{ age: 1, food: 'fish' }"></template>
		<template v-tpl-use="cat" v-tpl-bind="{ age: 5, food: 'beef' }"></template>

		<template v-tpl="cat" v-tpl-data="cat">
			<span>age: {{ cat.age }}</span>
			<span>food: {{ cat.food }}</span>
		</template>

		<HelloWorld></HelloWorld>
	</div>
`;

function getChildren(list) {
  return list.filter((c) => c.tag);
}

describe("template", async () => {
  const app = render(App);

  const children = getChildren(app._vnode.children);

  it("two template, one template behind", () => {
    assert.equal(children[0].children[0].text, "tony");
    assert.equal(children[1].children[0].text, "jerry");
    assert.equal(children[2].children[0].text, "amy");

    assert.equal(children[3].children[0].text, "age: 1");
    assert.equal(children[4].children[0].text, "food: fish");
    assert.equal(children[5].children[0].text, "age: 5");
    assert.equal(children[6].children[0].text, "food: beef");
  });

  it("keep tag Case", () => {
    assert.equal(children[7].tag, "HelloWorld");
  });
});
