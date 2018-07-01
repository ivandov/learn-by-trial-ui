<template>
  <div id="studentAdd">
    <div class="columns is-centered">
      <div class="card column is-three-fifths">
        <div class="card-content">
          <p class="title">Add New Student</p>

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="First and last name" v-model="student.name">
              <!-- <input class="input" type="date" placeholder="01/01/2017"> -->
            </div>
          </div>

          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input class="input" type="date" placeholder="01/01/2017" v-model="student.birthdate">
            </div>
          </div>

          <div class="field">
            <label class="label">Sex</label>
            <div class="control">
              <!-- <input class="is-checkradio" type="radio" name="question">
              <label class="radio">Female</label>
              <input class="is-checkradio" type="radio" name="question">
              <label class="radio">Male</label> -->
              <label class="radio">
                <input type="radio" name="sex" value="Female" v-model="student.sex">
                Female
              </label>
              <label class="radio">
                <input type="radio" name="sex" value="Male" v-model="student.sex">
                Male
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Race</label>
            <div class="control">
              <div class="select">
                <select v-model="student.race">
                  <option>Select Race</option>
                  <option v-for="(race) in races" :key="race">
                    {{ race }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- <div class="field">
            <label class="label">Siblings</label>
          </div> -->

          <!-- <div class="field">
            <label class="label">Language Level</label>

          </div> -->

        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="addStudent">Add</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StudentAdd',
  components: {
  },
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
      let uri = process.env.API_URL + '/student'
      // console.log(uri)
      alert('Posting: \n' + JSON.stringify(this.student, null, 2))
      let res = await axios.post(uri, this.student)

      if (res.status === 200) {
        this.$router.push({name: 'DashHome'})
        this.$emit('notification', {
          msg: 'Student ' + res.data.name + ' has been added successfully with id: ' + res.data.id,
          styleClass: 'is-success'
        })
      }
    }
  }
}
</script>

