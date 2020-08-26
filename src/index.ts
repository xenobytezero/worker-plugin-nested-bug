import { Message } from "./util/Message";

document.addEventListener('DOMContentLoaded', (event) => {

    const worker = new Worker('./workers/main.worker.ts', { type: 'module', name: 'main' });

    addMessage({
        msg: 'Created Main Worker',
        source: ['Page']
    });

    worker.onmessage = (message) => {

        const msg = message.data as Message;

        msg.source.push('Page');

        addMessage(msg);
    }

    function addMessage(msg: Message) {
        const ele = document.createElement('h3');

        const sourceStr = msg.source.join(' -> ');

        ele.innerText = `(${sourceStr}) ${msg.msg}`;
        document.body.appendChild(ele);
    }

})