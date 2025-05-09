import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const title = `🏆 Winner: ${fighter.name}`;

    const bodyElement = createElement({
        tagName: 'div',
        className: 'modal___body'
    });

    const fighterImage = createElement({
        tagName: 'img',
        className: 'modal___img',
        attributes: {
            src: fighter.source,
            title: fighter.name,
            alt: fighter.name
        }
    });
    bodyElement.append(fighterImage);

    const fighterName = createElement({
        tagName: 'h3',
        className: 'modal___name',
        innerText: fighter.name
    });
    bodyElement.append(fighterName);

    showModal({ title, bodyElement });
}
