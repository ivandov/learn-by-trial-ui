<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Add New Student</p>
    </header>
    <div class="card-content">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="First and last name" v-model="student.name">
        </div>
      </div>

      <b-field label="Birthdate">
        <b-datepicker
          placeholder="Tap to select..."
          icon="calendar-today"
          v-model="student.birthdate">
        </b-datepicker>
      </b-field>

      <b-field label="Sex">
        <div class="block">
            <b-radio v-model="student.sex" native-value="Female">Female</b-radio>
            <b-radio v-model="student.sex" native-value="Male">Male</b-radio>
        </div>
      </b-field>

      <b-field label="Race">
        <b-select placeholder="Select a race" v-model="student.race">
            <option
                v-for="race in races"
                :value="race"
                :key="race">
                {{ race }}
            </option>
        </b-select>
      </b-field>

    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="addStudent">Add</a>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      races: [
        'Hispanic / Latino / Spanish Origin',
        'American Indian / Alaskan Native',
        'Asian',
        'Native Hawaiian / Other Pacific Islander',
        'Black / African American',
        'White',
        'Two or more races'
      ],
      student: {}
    }
  },
  methods: {
    async addStudent () {
      try {
        let res = await this.$http.post('/students', this.student)
        this.$router.push({name: 'Student', params: {id: res.data.id}})

        this.$emit('close')

        this.$toast.open({
          duration: 3000,
          message: `Student ${res.data.name} has been added successfully`,
          position: 'is-bottom',
          type: 'is-success'
        })
      }
      catch (error) {
        console.error(error)
        let message = ''
        let style = 'is-warning'
        if (error.response) {
          message = error.response.data.error.message
        }
        else {
          message = 'Error contacting Learn By Trial server'
          style = 'is-danger'
        }
        this.$toast.open({
          duration: 5000,
          message: message,
          position: 'is-bottom',
          type: style
        })
      }
    }
  }
}
</script>