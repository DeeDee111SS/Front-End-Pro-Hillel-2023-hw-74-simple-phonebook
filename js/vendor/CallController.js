class CallController {
    #currentCall = null;
    #callHistory = [];

    constructor() {
      Call.addSubscription(Call.EVENT_TYPES.changeStatus, this.#trackCallStatus)
    }

    startCall({phone}) {
        if(!Call.validatePhone(phone)) {
            console.warn('Phone number is not valid');
            return null;
        }

        if(!this.#currentCall) {
            this.#currentCall = new Call(phone)
            console.log(this.#currentCall)
            return this.#currentCall;
        }

        console.warn(`You have another call in [${this.#currentCall.status}] status`);
        return this.#currentCall
    }
    endCall() {
        if(!this.#currentCall) {
            console.warn('No call in progress');
            return;
        }

        this.#currentCall.endCallByCaller();
        this.#killCurrentCall()
    }

    #trackCallStatus = (newStatus, oldStatus) =>  {
        console.log('CallController track status change: ', oldStatus, '>', newStatus)
        if(!Call.endCallStatuses.includes(newStatus)) return null;
        return this.#killCurrentCall()
    }

    #killCurrentCall() {
        this.#callHistory.push(Object.freeze(this.#currentCall));
        this.#currentCall = null
        return this.#callHistory.at(-1)
    }

    get currentCall() {
        return structuredClone(this.#currentCall)
    }

    get callHistory() {
        return [...this.#callHistory]
    }
}


const callController = new CallController()
//
// callController.startCall({phone: '1111'})
