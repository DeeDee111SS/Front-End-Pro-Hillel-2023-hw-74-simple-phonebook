class User {
    #id = null
    name= null
    phone = null
    email = null
    website = null
    template = null

    constructor({id, name, phone, email, website}) {
        this.#id = id
        this.name= name
        this.phone = phone
        this.email = email
        this.website = website
    }

    static isUser(obj) {
        // check if obj is User instance
    }

    get id() {
        return this.#id
    }

    // your methods
}
