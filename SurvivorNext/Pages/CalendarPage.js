import React, { useEffect, useState } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { useAppContext } from '../AppContext';

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: "Today"
};

LocaleConfig.defaultLocale = 'en';

export default function CalendarPage() {
    const [selected, setSelected] = useState('');
    const [calendarKey, setCalendarKey] = useState(Date.now().toString());

    useEffect(() => {
        setCalendarKey(Date.now().toString());
    }, [selected]);

    const {
        appColor,
    } = useAppContext();

    return (
        <Calendar
            key={calendarKey}
            onDayPress={day => {setSelected(day.dateString);}}
            markedDates={{[selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            style={{
                borderRadius: 5,
                margin: 12,
            }}
            theme={{
                calendarBackground: '#222',
                dayTextColor: '#fff',
                textDisabledColor: '#444',
                monthTextColor: appColor,
                textSectionTitleColor: appColor,
                selectedDayBackgroundColor: appColor,
                todayTextColor: appColor,
                arrowColor: appColor,
            }}
        />
    )
}
