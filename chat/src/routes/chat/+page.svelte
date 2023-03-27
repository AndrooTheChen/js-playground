<script>
	import IonPage from "ionic-svelte/components/IonPage.svelte";
    import 'ionic-svelte/components/all';
    // import IonContent from "ionic-svelte";
    // import IonHeader from "ionic-svelte";
    // import IonToolbar from "ionic-svelte";
    // import IonTitle from "ionic-svelte";
    // import IonList from "ionic-svelte";
    // import IonItem from "ionic-svelte";
    // import IonLabel from "ionic-svelte";
    // import IonInput from "ionic-svelte";
    // import IonButton from "ionic-svelte";
    
    // import { IonContent } from "ionic-svelte/components/IonPage.svelte";

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

<IonPage>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Chat App</ion-title>
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
  