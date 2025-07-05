import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { EventState } from '../Model/events';

const initialState: EventState = {
  message: {
    type: '',
    value: '',
  },
  allEvents: [],
  calendars: [],
  events: [],
};

const classSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addCalendar: (state, { payload }) => {
      const calendars = state.calendars;

      if (calendars && Array.isArray(calendars) && calendars.length > 0) {
        const allCalendar = [payload, ...calendars];
        state.calendars = allCalendar;
      } else {
        state.calendars = [payload];
      }
    },

    modifyCalendar: (state, { payload }) => {
      const calendars = state.calendars;
      if (calendars.length > 0 && payload) {
        const newItem = calendars.map((obj: any) =>
          obj._id === payload._id ? { ...obj, ...payload } : obj
        );
        console.log('newItem', newItem);
        state.calendars = newItem;
      }
    },

    getCalenders: (state, { payload }) => {
      let calendars = payload;
      console.log('calendars', calendars);

      if (calendars && calendars.length > 0) {
        state.calendars = calendars;
      }
    },
    addEvent: (state, { payload }) => {
      try {
        let props = { ...payload }; // Create a shallow copy of the payload
        const allEvents = state.allEvents;
        const events = state.events;

        props.start = new Date(payload.start);
        props.end = new Date(payload.end);

        const isCheckedEvent = state.calendars.find(
          cal => cal._id === props.category && cal.checked
        );

        state.allEvents = [...allEvents, props];

        if (isCheckedEvent && Object.keys(isCheckedEvent).length > 0) {
          state.events = [...events, props];
        }
      } catch (error) {}
    },
    updateEvent: (state, { payload }) => {
      try {
        let props = { ...payload }; // Create a shallow copy of the payload

        const allEvents = state.allEvents;
        const events = state.events;

        props.start = new Date(payload.start);
        props.end = new Date(payload.end);

        state.allEvents = allEvents.map((event: any) => (event._id === props._id ? props : event));

        state.events = events.map((event: any) => (event._id === props._id ? props : event));
      } catch (error) {
        console.log('error at 113', error);
      }
    },
    getEvents: (state, { payload }) => {
      let events = payload;

      if (events && events.length > 0) {
        const formatedDates = events.map((val: any) => {
          return {
            ...val,
            start: new Date(val.start),
            end: new Date(val.end),
          };
        });

        state.allEvents = formatedDates;

        const checkedItems = state.calendars.map(cal =>
          formatedDates.filter((event: any) => event.category === cal._id && cal.checked)
        );
        const mergeArrays = (nestedArray: any) => {
          return nestedArray.reduce((acc: any, curr: any) => acc.concat(curr), []);
        };
        const mergedArray = mergeArrays(checkedItems);

        console.log('mergedArray', mergedArray);
        state.events = mergedArray;
      }
    },
    deleteEvent: (state, { payload }) => {
      try {
        const allEvents = state.allEvents;
        const events = state.events;

        state.allEvents = allEvents.filter((event: any) => event._id !== payload);
        state.events = events.filter((event: any) => event._id !== payload);
      } catch (error) {}
    },
    unselectEvents: (state, { payload }) => {
      const filteredItems = state.events.filter(event => event.category !== payload);
      state.events = filteredItems;
    },

    selectEvents: (state, { payload }) => {
      const filteredItems = state.allEvents.filter(
        event => event.category === payload && event.category !== '0'
      );

      if (filteredItems && filteredItems.length > 0) {
        state.events = [...state.events, ...filteredItems];
      }
    },

    removeCalender: (state, { payload }) => {
      if (payload._id && state.calendars && state.calendars.length > 0) {
        const values: any = state.calendars;
        const removed = values.filter((subject: any) => subject._id !== payload._id);

        if (removed && Array.isArray(removed) && removed.length > 0) {
          state.calendars = removed;
        } else {
          state.calendars = [];
        }
      }
    },
    removeCalenders: (state, { payload }) => {
      if (state.calendars.length > 0 && payload) {
        const classes: any = state.calendars;
        const removed = classes.filter((obj: any) => !payload.includes(obj._id));

        if (removed && Array.isArray(removed) && removed.length > 0) {
          state.calendars = removed;
        } else {
          state.calendars = [];
        }
      }
    },
  },
});

export const {
  getCalenders,
  getEvents,
  removeCalenders,
  addCalendar,
  removeCalender,
  // findById,
  modifyCalendar,
  unselectEvents,
  selectEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} = classSlice.actions;
export default classSlice.reducer;
