import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const fighterImage = createFighterImage(fighter);
        fighterElement.append(fighterImage);

        const fighterName = createElement({
            tagName: 'h3',
            className: 'fighter-preview___top',
            innerText: fighter.name
        });
        fighterElement.append(fighterName);

        const fighterHealth = createElement({
            tagName: 'p',
            className: 'fighter-preview___left',
            innerText: `Health: ${fighter.health}`
        });
        fighterElement.append(fighterHealth);

        const fighterAttack = createElement({
            tagName: 'p',
            className: 'fighter-preview___right',
            innerText: `Attack: ${fighter.attack}`
        });
        fighterElement.append(fighterAttack);

        const fighterDefense = createElement({
            tagName: 'p',
            className: 'fighter-preview___right',
            innerText: `Defense: ${fighter.defense}`
        });
        fighterElement.append(fighterDefense);
    }

    return fighterElement;
}
