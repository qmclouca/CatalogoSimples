import Bold from 'core/assets/images/icone-negrito.svg';
import Italic from 'core/assets/images/icone-italico.svg';
import Unordered from 'core/assets/images/icone-lista-nn.svg';
import Ordered from 'core/assets/images/lista-n.svg';

const toolbar = {
  options: ['inline', 'list'],
  inline: {
    bold: { icon: Bold, className: 'custom-icon' },
    italic: { icon: Italic, className: 'custom-icon' },
    options: ['bold', 'italic'],
  },
  list: {
    options: ['unordered', 'ordered'],
    unordered: { icon: Unordered, className: 'custom-icon' },
    ordered: { icon: Ordered, className: 'custom-icon' }
  },
};

export default toolbar;