import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const attackPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const damage = attackPower - blockPower;

    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const leftFighterIndicator = document.querySelector('#left-fighter-indicator');
        const rightFighterIndicator = document.querySelector('#right-fighter-indicator');

        let leftFighterHealth = 100;
        let rightFighterHealth = 100;
        let isPlayerOneCriticalAvailable = true;
        let isPlayerTwoCriticalAvailable = true;

        const keyStates = new Map();

        const onKeyPress = event => {
            keyStates.set(event.code, event.type === 'keydown');

            if (
                event.code === controls.PlayerOneAttack &&
                keyStates.get(event.code) &&
                !keyStates.get(controls.PlayerOneBlock) &&
                !keyStates.get(controls.PlayerTwoBlock)
            ) {
                rightFighterHealth -= getDamage(firstFighter, secondFighter);
                rightFighterIndicator.style.width = `${rightFighterHealth}%`;
            } else if (
                event.code === controls.PlayerTwoAttack &&
                keyStates.get(event.code) &&
                !keyStates.get(controls.PlayerTwoBlock) &&
                !keyStates.get(controls.PlayerOneBlock)
            ) {
                leftFighterHealth -= getDamage(secondFighter, firstFighter);
                leftFighterIndicator.style.width = `${leftFighterHealth}%`;
            } else if (
                controls.PlayerOneCriticalHitCombination.every(key => keyStates.get(key)) &&
                isPlayerOneCriticalAvailable
            ) {
                rightFighterHealth -= firstFighter.attack * 2;
                rightFighterIndicator.style.width = `${rightFighterHealth}%`;
                isPlayerOneCriticalAvailable = false;
                setTimeout(() => {
                    isPlayerOneCriticalAvailable = true;
                }, 10000);
            } else if (
                controls.PlayerTwoCriticalHitCombination.every(key => keyStates.get(key)) &&
                isPlayerTwoCriticalAvailable
            ) {
                leftFighterHealth -= secondFighter.attack * 2;
                leftFighterIndicator.style.width = `${leftFighterHealth}%`;
                isPlayerTwoCriticalAvailable = false;
                setTimeout(() => {
                    isPlayerTwoCriticalAvailable = true;
                }, 10000);
            }

            if (leftFighterHealth <= 0 || rightFighterHealth <= 0) {
                window.removeEventListener('keydown', onKeyPress);
                window.removeEventListener('keyup', onKeyPress);
                resolve(leftFighterHealth > rightFighterHealth ? firstFighter : secondFighter);
            }
        };

        window.addEventListener('keydown', onKeyPress);
        window.addEventListener('keyup', onKeyPress);
    });
}
