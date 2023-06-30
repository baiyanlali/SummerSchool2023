
export const PROMPT = {
    BEGIN:function(){
        return `This is a game where player vincent collect what he lost, please polish every sentence you have met to make like a story. Answer this sentence with no more than 5 words.`
    },
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
    },
    ENDGOOD: ()=> `the player collected all the things and get all the memory. Now he can leave with satifing mood`,
    ENDBAD: ()=> `the player do not have time to collect all the things. Now he leaves with regret`
}