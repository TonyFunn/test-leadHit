<template>
  <v-container>
    <h1>LeadHit</h1>
    <form @submit.prevent="onSubmit">
      <v-card
        style="top: 200px;"
        max-width="400"
        class="mx-auto"
      >
        <v-card-title>
          <h3>Id сайта</h3>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-text-field
              type="text"
              variant="outlined"
              :label="'Ведите id'"
              :error-messages="v$.leadhitId.$errors.map(e => e.$message)"
              v-model.trim="fields.leadhitId"
              @input="v$.leadhitId.$touch"
              @blur="v$.leadhitId.$touch"
            />
          </v-row>
          <v-row no-gutters justify="end">
            <v-col cols="auto">
              <v-btn
                color="primary"
                type="submit"
                class="me-4"
                @click="v$.$validate"
              >
                Войти
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </form>
  </v-container>
</template>

<script setup>
import { setHeaderAuth } from '@/utils/API/index.js'
import { getMessageOk } from '@/utils/API/index.js'
import { setItem } from '@/utils/localStorage.js'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers, maxLength } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const router = useRouter()

const fields = reactive({
  leadhitId: ''
})

const rules = {
  leadhitId: {
    required: helpers.withMessage('Обязательное поле', required),
    minLength: helpers.withMessage('Введите 24 символа', minLength(24)),
    maxLength: helpers.withMessage('Не больше 24 символа', maxLength(24))
  }
}

const v$ = useVuelidate(rules, fields)

const onLoginSubmit = async () => {
  const { data } = await getMessageOk(fields.leadhitId)
  if (data.message === 'ok') {
    console.log(1, data.message === 'ok')
    setItem('accessToken', fields.leadhitId)
  }
  setHeaderAuth(fields.leadhitId)
  await router.push({ name: 'Analytic' })
}

const onSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    onLoginSubmit()
  }
}
</script>
