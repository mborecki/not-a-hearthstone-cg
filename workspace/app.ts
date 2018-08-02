import { draftAI } from "./draft-ai";

declare const readline: any;
declare const printErr: any;

export default class App {
    runFistTurnCode(): void {
        this.runNextTurnCode();
    }

    runNextTurnCode(): void {
        let players = [];

        for (var i = 0; i < 2; i++) {
            var inputs = readline().split(' ');
            var playerHealth = parseInt(inputs[0]);
            var playerMana = parseInt(inputs[1]);
            var playerDeck = parseInt(inputs[2]);
            var playerRune = parseInt(inputs[3]);

            players.push({
                playerMana
            })
        }
        var opponentHand = parseInt(readline());
        var cardCount = parseInt(readline());

        let cards = [];

        for (var i = 0; i < cardCount; i++) {
            let inputs = readline().split(' ');

            let cardNumber = parseInt(inputs[0]);
            let instanceId = parseInt(inputs[1]);
            let location = parseInt(inputs[2]);
            let cardType = parseInt(inputs[3]);
            let cost = parseInt(inputs[4]);
            let attack = parseInt(inputs[5]);
            let defense = parseInt(inputs[6]);
            let abilities = inputs[7];
            let myHealthChange = parseInt(inputs[8]);
            let opponentHealthChange = parseInt(inputs[9]);
            let cardDraw = parseInt(inputs[10]);

            cards.push({
                id: i,
                instanceId,
                cost,
                location,
                attack,
                defense,
                abilities: abilities.split('')
            });
        }

        let myMana = players[0].playerMana;

        if (myMana === 0) {

            return draftAI(cards);
        }

        let commands = [];

        let myHand = cards.filter(c => {
            return c.location === 0;
        });

        let myBoard = cards.filter(c => {
            return c.location === 1;
        })

        let enemyBoard = cards.filter(c => {
            return c.location === -1;
        })

        if (myBoard.length < 6) {

            let cardToPlay = myHand.find(c => {
                return c.cost <= myMana;
            });

            if (cardToPlay) {
                commands.push(`SUMMON ${cardToPlay.instanceId}`);
            }
        }

        let enemyGuards = enemyBoard.filter(c => {
            return c.abilities.indexOf('G') > -1;
        });

        if (enemyGuards.length) {

            myBoard.forEach(c => {

                for (let i = 0; i < enemyGuards.length; i++) {
                    let g = enemyGuards[i];

                    printErr(`${c.instanceId} -?> ${g.instanceId}`)

                    if (g.defense > 0) {
                        commands.push(`ATTACK ${c.instanceId} ${g.instanceId}`);
                        g.defense -= c.attack;
                        return;
                    }
                }

                commands.push(`ATTACK ${c.instanceId} -1`);

            });
        } else {
            myBoard.forEach(c => {
                commands.push(`ATTACK ${c.instanceId} -1`);
            });
        }


        console.log(commands.length ? commands.join(';') : 'PASS');
    }
}
