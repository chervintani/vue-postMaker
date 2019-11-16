<template>
    <div>
    <button @click="toggle" class="button is-small is-primary" style="margin-top:50%">Update</button>
  </div>
</template>
<script>
export default {
    name: "UpdateProfModal",
    data() {
    return {
      isActive: true,

    };
  },
}
</script>
