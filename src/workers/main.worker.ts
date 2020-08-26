/// <reference lib="webworker" />

'use strict';

import { Message } from "src/util/Message";

const selfWorker: DedicatedWorkerGlobalScope = self as any;

class MainWorkerImpl {

    private _childWorker: Worker;

    constructor(
        private _worker: DedicatedWorkerGlobalScope
    ) {

        this.sendMsg({
            msg: 'Message from main worker',
            source: ['Main']
        });

        this._childWorker = new Worker('./nested.worker', { type: 'module', name: 'nested' });

        this._childWorker.onmessage = (message) => {

            const msg = message.data as Message;

            msg.source.push('Main');

            this.sendMsg(msg);
        }

    }

    private sendMsg(msg: Message) {
        this._worker.postMessage(msg);
    }

    public onMessage(message: any) {

    }
}

export const MainWorker = new MainWorkerImpl(selfWorker);
(self as any).onmessage = (message: any) => { MainWorker.onMessage(message); }