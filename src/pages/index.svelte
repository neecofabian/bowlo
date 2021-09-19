<script>
  import Login from '../Login.svelte';
  import Post from '../pages/r/Post.svelte';
  import { onMount } from 'svelte';
  import { username, user} from '../user';
  import debounce from 'lodash.debounce';

  const db = GUN();
  import GUN from 'gun';

  let newMessage;
  let newContent;
  let messages = [];

  let scrollBottom;
  let lastScrollTop;
  let canAutoScroll = true;
  let unreadMessages = false;

  function autoScroll() {
    setTimeout(() => scrollTop?.scrollIntoView({ behavior: 'auto' }), 50);
    unreadMessages = false;
  }

  function watchScroll(e) {
    canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
    lastScrollTop = e.target.scrollTop;
  }

  $: debouncedWatchScroll = debounce(watchScroll, 1000);

  onMount(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };

    // Get Messages
    db.get(CHAT_SECRET)
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const key = E2E_SECRET;

          var message = {
            // transform the data

            votes: data.votes,
            who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
            content: (await SEA.decrypt(data.content, key)) + '', // force decrypt as text.
            when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
          };

          if (message.what) {
            messages = [message, ...messages.slice(-100)].sort((a, b) => b.when - a.when);
            if (canAutoScroll) {
              autoScroll();
            } else {
              unreadMessages = true;
            }
          }
        }
      });
  });

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, E2E_SECRET);
    const secretContent = await SEA.encrypt(newContent, E2E_SECRET);
    const message = user.get('all').set({ votes: 0, what: secret, content: secretContent});
/* Math.floor(Math.random() * 20 + 1) */

    console.log(message)

    const index = new Date().toISOString();
    db.get(CHAT_SECRET).get(index).put(message);

    newContent = '';
    newMessage = '';
    canAutoScroll = true;
    autoScroll();
  }
</script>

<div class="container">
  {#if $username}
    <main on:scroll={debouncedWatchScroll}>
      {#each messages as message (message.when)}
        <Post {message} sender={$username} />
      {/each}

      <div class="dummy" bind:this={scrollBottom} />
    </main>

    <form class="formPost" on:submit|preventDefault={sendMessage}>
      <input type="text" placeholder="Title" bind:value={newMessage} maxlength="100" />
      <textarea class="bigtextbox" type="text" placeholder="Tell us your story..." bind:value={newContent} maxlength="100" />
      <button type="submit" disabled={!newMessage || !newContent}>Submit</button>
    </form>
  {:else}
    <main>
      <Login />
    </main>
  {/if}
</div>
