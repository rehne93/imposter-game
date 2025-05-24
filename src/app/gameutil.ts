import { Wordlist } from "./wordlist";


export class GameUtil {

    public static randomNumber(limit:number): number {
        return Math.floor(Math.random() * limit)+1;
    }


    public static getRandomWord(): Word {
        const words: Word[] = Wordlist.WORDS;
        const randomNumber = this.randomNumber(words.length);
        return words[randomNumber-1];

    }
}

export interface Word {
    wort: string;
    hinweis: string;
}