'use babel';

import XztranslateView from './xztranslate-view';
import { CompositeDisposable } from 'atom';

export default {

  xztranslateView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.xztranslateView = new XztranslateView(state.xztranslateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.xztranslateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'xztranslate:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.xztranslateView.destroy();
  },

  serialize() {
    return {
      xztranslateViewState: this.xztranslateView.serialize()
    };
  },

  toggle() {
    console.log('Xztranslate was toggled!');
    let editor
  if (editor = atom.workspace.getActiveTextEditor()) {
    let selection = editor.getText()
    let sorted = selection.replace(/x|z/gi,function(match){return(match == 'x' | match == 'X')?  'Z':'X';})
    editor.setText(sorted)
//    this.modalPanel.show()
  //  editor.setText(sorted)

  }


  }

};
