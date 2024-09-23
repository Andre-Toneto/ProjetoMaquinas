<template>
  <!-- <v-app theme="light"> certos componentes só funcionam dentro doa tag <v-app> -->

  <NuxtPage />

  <navbar />

  <v-main>
    <v-container>
      <h1 class="d-flex justify-center mb-5 bg-primary rounded-lg py-2 max-w-sm">GRV Software Máquinas</h1>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-card flat class="border mb-6" v-bind="props">
            <v-card-title class="d-flex justify-center border-b bg-warning" variant="outlined"
              @click="getProblem">Máquinas pendentes de manutenção</v-card-title>
          </v-card>
        </template>
        <v-dialog width="600px" class="pa-5" v-model="openClose">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="outlined" color="warning" class="bg-white" @click="clearForm">Adicionar
              Máquinas</v-btn>
          </template>
          <v-card>
            <v-card-title class="pa- ma-2 d-flex justify-center">Adicionar Máquina Para Manutenção</v-card-title>
            <v-card-tex class="pa-5">
              <v-row dense>
                <v-col cols="12" md="4" sm="6">
                  <v-select :items="iden" label="ID da máquina*" required v-model="infos.iden">
                  </v-select>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-select :items="tipo" hint="ex: Centro de usinagem, Torno CNC, etc" label="Tipo da máquina"
                    v-model="infos.tipo"></v-select>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-select :items="urgencia" hint="Ex: Máquina parada = urgente" label="Prioridade" persistent-hint
                    v-model="infos.urgencia" required></v-select>
                </v-col>

                <v-col cols="12" md="12" sm="12">
                  <v-text-field label="Problema" hint="Descreva um resumo do problema identificado" required
                    v-model="infos.problema"></v-text-field>
                </v-col>
              </v-row>
              <v-car-action class="d-flex justify-center ma-3">
                <v-btn color="success" @click="formMaqProb">Enviar</v-btn>
              </v-car-action>
            </v-card-tex>
          </v-card>
        </v-dialog>
        <v-list>
          <v-table>
            <thead>
              <tr>
                <th>ID da máquina</th>
                <th>Tipo da máquina</th>
                <th>Problema</th>
                <th>Prioridade</th>
                <th>Concluir</th>
              </tr>
            </thead>
            <tbody id="manutencao">
              <tr v-for="p in problem" :key="p.iden">
                <td><v-chip variant="outlined">{{ p.iden }}</v-chip></td>
                <td>{{ p.tipo }}</td>
                <td>{{ p.problema }}</td>
                <td>{{ p.urgencia }}</td>
                <td>
                  <v-btn icon color="success" density="confortable" @click="deleteProblem(p.id)">
                    <v-icon icon="mdi mdi-check-outline" class="pa-5"></v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-list>
      </v-menu>
      <v-row>
          <v-dialog width="600px" class="pa-5">
            <template #activator="{ props }">
              <v-fab appear color="success" app location="bottom end" v-bind="props" class="mb-10">Adicionar Máquinas</v-fab>
            </template>
            <v-card>
              <v-card-title class="pa- ma-2 d-flex justify-center">Adicionar Máquina</v-card-title>
              <v-card-tex class="pa-5">
                <v-row dense>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field label="Identificação*" required v-model="addMac.iden">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field label="Nome" required v-model="addMac.nome">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field hint="ex: Centro de usinagem, Torno CNC, etc" label="Tipo da máquina"
                      v-model="addMac.tipo"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-text-field hint="Ex: Desbaste, acabamento, etc" label="Tipo de serviço" persistent-hint
                      v-model="addMac.servico" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" sm="12">
                    <v-text-field label="Imagem" hint="Coloque o caminho da imagem" required
                      v-model="addMac.img"></v-text-field>
                  </v-col>
                </v-row>
                <v-car-action class="d-flex justify-center ma-3">
                  <v-btn color="success" @click="addMachine">Enviar</v-btn>
                </v-car-action>
              </v-card-tex>
            </v-card>
          </v-dialog>
        <v-col cols="12" md="4" lg="4" sm="6" v-for="maquinas in adicionou" :key="maquinas.id">
          <v-card class="mx-auto" max-width="500">
                <div class="d-flex justify-end">
                  <v-btn variant="text" color="error" icon density="compact" class="ma-1" @click="deleteMac(maquinas.id)">
                    <v-icon icon="mdi mdi-delete-forever"></v-icon>
                  </v-btn>
                </div>
              <v-img :src="maquinas.img" height="200px" class="align-end text-white border-b-sm">
              <v-card-title class="bg-primary ma-2 rounded-lg d-flex justify-center pa-0">{{ maquinas.nome }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3">{{ maquinas.iden }}</v-card-subtitle>

            <v-card-text>
              <div>{{ maquinas.tipo }}</div>
              <div>{{ maquinas.servico }}</div>
            </v-card-text>

            <v-card-action class="d-flex justify-center">
              <v-btn class="ma-3" variant="outlined" color="primary" to="/infomaq">Detalhes</v-btn>
            </v-card-action>
          </v-card>
        </v-col>


      </v-row>
    </v-container>
  </v-main>

  <AppFooter />

  <router-view />
</template>

<script setup>

const maqs = ref([])
const urgencias = ref([]);


const iden = ref([]);
const tipo = ref([]);
const urgencia = ref([]);

const infos = ref({
  iden: null,
  tipo: null,
  urgencia: null,
  problema: null
});

const addMac = ref({
  nome: null,
  iden: null,
  tipo: null,
  servico: null,
  img: null
})

const openClose = ref(false)

const problem = ref([]);

const adicionou = ref([])

const getMaquinas = async () => {
  const req = await fetch("http://localhost:3001/maq");
  const data = await req.json();

  maqs.value = data;

  console.log(data)

  for (let i = 0; i < maqs.value.length; i++) {
    iden.value.push(maqs.value[i].iden);
    tipo.value.push(maqs.value[i].tipo);
  };
};

const getUrgencia = async () => {
  const req = await fetch("http://localhost:3001/maquinas");
  const data = await req.json();

  urgencias.value = data.urgencias;

  for (let i = 0; i < urgencias.value.length; i++) {
    urgencia.value.push(urgencias.value[i].nivel);
  };
}

const formMaqProb = async () => {

  const dataJson = JSON.stringify(infos.value);

  const req = await fetch("http://localhost:3001/maqProb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataJson
  });

  getProblem();

  openClose.value = false;
};


const addMachine = async () => {

  const dataJson = JSON.stringify(addMac.value);


  const req = await fetch("http://localhost:3001/maq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataJson
  });
  console.log(dataJson)

  const res = await req.json();

  openClose.value = false;

  getMac()
};

const getMac = async () => {
  const req = await fetch("http://localhost:3001/maq");
  const data = await req.json();

  adicionou.value = data;

};

const clearForm = () => {
  infos.value = {};
  openClose.value = true
};

const getProblem = async () => {

  const req = await fetch("http://localhost:3001/maqProb");
  const data = await req.json();

  problem.value = data
};


onMounted(() => {
  getMaquinas();
  getUrgencia();
  getProblem();
  getMac();

});

const deleteProblem = async (id) => {

  const req = await fetch(`http://localhost:3001/maqProb/${id}`, {
    method: "DELETE"
  });

  const res = await req.json();

  getProblem();
}

const deleteMac = async (id) => {
  const req = await fetch(`http://localhost:3001/maq/${id}`, {
    method: "DELETE"
  });

  const res = await req.json();

  getMac()
};

</script>