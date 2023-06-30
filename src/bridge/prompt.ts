
export const PROMPT = {
    PICK: function(player: String, item: String, 
        Surroundings: String| null, word_cnt: number = 20){
        if(Surroundings===null)
            return `polish this sentence to make it more story, no more than ${word_cnt} words: The ${player} picks ${item}`
        else
            return `polish this sentence to make it more story, no more than ${word_cnt} words: The ${player} picks ${item} in/on/at ${Surroundings}`
    },
    BEAT: function(sponsor: String, target: String, 
        result: String, word_cnt = 20){
        return `polish this sentence to make it more story, no more than ${word_cnt} words: ${sponsor} stroke ${target}, and the result is ${result}`
    },
    RIDDLE: function(number: number){
        return `create a riddle whose answer is ${number}`
    },
    ITEM_CHECK: function(items: String, is_finished = false, others: String = ""){
        return `now player has  ${items}, and is he finished is ${is_finished}`
    }
}