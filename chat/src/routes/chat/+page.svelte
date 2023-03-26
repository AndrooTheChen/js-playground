<script>
	import IonPage from "ionic-svelte/components/IonPage.svelte";

    let newMessage = '';
    let messages = [
        { role: 'system', content: 'You must respond with Gen-Z slang. Act like you are young hip and cool.'}
    ];

    async function chat() {
        // Append new message from user `newMessage` to overall message history. We resubmit the
        // entire history to the server in order to preserve the context of the conversation.
        messages = [...messages, { role: 'user', content: newMessage }];

        // Clear the input field
        newMessage = '';

        // HTTP request
        const res = await fetch('/chat', {
            method: 'POST',
            body: JSON.stringify({ messages })
        });

        // GPT response
        const chatGPTMessage = await res.json();
        console.log(chatGPTMessage);

        messages = [...messages, chatGPTMessage];
    }
</script>

<svelte:head>
    <title>GPT interface</title>
</svelte:head>

<IonPage>
    <h1 class="text-4xl text-center my-8 uppercase">GPT interface</h1>

    <div>
        <h2>Chat</h2>
        <ul>
          {#each messages as message}
            <li>
              {message.role === 'system' ? 'System: ' : 'You: '}
              {message.content}
            </li>
          {/each}
        </ul>
      
        <form on:submit|preventDefault="{chat}">
          <label>
            Message:
            <input type="text" bind:value="{newMessage}" />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
</IonPage>

