<script>
	import IonPage from "ionic-svelte/components/IonPage.svelte";

    import 'ionic-svelte/components/ion-split-pane';
    import 'ionic-svelte/components/ion-menu';
    import 'ionic-svelte/components/ion-header';
    import 'ionic-svelte/components/ion-toolbar';
    import 'ionic-svelte/components/ion-title';
    import 'ionic-svelte/components/ion-content';
    import 'ionic-svelte/components/ion-list';
    import 'ionic-svelte/components/ion-item';
    import 'ionic-svelte/components/ion-label';
    import 'ionic-svelte/components/ion-input';
    import 'ionic-svelte/components/ion-button';
    import 'ionic-svelte/components/ion-menu-button';

    import { onMount } from 'svelte';

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
        console.log(`[DEBUG] GPT response: ${chatGPTMessage}`);

        messages = [...messages, chatGPTMessage];
    }

    // use onMount to make a POST request with the initial message before the component is rendered
    // onMount(async () => {
    //     const res = await fetch('/chat', {
    //         method: 'POST',
    //         body: JSON.stringify({ messages })
    //     });

    //     const chatGPTMessage = await res.json();
    //     console.log(chatGPTMessage);

    //     messages = [...messages, chatGPTMessage];
    // });
</script>

<IonPage>
    <ion-split-pane content-id="main">
        <ion-menu content-id="main">
          <ion-header>
            <ion-toolbar color="tertiary">
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            Menu Content
          </ion-content>
        </ion-menu>
      
        <div class="ion-page" id="main">
          <ion-header>
            <ion-toolbar>
              <ion-title>Buddy</ion-title>
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <div class="flex flex-col h-full overflow-y-auto">
                <div class="overflow-y-auto flex flex-col-reverse" style="height: calc(100vh - 100px);">
                    <ion-list>
                    {#each messages as message}
                    <ion-item lines="none" class={message.role === 'user' ? 'ion-justify-content-end' : 'ion-justify-content-start'}>
                        <ion-label class="ion-text-wrap">{message.content}</ion-label>
                    </ion-item>
                    {/each}
                    </ion-list>
                </div>
                <ion_footer class="fixed bottom-0 w-full h-12">
                    <form on:submit|preventDefault={chat} class="ion-padding">
                        <ion-item>
                          <ion-input type="text" placeholder="Type your message" value={newMessage} on:input={(e) => newMessage = e.target.value}></ion-input>
                          <ion-button type="submit" fill="solid" slot="end">Send</ion-button>
                        </ion-item>
                      </form>
                  </ion_footer>
            </div>
        </ion-content>
        </div>
      </ion-split-pane>





    <!-- this should technically be better but breaks it and adds a second outer scrollbar, very jank.  -->
    <!-- <ion-content>
    <div class="h-full flex flex-col">
        <div class="overflow-y-auto flex-grow flex flex-col-reverse">
        <ion-list>
            {#each messages as message}
            <ion-item lines="none" class={message.role === 'user' ? 'ion-justify-content-end' : 'ion-justify-content-start'}>
            <ion-label class="ion-text-wrap">{message.content}</ion-label>
            </ion-item>
            {/each}
        </ion-list>
        </div>
        <ion_footer class="h-12">
        <form on:submit|preventDefault={chat} class="ion-padding">
            <ion-item>
            <ion-input type="text" placeholder="Type your message" value={newMessage} on:input={(e) => newMessage = e.target.value}></ion-input>
            <ion-button type="submit" fill="solid" slot="end">Send</ion-button>
            </ion-item>
        </form>
        </ion_footer>
    </div>
    </ion-content> -->
  </IonPage>  
  