import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';


let peers: Array<string>;
peers = [
    // Community relay peers: https://github.com/amark/gun/wiki/volunteer.dht
    "https://www.raygun.live/gun",
    "https://gunmeetingserver.herokuapp.com/gun",
    "https://gun-us.herokuapp.com/gun",
    "https://gun-eu.herokuapp.com/gun",
    // My own relay peer
    // "https://phrassed.com/gun",
];

// Database
export const db = GUN({
    peers,
});

// Gun User
export const user = db.user().recall({ sessionStorage: true });

// Current User's username
export const username = writable('');

user.get('alias').on(v => username.set(v))

db.on('auth', async (event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias as any);
    console.log(`signed in as ${alias}`);
});
