export const DAYS = [
  { label: 'Po', date: '19.5', today: false },
  { label: 'Út', date: '20.5', today: false },
  { label: 'St', date: '21.5', today: true },
  { label: 'Čt', date: '22.5', today: false },
  { label: 'Pá', date: '23.5', today: false },
];

export const HOURS = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

// Pre-filled slots: key = 'dayIdx-hourIdx', spread across all 5 days
export const INITIAL_SLOTS = {
  '0-0': { name: 'Jana N.', service: 'Střih', color: '#6B5BFF' },
  '0-2': { name: 'Petra K.', service: 'Barvení', color: '#FF5A3C' },
  '0-5': { name: 'Tomáš V.', service: 'Masáž', color: '#16B364' },
  '1-1': { name: 'Lucie M.', service: 'Pedikúra', color: '#6B5BFF' },
  '1-3': { name: 'Ondřej P.', service: 'Servis', color: '#FF5A3C' },
  '1-6': { name: 'Markéta S.', service: 'Manikúra', color: '#16B364' },
  '2-0': { name: 'Eva H.', service: 'Fyzio', color: '#6B5BFF' },
  '2-4': { name: 'Karel B.', service: 'Střih', color: '#FF5A3C' },
  '3-2': { name: 'Věra D.', service: 'Masáž', color: '#16B364' },
  '3-5': { name: 'Martin R.', service: 'Pedikúra', color: '#6B5BFF' },
  '4-1': { name: 'Alena Č.', service: 'Barvení', color: '#FF5A3C' },
};

// Booking sequence — slots NOT overlapping with INITIAL_SLOTS
export const BOOKING_SEQUENCE = [
  { day: 0, hour: 4, name: 'Simona T.', fullName: 'Simona Třísková', service: 'Manikúra', amount: 480, color: '#6B5BFF', notifType: 'booking' },
  { day: 2, hour: 2, name: 'Radek F.', fullName: 'Radek Fišer', service: 'Střih', amount: 350, color: '#16B364', notifType: 'payment' },
  { day: 1, hour: 5, name: 'Hana Ž.', fullName: 'Hana Žáková', service: 'Fyzio', amount: 900, color: '#FF5A3C', notifType: 'confirm' },
  { day: 4, hour: 3, name: 'Jiří N.', fullName: 'Jiří Novotný', service: 'Masáž', amount: 750, color: '#6B5BFF', notifType: 'booking' },
  { day: 3, hour: 6, name: 'Pavla O.', fullName: 'Pavla Ottová', service: 'Pedikúra', amount: 560, color: '#16B364', notifType: 'reminder' },
];

export const CLIENTS = [
  { initials: 'JN', name: 'Jana Nováková', color: '#6B5BFF', bookings: 14 },
  { initials: 'PK', name: 'Petra Kopecká', color: '#FF5A3C', bookings: 9 },
  { initials: 'TV', name: 'Tomáš Vlček', color: '#16B364', bookings: 11 },
  { initials: 'LM', name: 'Lucie Malá', color: '#E89B6C', bookings: 7 },
  { initials: 'OP', name: 'Ondřej Procházka', color: '#5B4FE9', bookings: 5 },
  { initials: 'MS', name: 'Markéta Součková', color: '#D4A24A', bookings: 8 },
  { initials: 'EH', name: 'Eva Horáčková', color: '#C84A4A', bookings: 6 },
  { initials: 'KB', name: 'Karel Beneš', color: '#2D9D6F', bookings: 12 },
  { initials: 'VD', name: 'Věra Dvořáková', color: '#9B6FC8', bookings: 3 },
];

export const SPARKLINE_DATA = [40, 55, 45, 68, 62, 78, 74, 85, 82, 91, 88, 100];

export const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Nová rezervace', detail: 'Jana Nováková · 10:00', unread: true },
  { id: 2, text: 'Platba přijata', detail: '1 200 Kč · Petra', unread: true },
  { id: 3, text: 'Připomínka odeslána', detail: '12 klientům', unread: false },
];

export const CARD_BASE = {
  background: '#fff',
  borderRadius: '20px',
  border: '1px solid var(--border)',
  boxShadow: '0 4px 12px rgba(14,14,16,.06), 0 12px 32px rgba(14,14,16,.06)',
  padding: '18px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms cubic-bezier(.4,0,.2,1)',
};
