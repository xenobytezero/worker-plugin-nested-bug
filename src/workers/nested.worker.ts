/// <reference lib="webworker" />

'use strict';

import { Message } from "src/util/Message";

const selfWorker: DedicatedWorkerGlobalScope = self as any;

class NestedWorkerImpl {

    constructor(
        private _worker: DedicatedWorkerGlobalScope
    ) {
        this.sendMsg({
            msg: 'Message from the nested worker',
            source: ['Nested']
        })
    }

    private sendMsg(msg: Message) {
        this._worker.postMessage(msg);
    }


    public onMessage(message: any) {
    }
}

export const NestedWorker = new NestedWorkerImpl(selfWorker);
(self as any).onmessage = (message: any) => { NestedWorker.onMessage(message); }