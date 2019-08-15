<template>
  <Page>
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout columns="*" rows="*">
      <!--            <Label class="message" :text="msg" col="0" row="0"/>-->
      <AR>
      </AR>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  export default {
    mounted() {
      setTimeout(() => {
        this.isTime = true;
      }, 1000);
    },

    data() {
      return {
        msg: 'Hello World!',
        isTime: false
      }
    },

    methods: {
        arLoaded() {
            console.log(">> AR Loaded!")
        }
      }
    }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
