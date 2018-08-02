declare const printErr: any;

export function draftAI(cards: any[]) {


    let guard = cards.find(c => {
        printErr(c.abilities, c.id)
        return c.abilities.indexOf('G') > -1;
    });

    if (guard) {
        printErr(`PICK ${guard.id}`)
        console.log(`PICK ${guard.id}`);
        return ;
    }

    console.log(`PICK ${Math.floor(Math.random() * 3)}`);
    return;
}
