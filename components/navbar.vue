<template>
  <v-navigation-drawer v-model="isDrawerOpen">
    <!-- <v-list> -->
    <v-card>
      <!-- <v-list-subheader class="d-flex justify-center">Menu</v-list-subheader> -->
      <!-- <v-list :items="itemList" class="border-b">       
          </v-list> -->
          <v-list class="border-b">
            <template v-for="(item, index) in itemList" :key="index">
              <v-subheader v-if="item.type === 'subheader'" class="d-flex justify-center mb-3">{{ item.title }}</v-subheader>
              <v-list-item v-else :to="item.to" class="border-b">
                <v-list-item-content class="d-flex align-center">
                  <v-icon v-if="item.props && item.props.prependIcon" class="mr-2">
                    {{ item.props.prependIcon }}
                  </v-icon>
                  <v-list-item-title >{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
    </v-card>
    <!-- <v-list-item prepend-icon="mdi mdi-all-inclusive" class="border-b" item="Todas as máquinas"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-hand-clap" class="border-b">Máquinas Operatrizes</v-list-item>
          <v-list-item prepend-icon="mdi mdi-refresh-auto" class="border-b">Máquinas CNC</v-list-item>
          <v-list-item prepend-icon="mdi mdi-hammer-screwdriver" class="border-b">Máquinas Manuais</v-list-item>
        </v-list> -->
  </v-navigation-drawer>

  <v-app-bar flat class="border-b">
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
    <v-app-bar-title>Máquinas</v-app-bar-title>

    <template #append>
      <v-btn icon>
        <v-badge dot color="info">
          <v-icon icon="mdi mdi-bell"></v-icon>
        </v-badge>
      </v-btn>
      <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props">
            <v-img cover src=""></v-img>
          </v-avatar>
        </template>
        <v-card min-width="150px">
          <v-list :lines="false" destiny="compact" nav>
            <v-list-item prepend-icon="mdi mdi-account-outline">
              <v-list-item-title>Meu perfil</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
  <router-view />
</template>

<script setup>

// const itemList = ref([
//   {text: 'Todas as Máquinas'},
//   {text:'Máquinas Operatrizes'},
//   {text:'Máquinas CNC'},
//   {text:'Máquinas Manuais'}
// ]);

const itemList = ref([
  { type: 'subheader', title: 'Menu' },
  {
    title: 'Todas as máquinas',
    value: 1,
    to: '/',
    props: {
      prependIcon: 'mdi mdi-all-inclusive',
    }
  },
  {
    title: 'Máquians Operatrizes',
    value: 2,
    props: {
      prependIcon: 'mdi mdi-hand-clap',
    }
  },
  {
    title: 'Máquinas CNC',
    value: 3,
    props: {
      prependIcon: 'mdi mdi-refresh-auto',
    }
  },
  {
    title: 'Máquinas Manuais',
    value: 4,
    props: {
      prependIcon: 'mdi mdi-hammer-screwdriver',
    }
  }
]);

const isDrawerOpen = ref(false)

// export default {
//     name: "navbar",
//     data(){
//         return{
//             isDrawerOpen: false
//         }
//     }
// }

</script>