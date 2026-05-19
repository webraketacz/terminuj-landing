import React, { createContext, useContext, useReducer } from 'react';
import { INITIAL_NOTIFICATIONS } from '../lib/heroMockData';

const HeroContext = createContext(null);
let _nextId = 10;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING': {
      const { fullName, time, amount, notifType } = action;
      let text, detail;
      if (notifType === 'payment') {
        text = 'Platba přijata';
        detail = `${amount.toLocaleString('cs-CZ')} Kč · ${fullName.split(' ')[0]}`;
      } else if (notifType === 'confirm') {
        text = 'Klient potvrdil';
        detail = fullName;
      } else if (notifType === 'reminder') {
        text = 'Připomínka odeslána';
        detail = `${Math.floor(Math.random() * 8 + 6)} klientům`;
      } else {
        text = 'Nová rezervace';
        detail = `${fullName} · ${time}`;
      }
      return {
        revenue: state.revenue + amount,
        notifications: [
          { id: _nextId++, text, detail, unread: true },
          ...state.notifications.slice(0, 2),
        ],
      };
    }
    case 'ADD_NOTIFICATION': {
      return {
        ...state,
        notifications: [
          { id: _nextId++, ...action.payload, unread: true },
          ...state.notifications.slice(0, 2),
        ],
      };
    }
    default:
      return state;
  }
}

export function HeroProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    revenue: 12450,
    notifications: INITIAL_NOTIFICATIONS,
  });
  return <HeroContext.Provider value={{ state, dispatch }}>{children}</HeroContext.Provider>;
}

export const useHero = () => useContext(HeroContext);
