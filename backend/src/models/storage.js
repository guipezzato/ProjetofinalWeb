const fs   = require('fs');
const path = require('path');

const USERS_FILE = path.resolve(__dirname, '../../data/users.json');
const APPTS_FILE = path.resolve(__dirname, '../../data/appointments.json');
const dataDir    = path.resolve(__dirname, '../../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}


if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
if (!fs.existsSync(APPTS_FILE)) fs.writeFileSync(APPTS_FILE, '[]', 'utf-8');

const Storage = {
 
  getUsers() {
    try {
      return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch {
      return [];
    }
  },

  saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  },

  
  getAppts() {
    try {
      return JSON.parse(fs.readFileSync(APPTS_FILE, 'utf-8'));
    } catch {
      return [];
    }
  },

  saveAppts(appts) {
    fs.writeFileSync(APPTS_FILE, JSON.stringify(appts, null, 2), 'utf-8');
  }
};

module.exports = Storage;