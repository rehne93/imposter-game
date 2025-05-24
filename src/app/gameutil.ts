import { Wordlist } from "./wordlist";


export class GameUtil {

    public static randomNumber(limit:number): number {
        return Math.floor(Math.random() * limit)+1;
    }


    public static getRandomWord(): string {
        const words: string[] = Wordlist.WORDS;
        const randomNumber = this.randomNumber(words.length);


        return words[randomNumber-1];

    }
}