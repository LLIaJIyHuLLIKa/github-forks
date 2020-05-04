<template>
    <div class="github-table">
        <forks-table></forks-table>
    </div>
</template>

<script>
import ForksTable from '../components/GithubTable/ForksTable.vue';

export default {
    name: "github-table",
    components: {
        ForksTable
    }
}
</script>