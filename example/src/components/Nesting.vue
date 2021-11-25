<template>
  <div>
    <template v-tpl-use="haha" v-tpl-bind="{ text: 'ladygaga' }"></template>
    <template v-tpl-use="haha" v-tpl-bind="{ text: 'psy' }"></template>

    <template v-tpl="haha" v-tpl-data="localData">
      <div :class="localData.text">
        age: {{ age }}
        <span style="font-size: 18px; color: blue">{{ localData.text }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    age: Number,
  },
  data: function () {
    return {
      title: "component test",
      text: "哈哈娃娃",
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
