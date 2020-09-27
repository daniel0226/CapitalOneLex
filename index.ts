import axios from 'axios';
import {LexResult} from "aws-lambda";

const ACCOUNT_ID = '5f6ea470f1bac107157e1199';
export const handler = async (event: any): Promise<LexResult> => {
    console.log(JSON.stringify(event));
    const date = event.currentIntent.slots.date;
    const response = await axios.get('https://bg19k9870g.execute-api.us-east-1.amazonaws.com/dev/purchases/5f6ea470f1bac107157e1199/daily/top');
    const data = response.data;
    console.log(`data: ${JSON.stringify(data)}`);
    const todayData = data[0];
    console.log(`TODAY data: ${JSON.stringify(data)}`);

    const information = `Your daily top purchases today are ${todayData.topThree[0].description} for $${todayData.topThree[0].amount}, ${todayData.topThree[1].description} for $${todayData.topThree[1].amount}, and ${todayData.topThree[2].description} for $${todayData.topThree[2].amount}`;

    return {
        dialogAction: {
            type: 'Close',
            fulfillmentState: 'Fulfilled',
            message: {
                contentType: 'PlainText',
                content: information
            }
        }
    };
};
