import * as webllm from "@mlc-ai/web-llm";

class Bridge{
    chat: webllm.ChatModule
    messages: Array<String> = []
    results: Array<String> = []
    onGenFin = (r)=>{}
    onProgress = (s, m) => {}
    constructor(){
        this.chat = new webllm.ChatModule();
    }

    generating = false

    async init(onProgress){
        this.chat.setInitProgressCallback((report: webllm.InitProgressReport) => {
            onProgress(report.text)
        });
        await this.chat.reload("vicuna-v1-7b-q4f32_0")
    }

    async gen(){
        while(this.messages.length !== 0){
            this.generating = true
            let message = this.messages.pop()
            if(message === undefined)return
            let result = await this.chat.generate(message, this.onProgress)
            this.onGenFin(result)
            this.results.push(result)
        }
        this.generating = false
    }

    sendMessage(message: String){
        console.log(`rec: ${message}`)
        this.messages.push(message)
        if(!this.generating){
            this.gen()
        }
    }
}

export const bridge = new Bridge()