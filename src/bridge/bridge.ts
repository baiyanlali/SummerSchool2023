import * as webllm from "@mlc-ai/web-llm";

class Bridge{
    chat: webllm.ChatModule
    messages: Array<String> = []
    results: Array<String> = []
    constructor(){
        this.chat = new webllm.ChatModule();
    }

    generating = false

    async init(){
        await this.chat.reload("vicuna-v1-7b-q4f32_0")
    }

    async gen(){
        while(this.messages.length !== 0){
            let message = this.messages.pop()
            if(message === undefined)return
            let result = await this.chat.generate(message)
            this.results.push(result)
        }
    }

    async sendMessage(message: String){
        this.messages.push(message)
        if(!this.generating){
            this.gen()
        }
    }
}

export const bridge = new Bridge()