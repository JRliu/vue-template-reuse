<template>
  <div id="app">
    <template v-tpl="simple" v-tpl-data="localData">
      <div :class="'simple-' + localData.user.name">
        <span>hello </span>
        <span class="name">{{ localData.user.name }}</span>
      </div>
    </template>

    <template v-tpl-use="simple" v-tpl-bind="{ user }"></template>

    <template
      v-tpl-use="simple"
      v-tpl-bind="{ user: { name: 'jerry' } }"
    ></template>

    <template v-tpl-use="simple" v-tpl-bind="{ user: user1 }"></template>

    <hr />
    <p>nesting</p>
    <template
      v-tpl-use="nesting"
      v-tpl-bind="{ user: { name: 'nesting', age: 99 } }"
    ></template>

    <hr />
    <p>slot scope</p>
    <slot-scope msg="msg from App">
      <template v-slot:content="slotProps">
        <div>
          slotProps:
          <span id="slot-scope" style="color: red; font-size: 22px">{{
            slotProps.text
          }}</span>

          <p>templat in slot:</p>
          <template
            v-tpl-use="simple"
            v-tpl-bind="{ user: { name: '雷迪嘎嘎' } }"
          ></template>
        </div>
      </template>
    </slot-scope>

    <template v-tpl="nesting" v-tpl-data="localData">
      <div :class="'div-' + localData.user.name">
        <Nesting :age="localData.user.age"></Nesting>
      </div>
    </template>
  </div>
</template>

<script>
import Nesting from "./components/Nesting.vue";
import SlotScope from "./components/SlotScope.vue";

export default {
  name: "App",
  components: {
    Nesting,
    SlotScope,
  },
  data: function () {
    return {
      msg: "明天放假",
      count: 123,
      user: {
        name: "tony",
        age: 18,
      },
      user1: {
        name: "amy",
        age: 77,
      },
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.name {
  margin-left: 10px;
  font-size: 22px;
  border: 1px solid pink;
}
</style>
