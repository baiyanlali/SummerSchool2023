import * as webllm from "@mlc-ai/web-llm";

class Bridge{
    chat: webllm.ChatModule
    messages: Array<String> = []
    results: Array<String> = []
    onGenFin = (r)=>{}
    onProgress = (s, m) => {}
    onGenFinDict: Map<String, (f)=>void> = new Map()
    has_init: boolean = false
    constructor(){
        this.chat = new webllm.ChatModule();
    }

    generating = false

    async init(onProgress){
        this.chat.setInitProgressCallback((report: webllm.InitProgressReport) => {
            onProgress(report.text)
        });
        await this.chat.reload("vicuna-v1-7b-q4f32_0")
        this.has_init = true
        this.gen()
    }

    async gen(){
        while(this.messages.length !== 0){
            this.generating = true
            let message = this.messages.pop()
            if(message === undefined)return
            let onfindic = this.onGenFinDict.get(message)
            let result = await this.chat.generate(message, this.onProgress)
            console.log(message, onfindic)
            if(onfindic){
                console.log(onfindic, result)

                onfindic(result)
                // onfindic?.call(result)
            }else{
                this.onGenFin(result)
            }
            this.results.push(result)
        }
        this.generating = false
    }

    sendMessage(message: String, onFin){
        console.log(`rec: ${message}`)
        this.messages.push(message)
        this.onGenFinDict.set(message, onFin) 
        if(!this.generating && this.has_init){
            this.gen()
        }
    }
}

export const bridge = new Bridge()