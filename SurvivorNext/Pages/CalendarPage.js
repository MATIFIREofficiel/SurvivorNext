import React, { useState } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';
    
export default function CalendarPage() {
    const [selected, setSelected] = useState('');

    return (
        <Calendar
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
                monthTextColor: '#888'
            }}
        />
    )
}
