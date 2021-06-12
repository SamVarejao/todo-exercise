<template>
  <div>
    <p>{{ task }}</p>
    <p>{{ completion }}</p>
    <p>{{ start }}</p>
    <p>{{ due }}</p>
    <p>{{ priority }}</p>
    <p>{{ status }}</p>
  </div>
</template>

<script>
export default {
  props: ["task", "completion", "start", "due", "priority", "status"],
};
</script>

<style></style>
