<template>
  <div class="hello" @click="change">
    <h1>{{ text }}</h1>
    <slot name="content" v-bind:text="text"> </slot>
    <h5>{{ msg }}</h5>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    msg: String,
  },
  data: function () {
    return {
      text: "哈哈娃娃",
    };
  },
  methods: {
    change() {
      //   this.text = this.text + "ha";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
