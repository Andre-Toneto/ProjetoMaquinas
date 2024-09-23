<template>
    
    <v-select :items="props.items" label="ID da máquina*" required v-model="id">
    
    </v-select>

</template>

<script > 
       export default {
        name: "select",
        data(){
            return{
               
            }
        }
    }
    // const emit = defineEmits (['id']);

    // const id = null;
    
    // const props = defineProps({
    //     items: {
    //         default: []
    //     }
    // })
</script>