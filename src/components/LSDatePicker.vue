<script>
export default {
  name: "LsDatePicker",
  data() {
    return {
      year: 0,
      month: 0,
      date: 0,
      menu: null,
      openMenu: null,
      unedited: true,
      clear: false,
      monthsArray: [
        {
          name: "Jan",
          number: 1,
        },
        {
          name: "Feb",
          number: 2,
        },
        {
          name: "Mar",
          number: 3,
        },
        {
          name: "Apr",
          number: 4,
        },
        {
          name: "May",
          number: 5,
        },
        {
          name: "Jun",
          number: 6,
        },
        {
          name: "Jul",
          number: 7,
        },
        {
          name: "Aug",
          number: 8,
        },
        {
          name: "Sep",
          number: 9,
        },
        {
          name: "Oct",
          number: 10,
        },
        {
          name: "Nov",
          number: 11,
        },
        {
          name: "Dec",
          number: 12,
        },
      ],
    };
  },
  props: [
    "title",
    "disabled",
    "value",
    "returnDate",
    "noDate",
    "startYear",
    "endYear",
    "abbrMonth",
  ],
  methods: {
    handleChange() {
      if (this.unedited) this.unedited = false;

      if (this.returnDate) this.$emit("input", new Date(this.fullDate));
      else this.$emit("input", this.fullDate);
    },
    setDate(day) {
      this.date = day;
      this.handleChange();
    },
    clearDate() {
      console.log("clearDate");
      this.year = 0;
      this.month = 0;
      this.date = 0;
      this.handleChange()
    },
  },
  computed: {
    dateArr: function () {
      const thiries = [4, 6, 9, 11];
      let arr = [];
      let top = 31;
      if (this.month === 2) {
        if (this.year % 4 === 0) top = 29;
        else top = 28;
      } else if (thiries.indexOf(this.month) > 0) top = 30;
      for (let i = 1; i <= top; i++) arr.push(i);
      return arr;
    },

    spaceFillers: function () {
      if (!this.year || !this.month) return 0;

      const NOW = new Date(this.year, this.month - 1, 1, 12, 0, 0);
      NOW.setDate(1);
      return NOW.getDay();
    },

    fullDate: function () {
      if (this.year == 0 && this.month == 0 && this.date == 0 && !this.unedited) {
        return null;
      }

      if (this.unedited) {
        if (!!this.value) {
          let split;
          if (this.value.includes("-")) split = this.value.split("-");
          else split = this.value.split("/");

          if (!split) return "";

          this.month = parseInt(split[0]);
          this.date = parseInt(split[1]);
          this.year = parseInt(split[2]);

          if (!!this.noDate) return `${this.month}/${this.year}`;
          return this.value;
        }
        return "";
      }

      if (!!this.noDate) return `${this.month}/${this.year}`;
      return `${this.month}/${this.date}/${this.year}`;
    },
    yearArr: function () {
      const NOW = new Date();
      const firstYear = !!this.startYear
        ? parseInt(this.startYear)
        : NOW.getFullYear() - 50;
      const lastYear = !!this.endYear
        ? parseInt(this.endYear)
        : NOW.getFullYear() + 25;
      const arr = [];

      for (let i = firstYear; i <= lastYear; i++) arr.push(i);

      return arr;
    },
    monthString: function () {
      if (this.abbrMonth) return "name";

      return "number";
    },
  },
};
</script>


<template>
  <div id="ls-date-picker-wrapper">
    <v-menu
      ref="menu"
      v-model="openMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
      :open-on-click="!disabled"
    >
      <template v-slot:activator="{ on }">
        <v-container id="ls-date-picker-front">
          <v-text-field
            prepend-icon="event"
            v-model="fullDate"
            :label="title"
            readonly
            v-on="on"
            :disabled="disabled"
          ></v-text-field>
          <v-btn @click="clearDate" medium text icon>
            <v-icon>clear</v-icon>
          </v-btn>
        </v-container>
      </template>
      <v-card>
        <v-card-text style="padding: 0">
          <v-layout
            style="
              background-color: #002e5d;
              padding: 8px 16px;
              padding-bottom: 2px;
            "
          >
            <v-flex>
              <v-select
                @change="handleChange"
                label="Month"
                v-model="month"
                :items="monthsArray"
                item-value="number"
                :item-text="monthString"
                dark
              ></v-select>
            </v-flex>
            <v-flex style="padding-left: 8px">
              <v-combobox
                @change="handleChange"
                label="Year"
                :items="yearArr"
                v-model="year"
                dark
              ></v-combobox>
            </v-flex>
          </v-layout>
          <v-layout
            v-if="!this.noDate"
            wrap
            justify-start
            align-start
            style="padding: 8px 16px"
          >
            <v-layout>
              <div class="calendar-header">Su</div>
              <div class="calendar-header">M</div>
              <div class="calendar-header">T</div>
              <div class="calendar-header">W</div>
              <div class="calendar-header">Th</div>
              <div class="calendar-header">F</div>
              <div class="calendar-header">S</div>
            </v-layout>
            <div
              v-for="s in spaceFillers"
              :key="s + '-filler'"
              class="filler-block"
            ></div>
            <div v-for="d in dateArr" :key="d + '-date'">
              <v-btn
                v-if="d === date"
                icon
                color="primary"
                @click="setDate(d)"
                style="border: 0.5px solid rgba(0, 46, 93, 0.5)"
                >{{ d }}</v-btn
              >
              <v-btn v-else icon @click="setDate(d)">{{ d }}</v-btn>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>


<style lang="scss">
#ls-date-picker-wrapper {
  width: 100%;
}

#ls-date-picker-front {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-right: 15px;
  padding-left: 10px;
  padding-right: 20px;
}

.filler-block {
  height: 36px;
  width: 36px;
}

.calendar-header {
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}
</style>