<script>
import { getHours } from "../services/services";
import LsDatePicker from "../components/LSDatePicker";

export default {
  name: "Home",
  components: { LsDatePicker },
  data() {
    return {
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      restaurants: [],
      selectedDate: new Date().toLocaleDateString(),
      selectedTime: new Date(),
      currentYear: new Date().getFullYear(),
      menu: false,
    };
  },
  mounted() {
    getHours().then((data) => {
      this.restaurants = this.parseRestaurants(data);
    });
  },
  methods: {
    checkIfAvailable(dayToCheck, timeToCheck, availableTime) {
      let dt = new Date(dayToCheck + " " + timeToCheck);
      let dayOfWeek = this.daysOfWeek[dt.getDay() - 1];

      let startDate = new Date(dayToCheck + " " + availableTime.startTime);
      let endDate = new Date(dayToCheck + " " + availableTime.endTime);

      if (availableTime.day == dayOfWeek) {
        // I'm assuming for the endDate we want a <
        return dt >= startDate && dt < endDate;
      }
      return false;
    },
    parseRestaurants(restArray) {
      // parse the JSON and enrich the data so it's more usable for time comparisons
      // the end format will look like this:
      // {
      //   name : "my restaurant",
      //   days : [
      //     {
      //       day: "Mon",
      //       startTime: "11:30 am",
      //       endTime: "9:00 pm"
      //     },
      //     // if the end time is in the AM (i.e. 11am - 1am) split it in two, like this:
      //     {
      //       day: "Tue",
      //       startTime: "11:30 am",
      //       endTime: "11:59 pm"
      //     }
      //     {
      //       day: "Wed",
      //       startTime: "12:00 am"
      //       endTime: "1:00 am"
      //     }
      //   ]
      // }

      for (let r of restArray) {
        r.days = this.parseTimes(r.times);
        delete r.times;
      }
      return restArray;
    },
    parseTimes(timesArray) {
      let results = [];
      for (let t of timesArray) {
        let days = [];
        let words = t.split(" ");

        // the dates are in one of the following formats:
        // Mon
        // Mon-Thu
        // Mon-Wed, Fri, Sat,
        // to account for the last case we need to loook through all the words
        // until we find the last one with a comma

        let commaIndex = 0;

        // technically I don't see any examples with more than one comma but I want to be robust
        while (words[commaIndex].indexOf(",") > -1) commaIndex++;

        let i = 0;
        while (i <= commaIndex) {
          if (words[i].indexOf("-") > -1) {
            days = days.concat(this.parseDayRange(words[i]));
          } else days.push(words[i]);
          i++;
        }
        let time = words[i];
        if (time.indexOf(":") == -1) time += ":00";
        let ampm = words[i + 1];
        let startTime = time + " " + ampm;
        i += 3; // add three so we skip the time, the am/pm, and the '-'
        time = words[i];
        if (time.indexOf(":") == -1) time += ":00";
        ampm = words[i + 1];
        let endTime = time + " " + ampm;

        // since the time picker only allows picking at the minute level
        // we can consider 11:59 pm the latest possible time to check
        // if the end time is later than 12 am we split it in two below
        if (endTime == "12:00 am")
          endTime = "11:59 pm";

        // check if end time is before start time, which would mean
        // we've wrapped around to the next day
        let startDate = new Date(this.selectedDate + ' ' + startTime)
        let endDate = new Date(this.selectedDate + ' ' + endTime)
        
        if (endDate > startDate) {
          for (let i = 0; i < days.length; i++) {
            days[i] = {
              day: days[i],
              startTime: startTime,
              endTime: endTime,
            };
          }
        } else {
          // if the end time is in the am and it's less than the start time split it in two
          let newEndTime = '11:59 pm'
          let newStartTime = '12:00 am'
          let newDays = []
          for (let i = 0; i < days.length; i++) {
            newDays.push({
              day: days[i],
              startTime: startTime,
              endTime: newEndTime,
            })
            
            let dayIndex = this.daysOfWeek.indexOf(days[i]) + 1;
            // wrap around for the end of the week
            if (dayIndex == this.daysOfWeek.length)
              dayIndex = 0;
            newDays.push({
              day: this.daysOfWeek[dayIndex],
              startTime: newStartTime,
              endTime: endTime,
            })
          }
          days = newDays
          console.log(newDays)
        }
        results = results.concat(days);
      }

      return results;
    },
    // Parse a string of the format Mon-Thu
    parseDayRange(rangeStr) {
      rangeStr = rangeStr.replace(",", "");
      let arr = rangeStr.split("-");
      let beginDay = arr[0];
      let endDay = arr[1];
      let beginIndex = this.daysOfWeek.indexOf(beginDay);
      let endIndex = this.daysOfWeek.indexOf(endDay);
      let res = this.daysOfWeek.slice(beginIndex, endIndex + 1);
      return this.daysOfWeek.slice(beginIndex, endIndex + 1);
    },
  },
  computed: {
    formattedTime() {
      let dt = this.selectedTime;
      if (typeof this.selectedTime == "string") {
        dt = new Date(this.selectedDate + " " + this.selectedTime);
      }
      return dt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    },

    filteredRestaurants() {
      return this.restaurants.filter((item) => {
        return item.days.some((day) =>
          this.checkIfAvailable(this.selectedDate, this.formattedTime, day)
        );
      });
    },
  },
};
</script>

<template>
  <v-container justify-center align-center>
    Enter a date and time:
    <v-layout row>
      <ls-date-picker
        v-model="selectedDate"
        :no-date="false"
        :start-year="currentYear"
        :end-year="currentYear + 1"
        abbr-month="false"
        title="Choose Date"
      ></ls-date-picker>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="selectedTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="formattedTime"
            label="Choose Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          :ampm-in-title="true"
          format="ampm"
          v-if="menu"
          v-model="selectedTime"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(selectedTime)">
            OK
          </v-btn>
        </v-time-picker>
      </v-menu>
    </v-layout>
    <v-layout column>
      <h2 class="list-header">Available Restaurants:</h2>
      <ul>
        <li v-for="(restaurant, index) in filteredRestaurants" :key="index">
          {{ restaurant.name }}
        </li>
      </ul>
    </v-layout>
  </v-container>
</template>


<style scoped>
.list-header {
  margin: 10px 0;
}
</style>