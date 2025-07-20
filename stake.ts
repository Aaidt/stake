import axios from "axios"

async function sendRequest(amount: number) {

    const cookie = ""

    const data = {
        target: 50.5,
        condition: "above",
        identifier: "",
        amount: amount,
        currency: "inr"
    };

    const response = await axios({
        method: "post",
        url: "https://stake.com/_api/casino/dice/roll",
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.7",
            "content-type": "application/json",
            "origin": "https://stake.com",
            "priority": "u=1, i",
            "referer": "https://stake.com/casino/games/dice",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Brave\";v=\"138\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            "x-access-token": "",
            "x-lockdown-token": "",
            "cookie": cookie
        },
        data: data
    });

    return response.data.data;
}


const BASE_AMT = 0.1
async function main (){
    let amount = BASE_AMT;
    let consequentLosses = 0;
    while(1){
        console.log(`Betting amount is: ${amount}`)
        try{
            const response = await sendRequest(amount);
            if(response.diceRoll.state.result < 50.5){
                console.log('Lost');
                consequentLosses++;
                amount = amount * 2;
            } else{
                console.log('Won')
                consequentLosses = 0;
                amount = BASE_AMT
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
            if(consequentLosses > 4){
                console.log('stopping')
                process.exit(0)
            }
        }catch(err){
            console.log(`Error: ` + err)
        }
    }
}

main()
